<script lang="ts">
	import { Send, Smile } from 'lucide-svelte';

	let message = $state<string>('');
	let messageIsEmpty = $derived<boolean>(message === '');
	let messages = $state<Message[]>([]);
	let chatContainer: HTMLDivElement;
	let currentTime = $state<Date>(new Date());

	async function sendMessage(event: Event) {
		event.preventDefault();

		if (messageIsEmpty) {
			return;
		}
		messages = [...messages, { text: message, sender: 'localUser', timeCreated: new Date() }];
		message = '';

		// just for demonstration purposes
		setTimeout(
			() =>
				(messages = [
					...messages,
					{ text: 'I agree!', sender: 'remoteUser', timeCreated: new Date() }
				]),
			1000
		);
	}

	// update every minute
	setInterval(() => {
		currentTime = new Date();
	}, 60000);

	let formatTime = $derived((date: Date) => {
		const diffInMinutes = Math.floor((currentTime.getTime() - date.getTime()) / (1000 * 60));
		if (diffInMinutes < 1) {
			return 'Now';
		} else if (diffInMinutes < 60) {
			return `${diffInMinutes}m`;
		} else {
			return date.toLocaleString([], {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		}
	});

	$effect(() => {
		if (messages.length) {
			chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
		}
	});
</script>

<div class="flex h-full flex-col">
	<div bind:this={chatContainer} class="flex-1 overflow-y-auto">
		{#each messages as message, i (i)}
			<div class="mb-2.5 {message.sender === 'localUser' ? 'text-right' : 'text-left'}">
				<div
					class="inline-block max-w-[70%] pt-2.5 pb-2 px-4 rounded-2xl break-words overflow-hidden
					{message.sender === 'localUser' ? 'bg-accent text-onAccent' : 'bg-secondary text-text'}"
				>
					{message.text}
					<div class="text-xs opacity-60">
						{formatTime(message.timeCreated)}
					</div>
				</div>
			</div>
		{/each}
	</div>
	<form id="input-container" onsubmit={sendMessage} class="flex gap-2.5">
		<div class="relative flex-grow">
			<input
				bind:value={message}
				placeholder="Type your message..."
				class="h-10 w-full rounded-full bg-surface pl-5 pr-12 text-base text-text focus:outline-none"
			/>
			<button
				type="button"
				onclick={() => alert('Emoji picker not implemented.')}
				class="absolute right-3 top-1/2 -translate-y-1/2 transform text-text hover:opacity-80"
			>
				<Smile size={23} />
			</button>
		</div>
		<button
			id="send-button"
			type="submit"
			class:hidden={messageIsEmpty}
			class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-accent text-onAccent hover:opacity-80"
		>
			<Send size={22} class="-ml-0.5" />
		</button>
	</form>
</div>

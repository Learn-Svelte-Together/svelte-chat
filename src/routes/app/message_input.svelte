<script lang="ts">
	import { Button, Input } from '$lib/components';

	export let sendMessage: (text: string) => void;

	let text = '';

	const handleInput = (e: Event) => {
		const { value } = e.target as HTMLInputElement;
		text = value;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == 'Enter') {
			handleSendMessage();
		}
	};

	const handleSendMessage = () => {
		if (text) {
			sendMessage(text);
			text = '';
		}
	};
</script>

<div>
	<div class="form">
		<Input value={text} on:input={handleInput} on:keydown={handleKeyDown} />
		<Button disabled={!text} on:click={handleSendMessage}>Send</Button>
	</div>
</div>

<style>
	.form {
		display: flex;
		gap: 1rem;
	}
</style>

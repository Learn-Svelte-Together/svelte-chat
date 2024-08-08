<script lang="ts">
	export let data;
	const handleSubmit = (event: Event) => {
		console.log(event);
	};
</script>

<svelte:head>
	<title>MeChat</title>
</svelte:head>

<h1 class="text-3xl font-semibold">MeChat</h1>

<div class="max-w-md">
	<div class="mt-10 h-80 w-full overflow-auto rounded-md border-2 border-gray-300 p-3">
		{#each data.messages as message (message.messageId)}
			<div class="flex">
				<div class="mr-3">{message.userName}:</div>
				<div>{message.content}</div>
			</div>
		{/each}
	</div>

	<form onsubmit={handleSubmit}>
		<div class="mt-5 flex w-full">
			<input
				type="text"
				placeholder="Type your message..."
				class="mr-3 w-full rounded-md border-2 border-gray-300"
			/>
			<button type="submit" class="rounded border border-gray-400 bg-gray-200 px-4 py-2"
				>Send</button
			>
		</div>
	</form>
</div>

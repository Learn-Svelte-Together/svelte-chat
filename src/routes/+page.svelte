<script lang="ts">
	import { enhance } from '$app/forms';

	/**
	 * Load historic chat data
	 *
	 * This prepares for a future version where historic message data
	 * will be fetched from the server on page load.
	 */
	let { data } = $props();

	/**
	 * Auto-scroll chat window on new messages
	 *
	 * This functionality ensures that the chat window automatically scrolls
	 * to the bottom when a new message is added, improving user experience.
	 */
	let chatHistory: HTMLElement | null; // I use bind:this on the element to assign.
	$effect(() => {
		// Scroll to bottom when data changes and chat history exists
        data; // effect will only run if data changes
		if (chatHistory) {
			chatHistory.scroll({ top: chatHistory.scrollHeight, behavior: 'instant' });
		} else {
			console.error('chatHistory section not found'); // just in case something goes wrong :)
		}
	});
</script>

<main id="chat-app">
	<h1>Chat App</h1>

	<!-- This section shows the history of the messages input by the user -->
	<section id="chat-history" class="hide-scrollbar" bind:this={chatHistory}>
		<!-- TODO: Consider creating a separate Message Component for better modularity -->
		{#each data.messageHistory as { username, message }}
			<!-- Render each message in the chat history -->
			<article class="chat-message">
				<p><span class="username">{username}:</span> {message}</p>
			</article>
		{/each}
	</section>

	<!-- This form submits the hardcoded username and user input message to the server. It uses autofocus to ensure the cursor stays in the input box after submission. It makes use of svelte enhance (imported above)-->
	<form id="chat-input" method="POST" action="?/submitMessage" use:enhance>
		<input type="hidden" name="username" value="Me" /> 
		<div class="input-wrapper">
			<label for="message-input" class="sr-only">Type your message</label>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				id="message-input"
				name="message"
				type="text"
				placeholder="Type your message..."
				autocomplete="off"
				autofocus
				required
			/>
			<button type="submit" class="send-button">
				<span class="sr-only">Send</span>
				<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
					<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
				</svg>
			</button>
		</div>
	</form>
</main>

<style>
	h1 {
		margin-top: 1rem;
	}
	#chat-app {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		max-height: 100%;
		padding: 0rem 4rem 4rem 4rem;
	}
	#chat-history {
		flex-grow: 1;
		overflow-y: auto;
		padding: 2rem;
		background: white;
		border-radius: 1rem;
		border: 2px solid rgb(200, 200, 200);
	}

	/*
	* Personal preference to hide scrollbars as I think they're ugly :) 
	*/
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	#chat-input {
		background-color: var(--color-bg);
		border-top: 1px solid #ddd;
	}

	.input-wrapper {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	#message-input {
		width: 100%;
		padding-right: 40px;
		padding: 0.5rem;
		box-sizing: border-box;
		border-radius: 0.5rem;
		border: 2px solid rgb(200, 200, 200);
	}

	.send-button {
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px;
	}

	.send-button svg {
		fill: #007bff;
	}

	.send-button:hover svg {
		fill: #0056b3;
	}

	.username {
		font-weight: bold;
	}
</style>

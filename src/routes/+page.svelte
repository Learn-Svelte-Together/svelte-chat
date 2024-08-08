<script lang="ts">
	
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	/**
	 * Extracts and initializes the `data` variable from the component's props.
	 * 
	 * This variable is used to load the data fetched from the `+page.server.ts` file.
	 * The `data` object should conform to the `PageData` type, which represents the
	 * structure of the data expected by the component.
	 * 
	 * The `data` object is destructured from the result of the `$props()` function, 
	 * ensuring that it adheres to the expected type for proper data handling within 
	 * the component.
	 */
	 let { data }: { data: PageData } = $props();

	/**
	 * Auto-scroll chat window on new messages
	 *
	 * This functionality ensures that the chat window automatically scrolls
	 * to the bottom when a new message is added, improving user experience.
	 */
	let chatHistory: HTMLElement | null;
	
	$effect(() => {
        data; // adding this ensures the effect will only run if 'data' changes.
		if (chatHistory) {
			chatHistory.scroll({ top: chatHistory.scrollHeight, behavior: 'instant' });
		} else {
			console.error('chatHistory section not found'); // just in case something goes wrong :)
		}
	});

</script>

<main id="chat-app">
    <!-- Main container for the chat application -->
    <h1>Chat App</h1>

    <!-- Section displaying the history of messages -->
    <!-- The 'hide-scrollbar' class hides the scrollbar for a cleaner look -->
    <!-- 'bind:this={chatHistory}' allows for direct manipulation or referencing of the DOM element in Svelte -->
    <section id="chat-history" class="hide-scrollbar" bind:this={chatHistory}>
        <!-- TODO: Modularize by creating a separate Message Component for better code organization -->
        {#each data.messageHistory as { username, message }}
            <!-- Display each message in the chat history -->
            <article class="chat-message">
                <p>
                    <span class="username">{username}:</span> {message}
                </p>
            </article>
        {/each}
    </section>

    <!-- Form for submitting new messages -->
    <!-- 
      The form uses Svelte's 'enhance' action for client-side handling, 
      which allows for more seamless interactions by preventing full page reloads 
      and improving the user experience.
    -->
    <form id="chat-input" method="POST" action="?/submitMessage" use:enhance>
        <!-- Hidden input field to submit a hardcoded username -->
        <input type="hidden" name="username" value="Me" />
        
        <!-- Wrapper for the input field and submit button -->
        <div class="input-wrapper">
            <!-- Label for accessibility, visually hidden but still available for screen readers -->
            <label for="message-input" class="sr-only">Type your message</label>
            
            <!-- Input field for entering the message -->
            <!-- svelte-ignore a11y_autofocus: This directive is used to ignore the autofocus accessibility warning -->
            <input
                id="message-input"
                name="message"
                type="text"
                placeholder="Type your message..."
                autocomplete="off"
                autofocus
                required
            />
            
            <!-- Submit button to send the message -->
            <button type="submit" class="send-button">
                <!-- Screen reader only text for accessibility -->
                <span class="sr-only">Send</span>
                <!-- SVG icon for the send button -->
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

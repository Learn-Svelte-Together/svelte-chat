
<script lang="ts">
	let message = $state("");
	let messageIsEmpty = $derived(message === "");
	let history = $state("");	
	let element: HTMLTextAreaElement;
	
	function sendMessage(event: Event) {
		event.preventDefault();
		history = `${history}Me: ${message}\n`;
		message = "";
	}

	$effect(() => {
		if (history && element) {
			element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
		}
	});
</script>

<div id="chat-container">
	<h1>MeChat</h1>
	<textarea id="chat-history" readonly value={history} bind:this={element}></textarea>
	<form id="input-container" onsubmit={sendMessage}>
		<input 
			id="message-input" 
			bind:value={message} 
			placeholder="Type your message..."
		/>
		<button 
			id="send-button" 
			type="submit" 
			disabled={messageIsEmpty}
		>
			Send
		</button>
	</form>
</div>

<style>
	#chat-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 20px;
	}

	h1 {
		margin-top: 0;
		margin-bottom: 20px;
	}

	#chat-history {
		flex-grow: 1;
		font-size:  1rem;
		width: 100%;
		overflow-y: auto;
		padding: 10px;
		margin-bottom: 20px;
		background-color: white;
		border: 1px solid #ccc;
		border-radius: 5px;
		box-sizing: border-box;
		resize: none;
	}

	#input-container {
		display: flex;
		gap: 10px;
	}

	#message-input {
		flex-grow: 1;
		font-size:  1rem;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	#send-button {
		font-size:  1rem;
		padding: 10px 15px;
		border: 1px solid #ccc;
		border-radius:5px;
		background-color: var(--color-theme);
		color: white;
		cursor: pointer;
	}
</style>
<script lang="ts">
	import { fade } from 'svelte/transition';

	const messages: string[] = $state(['lorem ipsum']);
	let text = $state('');

	function add_message(e: Event) {
		e.preventDefault();

		if (text.trim() === '') {
			return;
		}

		messages.push(text);
		e.target?.reset();
	}
</script>

<main>
	<h1>me chat</h1>

	<section class="chats-border">
		<ul class="chats">
			{#each messages as message (message)}
				<li in:fade>{message}</li>
			{/each}
		</ul>

		<form onsubmit={add_message}>
			<fieldset class="flex">
				<input type="text" bind:value={text} />
				<button>Submit</button>
			</fieldset>
		</form>
	</section>
</main>

<style>
	.chats-border {
		max-width: 300px;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 1rem;
	}
	.chats {
		max-height: 15em;
		line-height: 1.7;
		overflow-y: scroll;
	}
	h1 {
		text-transform: capitalize;
	}
	ul {
		/* list-style: none; */
		list-style-position: outside;
		margin: 0;
		padding: 0;
	}
	fieldset {
		align-items: center;
		/* gap: 1em; */
		border: none;
	}
	form {
		margin-top: 1em;
	}
	.flex {
		display: flex;
	}
</style>

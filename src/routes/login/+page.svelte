<script lang="ts">
	import { goto } from '$app/navigation';

	const { data } = $props();

	let username = $state({ value: '' });
	let password = $state({ value: '' });
	let error: string | undefined = $state();

	async function onLogin() {
		try {
			await data.authStore.login(username.value, password.value);
			if (data.authStore.currentUser != null) {
				goto('/');
			}
		} catch (e) {
			console.error(e);
			if (typeof e == 'string') {
				error = e.toString();
			} else if (e instanceof Error) {
				error = e.message;
			}
		}
	}
</script>

<!-- Have to pass in an object since snippets don't allow binding directly to params -->
<!-- Need to make username an object as well -->
{#snippet formField(name: string, bind: { value: string }, type: string = 'text')}
	<label for={name}>{name}</label>
	<input
		{name}
		{type}
		bind:value={bind.value}
		class="h-10 w-full rounded-full bg-surface pl-5 pr-12 text-base text-text focus:outline-none"
	/>
{/snippet}

<div class="flex flex-col justify-items-center mx-auto space-y-4 container">
	{@render formField('username', username)}
	{@render formField('password', password, 'password')}

	<button type="button" onclick={onLogin} class="rounded-md bg-surface">Login</button>
	{#if error}
		<div class="text-red">
			{error}
		</div>
	{/if}
</div>

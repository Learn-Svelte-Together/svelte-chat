<script lang="ts">
	import { goto } from '$app/navigation';

	const { data } = $props();

	let username = $state({ value: '' });
	let password = $state({ value: '' });
	let error: string | undefined = $state();
	let loading = $state(false);

	async function onLogin() {
		loading = true;
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
		} finally {
			loading = false;
		}
	}
</script>

<!-- Have to pass in an object since snippets don't allow binding directly to params -->
<!-- Need to make username an object as well -->
{#snippet formField(name: string, bind: { value: string }, disabled = false, type: string = 'text')}
	<label for={name}>{name}</label>
	<input
		{disabled}
		{name}
		{type}
		bind:value={bind.value}
		class="h-10 w-full rounded-full bg-surface pl-5 pr-12 text-base text-text focus:outline-none"
	/>
{/snippet}

<div class="flex flex-col justify-items-center mx-auto space-y-4 container">
	{@render formField('username', username, loading)}
	{@render formField('password', password, loading, 'password')}

	<button type="button" onclick={onLogin} class="rounded-md bg-surface" disabled={!loading}>
		{#if loading}
			Loading...
		{:else}
			Login
		{/if}
	</button>
	{#if error}
		<div class="text-red">
			{error}
		</div>
	{/if}
</div>

<script lang="ts">
	import { goto } from '$app/navigation';

	const { data } = $props();

	let username = $state({ value: '' });
	let password = $state({ value: '' });
	$inspect(username);

	async function onLogin() {
		console.log('on login called');
		await data.authStore.login(username.value, password.value);
		if (data.authStore.currentUser != null) {
			goto('/');
		}
	}
</script>

<!-- Have to pass in an object since snippets don't allow binding directly to params -->
<!-- Need to make username an object as well -->
{#snippet formField(name: string, bind: { value: string }, type: string = 'text')}
	<label for={name}>{name}</label>
	<input {name} {type} class="" bind:value={bind.value} />
{/snippet}

<div class="flex flex-col justify-items-center">
	{@render formField('username', username)}
	{@render formField('password', password, 'password')}

	<button type="button" onclick={onLogin}>Login</button>
</div>

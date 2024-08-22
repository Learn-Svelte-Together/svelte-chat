<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import type { LayoutServerData } from './$types';

	let {
		data,
		children
	}: {
		data: LayoutServerData;
		children: Snippet;
	} = $props();

	const userAvatarURL: string = `https://evidence-if.pockethost.io/api/files/${data.user?.collectionId ?? ''}/${data.user?.id ?? ''}/${data.user?.avatar ?? ''}`;
</script>

{#if data.user}
	<nav class="flex flex-row w-full justify-between items-center py-4 px-8">
		<h1 class="text-2xl">Welcome To Melmac Chat!</h1>
		<div class="flex flex-row gap-4">
            <form action="/logout" method="POST">
                <button type="submit" class="rounded-md bg-blue-500 text-white px-4 py-2 mx-auto">Logout</button>
            </form>
            <img src={userAvatarURL} alt="User icon" class="w-10 h-10 rounded-full cursor-pointer" />
		</div>
	</nav>
	<main class="flex flex-row max-h-screen min-h-screen">
		{@render children()}
	</main>
{:else}
	<main class="flex flex-row max-h-screen min-h-screen">
		{@render children()}
	</main>
{/if}

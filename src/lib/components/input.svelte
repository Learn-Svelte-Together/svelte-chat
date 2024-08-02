<script>
	export let value = '';
	export let placeholder = '';
	export let name = '';
	export let error = false;
</script>

<input
	type="text"
	{name}
	bind:value
	on:input
	on:keydown
	{placeholder}
	autocomplete="off"
	class:invalid={error}
/>

<style>
	input {
		background: transparent;
		border: 1px solid rgba(var(--dark), 0.5);
		border-radius: 0.375rem;
		padding: 0.625rem;
	}

	input.invalid {
		border-color: rgb(var(--orange));
	}
</style>

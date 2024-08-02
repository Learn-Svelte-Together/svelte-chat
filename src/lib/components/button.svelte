<script lang="ts">
	export let variant: Variant = 'primary';
	export let type: 'button' | 'submit' = 'button';
	export let disabled = false;

	let defaultClass = 'btn';
	let classes = [defaultClass, variant, $$props.class].join(' ').trim();
</script>

<button {type} class={classes} {disabled} on:click>
	<slot />
</button>

<style>
	.btn {
		padding: 0.625rem 1rem;
		background: transparent;
		border: 1px solid var(--dark);
		font-weight: 500;
		border-radius: 0.375rem;
		cursor: pointer;
	}

	.btn.primary {
		background: rgba(var(--dark), 0.8);
		color: rgb(var(--light));
	}

	.btn.primary:hover {
		background: rgb(var(--dark));
	}

	.btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
</style>

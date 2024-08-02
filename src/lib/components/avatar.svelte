<script lang="ts">
	export let src;
	export let alt;
	export let rounded: 'sm' | 'md' | 'lg' | 'full' = 'lg';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const classes = `rounded-${rounded} size-${size}`;
</script>

<img {src} {alt} class={classes} />

<style>
	.rounded-sm {
		border-radius: 0.25rem;
	}

	.rounded-md {
		border-radius: 0.5rem;
	}

	.rounded-lg {
		border-radius: 0.75rem;
	}

	.rounded-full {
		border-radius: 100%;
	}

	.size-sm {
		width: 2rem;
		height: 2rem;
	}

	.size-md {
		width: 2.5rem;
		height: 2.5rem;
	}

	.size-lg {
		width: 3rem;
		height: 3rem;
	}
</style>

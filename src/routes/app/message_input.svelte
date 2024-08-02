<script>
	import { enhance } from '$app/forms';
	import { Button, Input } from '$lib/components';
</script>

<div>
	<form use:enhance class="form">
		<Input />
		<Button>Send</Button>
	</form>
</div>

<style>
	.form {
		display: flex;
		gap: 1rem;
	}
</style>

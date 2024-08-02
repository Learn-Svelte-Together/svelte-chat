<script>
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { Button, Input } from '$lib/components';

	export let form;

	let name = '';

	$: if (form?.success) goto('/app');
</script>

<div class="container">
	<form class="content" method="post" use:enhance>
		<Input value={name} name="name" placeholder="Enter your name" error={form?.missing} />

		<div class="action">
			<Button type="submit">
				<div class="btn-continue">
					<span>Start Conversation</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
				</div>
			</Button>
		</div>
	</form>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: 25%;
	}

	.action {
		text-align: right;
	}

	.btn-continue {
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
	}
</style>

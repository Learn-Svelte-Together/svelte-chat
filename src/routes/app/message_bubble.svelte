<script lang="ts">
	import { Avatar } from '$lib/components';

	export let message: Message;
</script>

<div class="container">
	<Avatar
		src={message.sender.image ||
			`https://ui-avatars.com/api/?name=${message.sender.name.replaceAll(' ', '+')}`}
		alt={message.sender.name}
	/>
	<div class="content">
		<span class="title">{message.sender.name}</span>
		<span>{@html message.content}</span>
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 0.75rem;
		align-items: start;
		margin-top: 1rem;
	}

	.content {
		display: flex;
		flex-direction: column;
	}

	.title {
		font-weight: 500;
	}
</style>

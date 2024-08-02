<script lang="ts">
	import { Avatar } from '$lib/components';
	import SidebarLeft from './sidebar_left.svelte';
	import MessageInput from './message_input.svelte';
	import MessageBubble from './message_bubble.svelte';

	export let data;

	const messages: Message[] = [
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		},
		{
			sender: { id: '1', name: 'Chris', image: '' },
			content: 'hello',
			insertedAt: '2024-08-02 16:10:00'
		},
		{
			sender: { id: '2', name: 'Patrik', image: '' },
			content: 'hi',
			insertedAt: '2024-08-02 16:11:00'
		}
	];
</script>

<div class="container">
	<SidebarLeft />

	<div class="content">
		<div class="header">
			<p class="title">Channel Name</p>
			<Avatar size="sm" rounded="md" src={data.user?.image} alt={data.user?.name} />
		</div>

		<div class="messages-container">
			{#each messages as message}
				<MessageBubble {message} />
			{/each}
		</div>

		<div class="input-container">
			<MessageInput />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
	}

	.content {
		flex: 1;
	}

	.header {
		display: flex;
		padding: 0.75rem 1rem;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(var(--dark), 0.1);
	}

	.title {
		font-weight: 500;
		font-size: 1.25rem;
		margin: 0;
	}

	.messages-container {
		height: calc(100dvh - 10.5rem);
		display: flex;
		flex-direction: column-reverse;
		overflow: auto;
		padding: 1rem 1.5rem;
	}

	.input-container {
		padding: 1rem 1.5rem;
	}
</style>

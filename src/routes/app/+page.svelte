<script>
	import { Avatar } from '$lib/components';
	import SidebarLeft from './sidebar_left.svelte';
	import MessageList from './message_list.svelte';

	export let data;
</script>

<div class="container">
	<SidebarLeft />

	<div class="content">
		<div class="header">
			<Avatar rounded="md" src={data?.user?.image} alt={data?.user?.name} />
		</div>
		<MessageList />
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
	}

	.content {
		flex: 1;
		padding: 1rem;
	}

	.header {
		display: flex;
		justify-content: end;
	}
</style>

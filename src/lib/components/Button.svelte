<script lang="ts">
	let { 
		text,
		onClick
	}: {
		text: string,
		onClick: () => void
	} = $props();

</script>

<button type="button" class="rounded-full text-center mx-auto bg-[#703713] text-white p-4 min-w-48 font-bold" onclick={onClick}>
		{text}
</button>
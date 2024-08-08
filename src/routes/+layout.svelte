<script lang="ts">
	import type { Snippet } from 'svelte';
    import '../app.css';
    let { children }: { children: Snippet } = $props();
</script>

<div class="container">
    {@render children()}
</div>

<style>

.container {
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

</style>
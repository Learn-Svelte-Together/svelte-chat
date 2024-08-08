<script lang="ts">
	
  import type { Snippet } from 'svelte';
  import '../app.css';
  
  let { children }: { children: Snippet } = $props();

</script>

<div class="app">

    {@render children()}
    
</div>

<style>

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}

</style>
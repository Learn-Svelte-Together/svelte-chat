<script lang="ts">
	import { type Snippet } from 'svelte';
	import { Sun, Moon, ArrowLeft, Pipette } from 'lucide-svelte';
	import '../app.css';
	import { ColorHSL, themeManager } from '$lib/theme-manager.svelte';

	let { children }: { children: Snippet } = $props();
	let colorPickerOpen = $state(false);
	let color = $state<ColorHSL>(themeManager.color);

	function setColor(newColor: ColorHSL) {
		color = newColor;
		themeManager.setColor(newColor);
	}
</script>

<div id="app" class="flex h-screen flex-col bg-background" data-theme={themeManager.theme}>
	<div class="flex h-14 justify-between bg-surface px-3">
		<div class="flex items-center space-x-3">
			<button>
				<ArrowLeft size={22} class="text-text hover:opacity-80" />
			</button>
			<p class="text-lg text-text">Demo Chat</p>
		</div>

		<div class="flex items-center space-x-3">
			{#if colorPickerOpen}
				<input
					type="range"
					min="0"
					max="360"
					bind:value={color.h}
					oninput={() => setColor(color)}
					class="w-48"
				/>
			{/if}

			<button onclick={() => (colorPickerOpen = !colorPickerOpen)}>
				<Pipette size={22} class="text-text hover:opacity-80 active:ring-2" />
			</button>

			<button onclick={() => themeManager.toggleTheme()} class="flex items-center">
				{#if themeManager.theme === 'light'}
					<Sun size={22} class="text-text hover:opacity-80 active:ring-2" />
				{:else}
					<Moon size={22} class="text-text hover:opacity-80 active:ring-2" />
				{/if}
			</button>
		</div>
	</div>
	<div class="flex-1 overflow-hidden p-2 pt-0">
		{@render children()}
	</div>
</div>

<style>
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 10px;
		background: linear-gradient(
			to right,
			hsl(0, 100%, 50%),
			hsl(60, 100%, 50%),
			hsl(120, 100%, 50%),
			hsl(180, 100%, 50%),
			hsl(240, 100%, 50%),
			hsl(300, 100%, 50%),
			hsl(360, 100%, 50%)
		);
		outline: none;
		border-radius: 5px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: white;
		cursor: pointer;
		border-radius: 50%;
		border: 2px solid #ddd;
	}

	input[type='range']::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: white;
		cursor: pointer;
		border-radius: 50%;
		border: 2px solid #ddd;
	}
</style>

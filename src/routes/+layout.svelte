<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<slot />
</div>

<style>
	:root {
		--dark: 0, 21, 36;
		--cyan: 21, 97, 109;
		--light: 255, 236, 209;
		--orange: 255, 125, 0;
		--brown: 120, 41, 15;
	}

	:global {
		body {
			margin: 0;
			font-family: 'Roboto', sans-serif;
			font-optical-sizing: auto;
			font-weight: 400;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
		}

		input,
		button,
		textarea,
		select {
			font: inherit;
		}
	}

	.container {
		display: flex;
		width: 100%;
		height: 100vh;
	}
</style>

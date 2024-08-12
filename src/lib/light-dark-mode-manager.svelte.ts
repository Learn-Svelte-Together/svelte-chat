type DarkLightMode = 'light' | 'dark';

export class LightDarkModeManager {
	public mode = $state<DarkLightMode>('light');

	public init() {
		if (typeof window === 'undefined') {
			console.warn('LightDarkModeManager: Skipping initialization because window is undefined');
		}
		this.mode = this.getMode();
	}

	public toggle() {
		const stored = LightDarkModeManager.getStored();

		let current = stored === 'system'
			? LightDarkModeManager.getPreferred()
			: this.getMode();

		this.mode = current === 'light'
			? 'dark'
			: 'light';

		localStorage.setItem('darkLightMode', this.mode);
	}

	private getMode(): DarkLightMode {
		const stored = LightDarkModeManager.getStored();

		return stored === 'system' 
			? LightDarkModeManager.getPreferred() 
			: stored;
	}

	private static getStored(): DarkLightMode | 'system' {
		return (localStorage.getItem('darkLightMode') ?? 'system') as DarkLightMode | 'system';
	}

	private static getPreferred(): DarkLightMode {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
}

export const lightDarkModeManager = new LightDarkModeManager();
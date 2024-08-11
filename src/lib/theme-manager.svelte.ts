export class ColorHSL {
	constructor(
		public h: number,
		public s: number,
		public l: number
	) {
		if (h < 0 || h >= 360) {
			throw new Error('Invalid hue value');
		}

		if (s < 0 || s > 100) {
			throw new Error('Invalid saturation value');
		}

		if (l < 0 || l > 100) {
			throw new Error('Invalid lightness value');
		}
	}

	public static parse(color: string): ColorHSL | null {
		const match = color.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);

		if (!match) {
			return null;
		}

		const [_, h, s, l] = match.map((value) => parseInt(value));

		return new ColorHSL(h, s, l);
	}

	public toString(): string {
		return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
	}

	public toRGB(): ColorRGB {
		const c: number = (1 - Math.abs(2 * this.l - 1)) * this.s;
		const x: number = c * (1 - Math.abs(((this.h / 60) % 2) - 1));
		const m: number = this.l - c / 2;
		let r: number, g: number, b: number;

		if (0 <= this.h && this.h < 60) {
			[r, g, b] = [c, x, 0];
		} else if (60 <= this.h && this.h < 120) {
			[r, g, b] = [x, c, 0];
		} else if (120 <= this.h && this.h < 180) {
			[r, g, b] = [0, c, x];
		} else if (180 <= this.h && this.h < 240) {
			[r, g, b] = [0, x, c];
		} else if (240 <= this.h && this.h < 300) {
			[r, g, b] = [x, 0, c];
		} else {
			[r, g, b] = [c, 0, x];
		}

		// Adjust RGB values
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);

		return { r, g, b };
	}
}

type ColorRGB = { r: number; g: number; b: number };
type Theme = 'system' | 'light' | 'dark';

export class ThemeManager {
	theme = $state<Theme>('light');
	color = $state<ColorHSL>(new ColorHSL(0, 86, 52));
	
	constructor() {
		this.initTheme();
		this.initColor();
	}

	initTheme() {
		if (typeof window === 'undefined') return;

		const storedTheme = localStorage.getItem('theme') as Theme | null;
		this.theme =
			storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	}

	toggleTheme() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', this.theme);
	}

	setColor(color: ColorHSL) {
		this.color = color;
		this.updateColor();
		localStorage.setItem('color', color.toString());
	}

	setOnAccentColor() {
		const colorRGB: ColorRGB = this.color.toRGB();

		// Calculate relative luminance, based on how human eyes perceive brightness of different colors.
		const luminance: number = (0.299 * colorRGB.r + 0.587 * colorRGB.g + 0.114 * colorRGB.b) / 255;

		// Set onAccent color based on luminance
		document.documentElement.style.setProperty(
			'--color-onAccent',
			luminance < 0.5 ? 'black' : 'white'
		);
	}


	private initColor() {
		if (typeof window === 'undefined') return;

		const storedColorString = localStorage.getItem('color');
		const storedColor = storedColorString ? ColorHSL.parse(storedColorString) : null;
		
		if (storedColor) {
			this.color = storedColor;
			this.updateColor();
		}
	}

	private updateColor() {
		document.documentElement.style.setProperty('--color-accent', this.color.toString());

		this.setOnAccentColor();
	}
}

export const themeManager = new ThemeManager();
import { DefaultTheme } from 'styled-components';

export const lightTheme = {
	positive1: '#64B686',
	positive2: '#4EA673',
	negative1: '#E94278',
	negative2: '#E52461',
	neutral1: '#FFFFFF',
	neutral2: '#F3F3F4',
	neutral3: '#EDEDEE',
	neutral4: '#C9C9C9',
	neutral5: '#CCCCCC',
	neutral6: '#F7F7F7',
	neutral7: '#FAFAFA',
	neutral8: '#B1B1B1',
	neutralA1: '#0A0A0A',
	neutralA2: '#5F5F5F',
	neutralA3: '#5C5C5C',
	neutralA4: '#484D5E',
	neutralA5: '#A4A4A4',
	neutralA6: '#A9A9A9',
	neutralA7: '#C3C3C3',
	neutralA8: '#7780A0',
	overlay1: 'rgb(130, 130, 130, .25)',
	primary1: '#F96E46',
	primary2: '#E6562C',
	alt1: '#0350E7',
	alt2: '#0350E7',
	semiTransparent1: 'rgba(255, 255, 255, 0.575)',
	semiTransparent2: 'rgba(0, 0, 0, 0.45)',
	semiTransparent3: 'rgba(0, 0, 0, 0.55)',
	semiTransparent4: '#AEAEAE45',
	semiTransparent5: 'rgb(240, 240, 240, 0.85)',
	scheme: 'light',
	light1: '#FFFFFF',
	light2: '#DADADA',
	dark1: '#151515',
};

export const theme = (currentTheme: any): DefaultTheme => ({
	scheme: currentTheme.scheme,
	colors: {
		accordion: {
			background: currentTheme.neutral1,
			hover: currentTheme.neutral2,
			color: currentTheme.neutralA1,
		},
		border: {
			primary: currentTheme.neutralA2,
			alt1: currentTheme.primary1,
			alt2: currentTheme.neutralA6,
			alt3: currentTheme.neutral5,
			alt4: currentTheme.neutral8,
		},
		button: {
			primary: {
				background: currentTheme.neutral1,
				border: currentTheme.neutral5,
				color: currentTheme.neutralA1,
				active: {
					background: currentTheme.neutral2,
					border: currentTheme.neutralA2,
					color: currentTheme.neutralA1,
				},
				disabled: {
					background: currentTheme.neutral3,
					border: currentTheme.neutral5,
					color: currentTheme.neutral8,
				},
			},
			alt1: {
				background: currentTheme.neutral1,
				border: currentTheme.neutral4,
				color: currentTheme.neutralA1,
				active: {
					background: currentTheme.neutral2,
					border: currentTheme.neutralA2,
					color: currentTheme.neutralA1,
				},
				disabled: {
					background: currentTheme.neutral3,
					border: currentTheme.neutral5,
					color: currentTheme.neutral8,
				},
			},
			alt2: {
				background: currentTheme.neutralA1,
				border: currentTheme.neutralA1,
				color: currentTheme.neutralA1,
				active: {
					background: currentTheme.neutralA4,
					border: currentTheme.neutralA4,
					color: currentTheme.neutralA4,
				},
				disabled: {
					background: currentTheme.neutral3,
					border: currentTheme.neutral3,
					color: currentTheme.neutralA2,
				},
			},
		},
		checkbox: {
			active: {
				background: currentTheme.primary2,
			},
			background: currentTheme.neutral1,
			hover: currentTheme.neutral3,
			disabled: currentTheme.neutral5,
		},
		container: {
			primary: {
				background: currentTheme.neutral1,
				active: currentTheme.neutral2,
			},
			alt1: {
				background: currentTheme.neutral3,
			},
			alt2: {
				background: currentTheme.neutral2,
			},
			alt3: {
				background: currentTheme.neutral6,
			},
			alt4: {
				background: currentTheme.neutral7,
			},
			alt5: {
				background: currentTheme.neutralA4,
			},
			alt6: {
				background: currentTheme.primary1,
			},
			alt7: {
				background: currentTheme.neutralA3,
			},
			alt8: {
				background: currentTheme.dark1,
			},
			alt9: {
				background: currentTheme.primary1,
			},
			alt10: {
				background: currentTheme.primary2,
			},
		},
		font: {
			primary: currentTheme.neutralA1,
			alt1: currentTheme.neutralA4,
			alt2: currentTheme.neutralA4,
			alt3: currentTheme.neutral5,
			alt4: currentTheme.neutral1,
			alt5: currentTheme.primary1,
			light1: currentTheme.light1,
			light2: currentTheme.light2,
			dark1: currentTheme.dark1,
		},
		form: {
			background: currentTheme.neutral1,
			border: currentTheme.neutral4,
			invalid: {
				outline: currentTheme.negative1,
				shadow: currentTheme.negative2,
			},
			valid: {
				outline: currentTheme.neutralA4,
				shadow: currentTheme.neutral3,
			},
			disabled: {
				background: currentTheme.neutral2,
				border: currentTheme.neutral5,
				label: currentTheme.neutralA2,
			},
		},
		gradient: {
			start: currentTheme.primary1,
			middle: currentTheme.primary1,
			end: currentTheme.primary2,
		},
		icon: {
			primary: {
				fill: currentTheme.neutralA1,
				active: currentTheme.neutral4,
				disabled: currentTheme.neutralA3,
			},
			alt1: {
				fill: currentTheme.neutral4,
				active: currentTheme.semiTransparent4,
				disabled: currentTheme.neutral3,
			},
			alt2: {
				fill: currentTheme.neutralA1,
				active: currentTheme.neutralA4,
				disabled: currentTheme.neutral3,
			},
			alt3: {
				fill: currentTheme.neutralA2,
				active: currentTheme.neutral1,
				disabled: currentTheme.neutral3,
			},
		},
		indicator: {
			active: currentTheme.positive1,
			number: currentTheme.alt1,
		},
		link: {
			color: currentTheme.neutralA1,
			active: currentTheme.neutralA4,
		},
		loader: {
			primary: currentTheme.primary2,
		},
		overlay: {
			primary: currentTheme.overlay1,
			alt1: currentTheme.semiTransparent2,
			alt2: currentTheme.semiTransparent3,
			alt3: currentTheme.semiTransparent1,
		},
		row: {
			active: {
				background: currentTheme.neutral3,
				border: currentTheme.neutral2,
			},
			hover: {
				background: currentTheme.neutral2,
			},
		},
		scrollbar: {
			track: currentTheme.neutral2,
			thumb: currentTheme.neutral3,
		},
		shadow: {
			primary: currentTheme.semiTransparent5,
			alt1: currentTheme.neutral4,
			alt2: currentTheme.neutralA7,
		},
		tabs: {
			color: currentTheme.neutralA4,
			active: {
				background: currentTheme.primary1,
				color: currentTheme.neutralA1,
			},
		},
		view: {
			background: currentTheme.neutral1,
		},
		warning: {
			primary: currentTheme.negative1,
			alt1: currentTheme.negative2,
		},
	},
	typography: {
		family: {
			primary: `'Roboto Mono', monospace`,
			alt1: `'DM Sans', sans-serif;`,
		},
		size: {
			xxxSmall: '10px',
			xxSmall: '11px',
			xSmall: 'clamp(10px,1.75vw,14px)',
			small: 'clamp(10px,1.75vw,14px)',
			base: 'clamp(10px,1.75vw,14px)',
			lg: '16px',
			xLg: '28px',
			h1: 'clamp(24px, 4.5vw, 48px)',
			h2: 'clamp(30px, 3.5vw, 38px)',
			h4: 'clamp(28px, 2vw, 36px)',
		},
		weight: {
			regular: '200',
			medium: '300',
			bold: '400',
			xBold: '500',
		},
	},
});

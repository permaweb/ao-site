import { DefaultTheme } from 'styled-components';

export const lightTheme = {
	scheme: 'light',
	positive1: '#06C516',
	positive2: '#06B214',
	caution1: '#EEB700',
	negative1: '#F16A82',
	negative2: '#EE4463',
	neutral1: '#FFFFFF',
	neutral2: '#F9F9F9',
	neutral3: '#F0F0F0',
	neutral4: '#E4E4E4',
	neutral5: '#D6D6D6',
	neutral6: '#CCCCCC',
	neutral7: '#ADADAD',
	neutral8: '#A3A3A3',
	neutral9: '#8F8F8F',
	neutralA1: '#151515',
	neutralA2: '#333333',
	neutralA3: '#3D3D3D',
	neutralA4: '#474747',
	neutralA5: '#525252',
	neutralA6: '#666666',
	neutralA7: '#707070',
	overlay1: 'rgb(0, 0, 0, .45)',
	overlay2: 'rgb(0, 0, 0, .5)',
	shadow1: 'rgb(220, 220, 220, .5)',
	primary1: '#091DFF',
	primary2: '#3344FF',
	accent1: '#51C85B',
	accent2: '#3BBA45',
	light1: '#FFFFFF',
	light2: '#DADADA',
	light3: '#B3B3B3',
	dark1: '#151515',
	dark2: '#333333',
	link1: '#0074E4',
	link2: '#0069CC',
	stats: {
		primary: '#FF8385',
		alt1: '#46B0B7',
		alt2: '#8886D9',
	},
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
			primary: currentTheme.neutral6,
			alt1: currentTheme.neutral7,
			alt2: currentTheme.neutral8,
			alt3: currentTheme.neutral9,
			alt4: currentTheme.neutralA7,
			alt5: currentTheme.primary1,
			alt6: currentTheme.primary2,
		},
		button: {
			primary: {
				background: currentTheme.neutral1,
				border: currentTheme.neutralA1,
				color: currentTheme.neutralA1,
				active: {
					background: currentTheme.neutral3,
					border: currentTheme.neutralA7,
					color: currentTheme.neutralA1,
				},
				disabled: {
					background: currentTheme.neutral3,
					border: currentTheme.neutral5,
					color: currentTheme.neutral7,
				},
			},
			alt1: {
				background: currentTheme.accent1,
				border: currentTheme.accent1,
				color: currentTheme.light1,
				active: {
					background: currentTheme.accent2,
					border: currentTheme.accent2,
					color: currentTheme.light1,
				},
				disabled: {
					background: currentTheme.neutral3,
					border: currentTheme.neutral5,
					color: currentTheme.neutral7,
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
					color: currentTheme.neutral7,
				},
			},
		},
		checkbox: {
			active: {
				background: currentTheme.primary1,
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
				background: currentTheme.neutral2,
			},
			alt2: {
				background: currentTheme.neutral3,
			},
			alt3: {
				background: currentTheme.neutral4,
			},
			alt4: {
				background: currentTheme.neutral5,
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
			alt1: currentTheme.neutralA5,
			alt2: currentTheme.neutralA4,
			alt3: currentTheme.neutral8,
			alt4: currentTheme.neutral1,
			alt5: currentTheme.primary1,
			light1: currentTheme.light1,
			light2: currentTheme.light2,
			light3: currentTheme.light3,
			dark1: currentTheme.dark1,
			dark2: currentTheme.dark2,
		},
		form: {
			background: currentTheme.neutral1,
			border: currentTheme.neutral4,
			invalid: {
				outline: currentTheme.negative1,
				shadow: currentTheme.negative2,
			},
			valid: {
				outline: currentTheme.primary1,
				shadow: currentTheme.primary2,
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
				active: currentTheme.neutralA4,
				disabled: currentTheme.neutralA6,
			},
			alt1: {
				fill: currentTheme.neutral4,
				active: currentTheme.neutral5,
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
		},
		link: {
			color: currentTheme.link1,
			active: currentTheme.link2,
		},
		loader: {
			primary: currentTheme.primary1,
		},
		overlay: {
			primary: currentTheme.overlay1,
			alt1: currentTheme.overlay2,
		},
		stats: {
			primary: currentTheme.stats.primary,
			alt1: currentTheme.stats.alt1,
			alt2: currentTheme.stats.alt2,
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
			thumb: currentTheme.neutral5,
		},
		shadow: {
			primary: currentTheme.shadow1,
		},
		status: {
			draft: currentTheme.caution1,
			published: currentTheme.positive1,
		},
		tabs: {
			color: currentTheme.neutralA4,
			active: {
				background: currentTheme.primary1,
				color: currentTheme.neutralA1,
			},
		},
		tooltip: {
			background: currentTheme.dark2,
			border: currentTheme.neutral9,
			color: currentTheme.light1,
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
			xxxSmall: '12px',
			xxSmall: '13px',
			xSmall: '14px',
			small: '15px',
			base: '16px',
			lg: '18px',
			xLg: '24px',
			xxLg: '28px',
			h1: 'clamp(36px, 3.5vw, 56px)',
			h2: 'clamp(32px, 3.25vw, 50px)',
			h4: 'clamp(28px, 3vw, 42px)',
		},
		weight: {
			thin: '200',
			light: '300',
			regular: '400',
			medium: '500',
			bold: '600',
			xBold: '700',
		},
	},
});

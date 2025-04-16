import { DefaultTheme } from 'styled-components';

export const lightTheme = {
	scheme: 'light',
	positive1: '#23BE30',
	positive2: '#23BE30',
	caution1: '#EEB700',
	negative1: '#ED254E',
	negative2: '#E2123C',
	neutral1: '#FFFFFF',
	neutral2: '#F7F7F7',
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
	shadow1: 'rgb(150, 150, 150, .5)',
	shadow2: 'rgb(75, 75, 75, .5)',
	primary1: '#3344FF',
	primary2: '#091DFF',
	accent1: '#23BE30',
	accent2: '#23BE30',
	light1: '#FFFFFF',
	light2: '#DADADA',
	light3: '#B3B3B3',
	dark1: '#151515',
	dark2: '#333333',
	link1: '#23BE30',
	link2: '#23BE30',
	chart1: '#C78135',
	chart2: '#FBF5EE',
	stats: {
		primary: '#ddece7',
		alt1: '#e8eae6',
		alt2: '#e9e2d3',
		alt3: '#e7e3ec',
		alt4: '#e2e4e8',
		alt5: '#d9e3e2',
		alt6: '#dadbd7',
		alt7: '#f4f2ef',
		alt8: '#dcd8e4',
		alt9: '#f0eae0',
		alt10: '#e3e1e8',
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
			primary: currentTheme.neutral3,
			alt1: currentTheme.neutral4,
			alt2: currentTheme.neutral8,
			alt3: currentTheme.neutral9,
			alt4: currentTheme.neutralA7,
			alt5: currentTheme.accent1,
			alt6: currentTheme.accent2,
		},
		button: {
			primary: {
				background: currentTheme.neutral2,
				border: currentTheme.neutral9,
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
		chart: {
			primary: currentTheme.chart1,
			background: currentTheme.chart2,
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
			border: currentTheme.neutral6,
			invalid: {
				outline: currentTheme.negative1,
				shadow: currentTheme.negative2,
			},
			valid: {
				outline: currentTheme.accent1,
				shadow: currentTheme.accent2,
			},
			disabled: {
				background: currentTheme.neutral2,
				border: currentTheme.neutral5,
				label: currentTheme.neutral7,
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
			primary: currentTheme.positive1,
			active: currentTheme.positive2,
		},
		link: {
			color: currentTheme.link1,
			active: currentTheme.link2,
		},
		loader: {
			primary: currentTheme.accent2,
		},
		overlay: {
			primary: currentTheme.overlay1,
			alt1: currentTheme.overlay2,
		},
		stats: {
			primary: currentTheme.stats.primary,
			alt1: currentTheme.stats.alt1,
			alt2: currentTheme.stats.alt2,
			alt3: currentTheme.stats.alt3,
			alt4: currentTheme.stats.alt4,
			alt5: currentTheme.stats.alt5,
			alt6: currentTheme.stats.alt6,
			alt7: currentTheme.stats.alt7,
			alt8: currentTheme.stats.alt8,
			alt9: currentTheme.stats.alt9,
			alt10: currentTheme.stats.alt10,
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
			alt1: currentTheme.shadow2,
		},
		status: {
			draft: currentTheme.caution1,
			published: currentTheme.positive1,
		},
		tabs: {
			color: currentTheme.neutralA4,
			active: {
				background: currentTheme.accent1,
				color: currentTheme.neutral1,
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
			alt1: `'DM Sans', sans-serif`,
		},
		size: {
			xxxSmall: 'clamp(11px, 1.15vw, 12px)',
			xxSmall: 'clamp(12px, 1.25vw, 13px)',
			xSmall: 'clamp(13px, 1.35vw, 14px)',
			small: 'clamp(14px, 1.45vw, 15px)',
			base: 'clamp(15px, 1.5vw, 16px)',
			lg: 'clamp(16px, 1.65vw, 18px)',
			xLg: 'clamp(18px, 1.75vw, 24px)',
			xxLg: 'clamp(28px, 2.75vw, 34px)',
			h1: 'clamp(36px, 3.5vw, 56px)',
			h2: 'clamp(32px, 3.25vw, 50px)',
			h4: 'clamp(28px, 3vw, 38px)',
			h6: 'clamp(18px, 2vw, 22px)',
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

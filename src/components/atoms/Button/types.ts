import React from 'react';

import { ButtonType } from 'helpers/types';

export interface IProps {
	id?: string;
	type: ButtonType;
	label: string | number | React.ReactNode;
	handlePress: (e: React.MouseEvent) => void;
	disabled?: boolean;
	active?: boolean;
	loading?: boolean;
	loadingText?: string;
	icon?: string;
	iconLeftAlign?: boolean;
	formSubmit?: boolean;
	noFocus?: boolean;
	useMaxWidth?: boolean;
	noMinWidth?: boolean;
	width?: number;
	height?: number;
	fullWidth?: boolean;
	tooltip?: string;
	warning?: boolean;
	className?: string;
	noTextTransform?: boolean;
	labelColor?: string;
}

import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

export const TabsHeader = styled.div<{ useFixed: boolean }>`
	width: 100%;
	overflow-x: auto;
	button {
		flex: 1;
		span {
			white-space: nowrap;
		}
	}
	@media (max-width: ${STYLING.cutoffs.secondary}) {
		position: relative;
		top: auto;
	}
`;

export const Tabs = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
`;

export const Content = styled.div``;

export const View = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	margin: 40px 0 0 0;
`;

import styled from 'styled-components';

import { STYLING } from 'helpers/config';

export const LinksWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 28.5px;
	position: relative;

	a {
		font-size: ${(props) => props.theme.typography.size.xxSmall};
		line-height: 1;
	}
`;

import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div``;

export const DashboardLink = styled(Link)`
	font-weight: bold;
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-size: 14px;
	text-decoration: underline;
`;

export const LeftPanel = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	gap: 48px;
`;

export const Header = styled.header`
	margin-bottom: 20px;
`;

export const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Title = styled.h1`
	font-size: 29px;
	font-weight: 400;
	letter-spacing: normal;
`;

export const Subtitle = styled.h2`
	font-size: 12px;
	color: #6b6b6b;
	font-weight: 400;
	letter-spacing: normal;
`;

export const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
`;

export const StatCard = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const StatLabel = styled.div`
	font-size: 14px;
	color: #222326;
	font-weight: normal;
`;

export const StatValue = styled.div`
	font-size: 32px;
	font-weight: medium;
	color: #222326;
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const TabsContainer = styled.div`
	display: flex;
	background-color: #f2f2f2;
	border-radius: 50px;
	padding: 6px;
	gap: 6px;
`;

export const Tab = styled.button<{ active: boolean }>`
	min-width: 160px;
	font-family: ${(props) => props.theme.typography.family.alt1};
	padding: 12px;
	background-color: ${({ active }) => (active ? '#fff' : '#F2F2F2')};
	border-radius: 50px;

	cursor: pointer;
	&:hover {
		background-color: #fff;
	}
`;

export const SearchBar = styled.div`
	border: 1px solid #dedede;
	border-radius: 50px;
`;

export const SearchInput = styled.input`
	min-width: 500px;
	padding: 20px 20px;
	border: none;
	font-family: ${(props) => props.theme.typography.family.alt1};
	color: #6a6a6a;
	font-weight: 500;
	font-size: 13px;
`;

export const TableCell = styled.td<{ align?: 'left' | 'center' | 'right' }>`
	text-align: ${(props) => props.align || 'left'};
	padding: 30px 10px;
	table tr:not(.expanded) & {
		border-bottom: 1px solid #eee;
	}
	font-size: 13px;
	font-family: ${(props) => props.theme.typography.family.alt1};
	font-weight: 400;
	vertical-align: middle;
`;

export const TokenInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const AddButton = styled.button`
	padding: 8px 14px;
	background-color: #51c85b;
	color: #fff;
	border: none;
	border-radius: 2px;
	cursor: pointer;
	font-weight: 700;
	font-size: 14px;
	&:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	flex-direction: row;

	& svg polyline {
		stroke: #fff;
		stroke-width: 30;
	}
`;

export const AllocationPanel = styled.div`
	flex: 1;
	padding: 20px;
	background-color: #f7f7f7;
	border-radius: 8px;
`;

export const SubmitButton = styled.button`
	margin-top: 20px;
	padding: 25px 12px;
	background-color: #51c85b;
	color: #fff;
	border: none;
	width: 100%;
	border-radius: 4px;
	font-size: 19px;
	font-weight: 700;
	line-height: 0;

	&:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}
`;

export const ConnectButton = styled.button`
	padding: 10px 20px;
	background-color: #fafafa;
	color: #333;
	border: 1px solid #afafaf;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background-color: #f0f0f0;
	}
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const SectionTitle = styled.h4`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 14px;
	font-weight: 400;
	letter-spacing: normal;
	margin: 20px 0;
`;

export const CoreTokensContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
`;

export const CoreTokenCard = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 12px 8px;
	box-shadow: 0 2px 1.2px rgba(0, 0, 0, 0.02);
	display: flex;
	flex-direction: column;
	border: 1px solid #f6f6f6;
	justify-content: space-between;
	gap: 12px;
`;

export const CoreTokenHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	gap: 10px;
	flex-direction: row;
`;

export const CoreTokenName = styled.div`
	font-size: 18px;
	font-weight: 500;
	font-family: ${(props) => props.theme.typography.family.alt1};
	line-height: 1;
`;

export const CoreTokenTicker = styled.span`
	color: #ccc;
	font-size: 12px;
	font-family: ${(props) => props.theme.typography.family.alt1};
	line-height: 1;
`;

export const CardAddButton = styled.button`
	padding: 6px 12px;
	background-color: #51c85b;
	color: #fff;
	border: none;
	cursor: pointer;
	width: 100%;
	font-size: 19px;
	font-weight: 700;
	line-height: 0;

	&:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}

	& svg {
		width: 19px;
		height: 19px;
	}

	& svg line {
		stroke: #fff;
		stroke-width: 30;
	}

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
`;

export const TableRow = styled.tr`
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #f9f9f9;
	}

	&.expanded {
		background-color: #f5f5f5;
	}
	position: relative;
`;

export const RowActionContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	justify-content: flex-end;

	& svg line {
		stroke-width: 30;
	}
`;

export const SeeDetailsButton = styled.button`
	padding: 6px 12px;
	background-color: transparent;
	color: #333;
	border: none;
	cursor: pointer;
	opacity: 0;
	table tr:hover & {
		opacity: 1;
	}

	font-family: ${(props) => props.theme.typography.family.alt1};
	font-size: 10px;
	position: absolute;
	top: 68px;
	left: 0;
	right: 0;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 8px;
`;

export const CloseAllButton = styled.button`
	padding: 6px 12px;
	background-color: #f5f5f5;
	color: #555;
	border: 1px solid #ddd;
	border-radius: 5px;
	cursor: pointer;
	font-size: 13px;
	transition: background-color 0.2s;

	&:hover {
		background-color: #e8e8e8;
	}
`;

export const DetailsRow = styled.tr`
	background-color: #f5f5f5;
`;

export const DetailsCell = styled.td`
	padding: 0;
`;

export const DetailsContent = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 20px;
	border-bottom: 1px solid #eee;
	gap: 40px;
`;

export const DetailsHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	margin-bottom: 20px;
	position: relative;
`;

export const DetailsTitle = styled.h3`
	font-size: 20px;
	font-weight: 500;
	margin: 0;
	line-height: 1.2;
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const DetailsTicker = styled.div`
	color: #757575;
	font-size: 14px;
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const CloseButton = styled.button`
	position: absolute;
	right: 0;
	top: 0;
	background: transparent;
	border: none;
	cursor: pointer;
	padding: 5px;

	& svg {
		width: 16px;
		height: 16px;
	}
`;

export const DetailsSection = styled.div`
	margin-bottom: 15px;
`;

export const DetailsSectionTitle = styled.h4`
	font-size: 14px;
	color: #757575;
	margin: 0 0 5px 0;
	font-weight: normal;
	text-transform: uppercase;
`;

export const DetailsStat = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
	font-size: 16px;
	font-weight: 500;
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const DetailsSectionsGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const DetailsSectionHeading = styled.h3`
	font-size: 14px;
	font-weight: 500;
	margin: 0 0 10px 0;
	font-family: ${(props) => props.theme.typography.family.alt1};
	text-decoration: underline;
`;

export const DetailSectionContent = styled.div`
	display: flex;
	flex-direction: row;
	gap: 15px;

	& > div {
		padding: 10px;
		background-color: #fff;
		border-radius: 5px;
	}
`;

export const DetailsSectionLabel = styled.div`
	font-size: 10px;
	color: #ababab;
	text-transform: uppercase;
	margin-bottom: 5px;
	font-weight: normal;
`;

export const DetailsSectionValue = styled.div`
	font-size: 14px;
	font-weight: 600;
	font-family: ${(props) => props.theme.typography.family.alt1};
	color: #000;
`;

export const SocialLinks = styled.div`
	display: flex;
	gap: 15px;
	margin: 15px 0;

	& a {
		color: #333;

		& svg {
			width: 20px;
			height: 20px;
		}
	}
`;

export const DetailsDescription = styled.div`
	font-size: 12px;
	line-height: 2;
	color: #6b6b6b;
	font-family: ${(props) => props.theme.typography.family.alt1};
`;

export const AllocationContainer = styled.div`
	background: #fff;
	padding: 10px;
	border-radius: 10px;

	.allocation-item {
		padding-left: 6px;
		padding-right: 6px;
	}
`;

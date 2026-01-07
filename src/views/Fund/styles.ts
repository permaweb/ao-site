import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div``;

export const DashboardLink = styled(Link)`
	font-weight: bold;
	font-family: ${(props) => props.theme.typography.family.primary};
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

export const HeaderContent = styled.div<{ isTablet?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: ${(props) => (props.isTablet ? 'flex-start' : 'center')};
	flex-direction: ${(props) => (props.isTablet ? 'column' : 'row')};
	gap: ${(props) => (props.isTablet ? '20px' : '0')};
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

export const StatsGrid = styled.div<{ isTablet?: boolean }>`
	display: grid;
	grid-template-columns: ${(props) => (props.isTablet ? '1fr' : 'repeat(4, 1fr)')};
	gap: 20px;

	.total-delegations {
		grid-column: ${(props) => (props.isTablet ? 'span 1' : 'span 2')};
	}
`;

export const StatCard = styled.div<{ isMobile?: boolean }>`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	align-items: ${(props) => (props.isMobile ? 'flex-start' : 'flex-start')};
	justify-content: space-between;
	${(props) => props.isMobile && `gap: 15px;`}
`;

export const StatLabelRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 40px;
	width: 100%;
`;

export const StatLabel = styled.div`
	font-size: 10.3px;
	color: #222326;
	font-weight: normal;
`;

export const Ticker = styled.span`
	font-size: 11px;
	color: #7d7d7d;
	font-weight: normal;
`;

export const StatValue = styled.div<{ isMobile?: boolean }>`
	font-size: ${(props) => (props.isMobile ? '24px' : '32px')};
	font-weight: 500;
	color: #222326;
	font-family: ${(props) => props.theme.typography.family.primary};
	display: flex;
	align-items: center;
	gap: 10px;

	svg {
		width: 24px;
		height: 24px;
	}
`;

export const StatSubLabel = styled.div`
	font-size: 10px;
	color: #6b6b6b;
	font-weight: normal;
`;

export const StatSubValue = styled.div`
	font-size: 12px;
	font-weight: 500;
	color: #222326;
	font-family: ${(props) => props.theme.typography.family.primary};
`;

export const TabsContainer = styled.div`
	display: flex;
	background-color: #f2f2f2;
	border-radius: 50px;
	padding: 6px;
	gap: 6px;
	justify-content: center;
`;

export const Tab = styled.button<{ active: boolean }>`
	min-width: 160px;
	font-family: ${(props) => props.theme.typography.family.primary};
	padding: 12px;
	background-color: ${({ active }) => (active ? '#fff' : '#F2F2F2')};
	border-radius: 50px;

	cursor: pointer;
	&:hover {
		background-color: #fff;
	}
`;

export const TabsAndSearchContainer = styled.div<{ isMobile?: boolean }>`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	justify-content: space-between;
	align-items: ${(props) => (props.isMobile ? 'stretch' : 'center')};
	margin-bottom: 20px;
	gap: ${(props) => (props.isMobile ? '10px' : '0')};
`;

export const SearchBar = styled.div<{ isTablet?: boolean; isMobile?: boolean }>`
	border: 1px solid #dedede;
	border-radius: 50px;
	width: ${(props) => (props.isMobile ? '100%' : 'auto')};
`;

export const SearchInput = styled.input<{ isTablet?: boolean; isMobile?: boolean }>`
	min-width: ${(props) => (props.isTablet || props.isMobile ? 'auto' : '500px')};
	width: ${(props) => (props.isMobile ? '100%' : 'auto')};
	padding: ${(props) => (props.isTablet || props.isMobile ? '15px 20px' : '20px 20px')};
	border: none;
	font-family: ${(props) => props.theme.typography.family.primary};
	color: #6a6a6a;
	font-weight: 500;
	font-size: 13px;
	box-sizing: border-box;
`;

export const TableCell = styled.td<{ align?: 'left' | 'center' | 'right' }>`
	text-align: ${(props) => props.align || 'left'};
	padding: 30px 10px;
	table tr:not(.expanded) & {
		border-bottom: 1px solid #eee;
	}
	font-size: 13px;
	font-family: ${(props) => props.theme.typography.family.primary};
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
	background-color: ${(props) => props.theme.colors.button.alt1.background};
	color: #fff;
	border: none;
	border-radius: 2px;
	cursor: pointer;
	font-weight: 500;
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
	position: sticky;
	top: 76px;
	align-self: flex-start;
	max-height: calc(100vh - 40px);
	overflow-y: auto;
`;

export const SubmitButton = styled.button`
	margin-top: 20px;
	padding: 25px 12px;
	background: ${(props) => props.theme.colors.button.alt1.background};
	color: #fff;
	border: none;
	width: 100%;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	line-height: 0;

	&:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}
`;

export const FlpSelectorButton = styled.button`
	padding: 8px 12px;
	background-color: #fafafa;
	color: #333;
	border: 1px solid #afafaf;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		background-color: #f0f0f0;
	}
	display: flex;
	gap: 4px;
	align-items: center;

	font-size: 14px;
	font-weight: 500;
	font-family: ${(props) => props.theme.typography.family.primary};
`;

export const FlpSelectorDropdown = styled.div`
	width: 300px;
	max-width: 90vw;
	max-height: 500px;
	overflow-y: auto;
	position: absolute;
	z-index: 1;
	top: 47.5px;
	left: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 12.5px 20px 13.5px 20px;
	border-radius: 10px;
	background: #ffffff;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const FlpSelectorItem = styled.button<{ selected?: boolean }>`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 14px;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-weight: ${(props) => props.theme.typography.weight.medium};
	color: ${(props) => props.theme.colors.font?.primary || '#222326'};
	padding: 8px 5px;
	border-radius: 5px;
	text-align: left;
	background: ${(props) => (props.selected ? '#f0f7f1' : 'transparent')};

	&:hover {
		background: ${(props) => (props.selected ? '#e5f2e6' : '#f5f5f5')};
	}

	.selected-indicator {
		margin-left: auto;
		color: ${(props) => props.theme.colors.button.alt1.background};
		font-size: 20px;
		line-height: 1;

		svg {
			width: 18px;
			height: 18px;
			display: block;

			path {
				fill: ${(props) => props.theme.colors.button.alt1.background};
			}
		}
	}
`;

export const FlpSelectorDoneButton = styled.button`
	margin-top: 10px;
	padding: 8px 0;
	background-color: ${(props) => props.theme.colors.button.alt1.background};
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-weight: 500;
	font-size: 14px;
	font-family: ${(props) => props.theme.typography.family.primary};
	text-align: center;

	&:hover {
		background-color: #48b652;
	}
`;

export const FlpModalContent = styled.div`
	padding: 20px;

	.search-container {
		margin-bottom: 30px;
	}

	${SearchBar} {
		width: 100%;
	}

	${SearchInput} {
		min-width: auto;
		width: 100%;
		padding: 15px 20px;
	}

	.flp-list {
		max-height: 400px;
		overflow-y: auto;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
`;

export const FlpModalItem = styled.button<{ selected?: boolean }>`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 15px;
	border-radius: 5px;
	text-align: left;
	background: ${(props) => (props.selected ? '#f0f7f1' : 'transparent')};
	transition: background 0.2s;
	border: none;

	&:hover {
		background: ${(props) => (props.selected ? '#e5f2e6' : '#f5f5f5')};
	}

	.flp-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.flp-name {
		font-size: 14px;
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.medium};
		color: ${(props) => props.theme.colors.font?.primary || '#222326'};
	}

	.flp-ticker {
		font-size: 12px;
		color: #757575;
	}

	.selected-indicator {
		margin-left: auto;
		color: ${(props) => props.theme.colors.button.alt1.background};
		font-size: 20px;
		line-height: 1;

		svg {
			width: 18px;
			height: 18px;
			display: block;

			path {
				fill: ${(props) => props.theme.colors.button.alt1.background};
			}
		}
	}
`;

export const FlpModalFooter = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 10px;
	border-top: 1px solid #eee;

	${FlpSelectorDoneButton} {
		min-width: 120px;
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
	font-family: ${(props) => props.theme.typography.family.primary};
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

export const CoreTokensContainer = styled.div<{ isTablet?: boolean }>`
	display: grid;
	grid-template-columns: ${(props) => (props.isTablet ? '1fr' : 'repeat(3, 1fr)')};
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
	font-family: ${(props) => props.theme.typography.family.primary};
	line-height: 1;
`;

export const CoreTokenTicker = styled.span`
	color: #ccc;
	font-size: 12px;
	font-family: ${(props) => props.theme.typography.family.primary};
	line-height: 1;
`;

export const CardAddButton = styled.button`
	padding: 10px 12px;
	background-color: ${(props) => props.theme.colors.button.alt1.background};
	color: #fff;
	border: none;
	cursor: pointer;
	width: 100%;
	font-size: 19px;
	font-weight: 500;
	line-height: 0;
	border-radius: 4px;

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

	& svg polyline {
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

export const SeeDetailsButton = styled.button<{ isCard?: boolean }>`
	padding: 6px 12px;
	background-color: transparent;
	color: #333;
	border: none;
	cursor: pointer;
	font-family: ${(props) => props.theme.typography.family.primary};
	font-size: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 8px;

	${(props) =>
		!props.isCard &&
		`
		opacity: 0;
		table tr:hover & {
			opacity: 1;
		}
		position: absolute;
		top: 68px;
		left: 0;
		right: 0;
	`}
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

export const DetailsCell = styled.td<{ isTablet?: boolean }>`
	padding: 20px;
	border-bottom: 1px solid #eee;
	${(props) => props.isTablet && `padding: 0px;`}
`;

export const DetailsContent = styled.div<{ isTablet?: boolean }>`
	display: grid;
	grid-template-columns: ${(props) => (props.isTablet ? '1fr' : '1fr 1fr')};
	gap: ${(props) => (props.isTablet ? '20px' : '40px')};
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
	font-family: ${(props) => props.theme.typography.family.primary};
`;

export const DetailsTicker = styled.div`
	color: #757575;
	font-size: 14px;
	font-family: ${(props) => props.theme.typography.family.primary};
`;

export const CloseButton = styled.button`
	position: absolute;
	right: 25px;
	top: 25px;
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
	font-family: ${(props) => props.theme.typography.family.primary};
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
	font-family: ${(props) => props.theme.typography.family.primary};
	text-decoration: underline;
`;

export const DetailSectionContent = styled.div<{ isTablet?: boolean }>`
	display: flex;
	flex-direction: ${(props) => (props.isTablet ? 'column' : 'row')};
	gap: 15px;

	& > div {
		padding: 10px;
		background-color: #fff;
		border-radius: 5px;
		${(props) => props.isTablet && `flex-basis: auto;`}/* Allow items to take full width in column layout */
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
	font-family: ${(props) => props.theme.typography.family.primary};
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
	font-family: ${(props) => props.theme.typography.family.primary};
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

export const IdBlockContainer = styled.div`
	width: fit-content;
	padding: 5px;
	background-color: #fff;
	border-radius: 4px;
	font-size: 12px;
	font-family: ${(props) => props.theme.typography.family.primary};
`;

export const ViewOnAoLink = styled(Link)`
	font-size: 12px;
	font-family: ${(props) => props.theme.typography.family.primary};

	&:hover {
		text-decoration: underline;
	}
`;

export const MobileAllocationButton = styled.button`
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	padding: 25px 20px;
	background-color: ${(props) => props.theme.colors.button.alt1.background};
	color: #fff;
	border: none;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	line-height: 0;
	cursor: pointer;
	z-index: 1000;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.33);

	&:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}

	&:hover {
		background-color: ${(props) => props.theme.colors.button.alt1.hover};
	}
`;

export const ModalOverlay = styled.div<{ isMobile?: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1001;

	${(props) =>
		props.isMobile &&
		`
		padding: 0;
		align-items: stretch;
		justify-content: stretch;
	`}
`;

export const ModalContent = styled.div<{ isMobile?: boolean }>`
	background-color: white;
	padding: 0;
	border-radius: ${(props) => (props.isMobile ? '0' : '8px')};
	position: relative;
	width: ${(props) => (props.isMobile ? '100vw' : 'clamp(300px, 90vw, 500px)')};
	height: ${(props) => (props.isMobile ? '100vh' : 'auto')};
	max-height: ${(props) => (props.isMobile ? '100vh' : '90vh')};
	display: flex;
	flex-direction: column;

	${(props) =>
		props.isMobile &&
		`
		box-shadow: none;
		overflow-y: auto;
	`}

	${AllocationPanel} {
		position: ${(props) => (props.isMobile ? 'static' : 'sticky')};
		max-height: ${(props) => (props.isMobile ? 'none' : 'calc(90vh - 60px)')};
		width: 100%;
		box-sizing: border-box;
		${(props) =>
			props.isMobile &&
			`
			border-radius: 0;
			flex-grow: 1;
			`}
	}
`;

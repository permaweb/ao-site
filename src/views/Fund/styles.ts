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
	gap: 32px;
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
	padding: 10px;
	border-bottom: 1px solid #eee;
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
	padding: 6px 12px;
	background-color: #51c85b;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	&:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}
`;

export const AllocationPanel = styled.div`
	flex: 1;
	padding: 20px;
	background-color: #f7f7f7;
	border-radius: 8px;
`;

export const SubmitButton = styled.button`
	padding: 10px 20px;
	background-color: #51c85b;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: #0056b3;
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

// Core Permaweb Tokens Styles
export const SectionTitle = styled.h3`
	display: flex;
	align-items: center;
	font-size: 18px;
	font-weight: 400;
	margin-bottom: 20px;
`;

export const Icon = styled.span`
	margin-right: 10px;
	font-weight: bold;
`;

export const CoreTokensContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
`;

export const CoreTokenCard = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 2px 1.2px rgba(0, 0, 0, 0.02);
	display: flex;
	flex-direction: column;
	border: 1px solid #f6f6f6;
`;

export const CoreTokenHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

export const CoreTokenIcon = styled.div<{ type: string }>`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	color: white;
	font-weight: bold;
	background: ${(props) =>
		props.type === 'pi'
			? '#8884d8'
			: props.type === 'arweave'
			? '#82ca9d'
			: props.type === 'ao'
			? '#ffc658'
			: '#f0f0f0'};
`;

export const CoreTokenName = styled.div`
	font-size: 16px;
	font-weight: 500;
`;

export const CoreTokenTicker = styled.span`
	color: #757575;
	margin-left: 5px;
`;

export const AddButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/atoms/Button';
import { URLS } from 'helpers/config';
import { Footer } from 'navigation/footer';

import * as MintS from '../Mint/styles';

import * as S from './styles';

type DashboardRow = {
	route: string;
	stakingScore: number;
};

const DASHBOARD_ROWS: DashboardRow[] = [
	{
		route: 'https://arhub.asia',
		stakingScore: 12,
	},
	{
		route: 'https://arhub.global',
		stakingScore: 24,
	},
	{
		route: 'https://arhub.network',
		stakingScore: 36,
	},
	{
		route: 'https://arhub.dev',
		stakingScore: 48,
	},
	{
		route: 'https://arhub-labs.io',
		stakingScore: 60,
	},
];

export default function NasaDashboard() {
	const navigate = useNavigate();

	return (
		<S.PageWrapper className={'fade-in'}>
			<MintS.BodyWrapper>
				<S.HeaderBlock>
					<S.HeaderTop>
						<h1>NASA Dashboard</h1>
						<S.ActionButton>
							<Button
								type={'primary'}
								label={'Add Node to NASA'}
								handlePress={() => navigate(URLS.nasa)}
							/>
						</S.ActionButton>
					</S.HeaderTop>
					<p>Placeholder table for route variations and incremental staking scores.</p>
				</S.HeaderBlock>
				<S.TableWrapper className={'border-wrapper-primary'}>
					<S.TableHead>
						<S.HeadCell>Route</S.HeadCell>
						<S.HeadCell>Staking Score</S.HeadCell>
					</S.TableHead>
					<S.TableBody>
						{DASHBOARD_ROWS.map((row) => (
							<S.Row key={row.route}>
								<S.Cell>{row.route}</S.Cell>
								<S.Cell>{row.stakingScore}</S.Cell>
							</S.Row>
						))}
					</S.TableBody>
				</S.TableWrapper>
			</MintS.BodyWrapper>
			<Footer />
		</S.PageWrapper>
	);
}

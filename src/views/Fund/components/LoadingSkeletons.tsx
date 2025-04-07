import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 2rem;
`;

const Skeleton = styled.div`
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: loading 1.5s infinite;
	border-radius: 0.25rem;
	height: 1rem;

	@keyframes loading {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
`;

const HeaderSkeleton = styled(Skeleton)`
	width: 60%;
	height: 2rem;
`;

const SubheaderSkeleton = styled(Skeleton)`
	width: 80%;
	height: 1.5rem;
`;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.5rem;
	margin-top: 2rem;
`;

const StatCard = styled.div`
	background: white;
	padding: 1.5rem;
	border-radius: 0.5rem;
`;

const TableSkeleton = styled.div`
	margin-top: 2rem;
`;

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 50px 2fr 1fr 1fr 1fr 1fr;
	gap: 1rem;
	padding: 1rem;
	border-bottom: 1px solid #eee;
`;

export function LoadingSkeletons() {
	return (
		<Container>
			<HeaderSkeleton />
			<SubheaderSkeleton />
			<StatsGrid>
				{[1, 2, 3].map((i) => (
					<StatCard key={i}>
						<Skeleton style={{ width: '40%', marginBottom: '1rem' }} />
						<Skeleton style={{ width: '60%' }} />
					</StatCard>
				))}
			</StatsGrid>
			<TableSkeleton>
				{[1, 2, 3, 4, 5].map((i) => (
					<TableRow key={i}>
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</TableRow>
				))}
			</TableSkeleton>
		</Container>
	);
}

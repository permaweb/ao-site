import React from 'react';
import styled from 'styled-components';

export const Skeleton = styled.div<{ width?: string | number; height?: string | number }>`
	background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	background-size: 200% 100%;
	animation: loading 1.5s infinite;
	border-radius: 0.25rem;
	height: ${(props) => (typeof props.height === 'number' ? `${props.height}px` : props.height || '1rem')};
	width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width || 'auto')};

	@keyframes loading {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;
	padding: 2rem;
	max-width: 100%;
	overflow-x: hidden;
`;

const LeftPanel = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	gap: 48px;
	max-width: 100%;
`;

const AllocationPanel = styled.div`
	width: 340px;
	background-color: #f7f7f7;
	border-radius: 8px;
	padding: 20px;
	height: fit-content;
`;

const HeaderContainer = styled.div<{ isTablet?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: ${(props) => (props.isTablet ? 'flex-start' : 'center')};
	flex-direction: ${(props) => (props.isTablet ? 'column' : 'row')};
	gap: ${(props) => (props.isTablet ? '20px' : '0')};
	margin-bottom: 20px;
`;

const HeaderContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const HeaderActions = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
`;

const StatsGrid = styled.div<{ isTablet?: boolean }>`
	display: grid;
	grid-template-columns: ${(props) => (props.isTablet ? '1fr' : 'repeat(4, 1fr)')};
	gap: 20px;
	margin-bottom: 30px;

	& > div:first-child {
		grid-column: ${(props) => (props.isTablet ? 'span 1' : 'span 2')};
	}
`;

const StatCard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const CoreTokensGrid = styled.div<{ isTablet?: boolean }>`
	display: grid;
	grid-template-columns: ${(props) => (props.isTablet ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)')};
	gap: 20px;
	margin-top: 1rem;
	margin-bottom: 2rem;
	max-width: 100%;
`;

const CoreTokenCard = styled.div`
	background: white;
	padding: 1.5rem;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border: 1px solid #f6f6f6;
	height: 180px;
`;

const TokenHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const TableContainer = styled.div`
	width: 100%;
	overflow-x: auto;
`;

const TableSkeleton = styled.div`
	margin-top: 1rem;
`;

const TabsContainer = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 1rem;
`;

const TableRow = styled.div<{ isTablet?: boolean }>`
	display: grid;
	grid-template-columns: ${(props) => (props.isTablet ? '1fr' : '5% 20% 20% 20% 15% 15%')};
	gap: 10px;
	padding: 1rem;
	border-bottom: ${(props) => (props.isTablet ? 'none' : '1px solid #eee')};
	width: 100%;
	box-sizing: border-box;
	${(props) =>
		props.isTablet &&
		`
		background: white; /* Similar to actual cards */
		border-radius: 8px;
		margin-bottom: 15px;
		box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* Similar to actual cards */
		height: auto; /* Or a fixed height like 120px */
		padding: 15px; /* Match card padding */
	`}
`;

const TabsAndSearchContainerSkeleton = styled.div<{ isMobile?: boolean }>`
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	justify-content: space-between;
	align-items: ${(props) => (props.isMobile ? 'stretch' : 'center')};
	gap: ${(props) => (props.isMobile ? '20px' : '0')};
`;

export function LoadingSkeletons({ isTablet, isMobile }: { isTablet?: boolean; isMobile?: boolean }) {
	return (
		<Container>
			<LeftPanel style={{ width: isTablet || isMobile ? '100%' : 'auto' }}>
				<div>
					<HeaderContainer isTablet={isTablet}>
						<HeaderContent>
							<Skeleton style={{ width: isTablet ? '80%' : '400px', height: '29px' }} />
							<Skeleton style={{ width: isTablet ? '60%' : '300px', height: '12px' }} />
						</HeaderContent>
						<HeaderActions>
							<Skeleton style={{ width: '120px', height: '20px' }} />
							<Skeleton style={{ width: '150px', height: '40px', borderRadius: '5px' }} />
						</HeaderActions>
					</HeaderContainer>

					<StatsGrid isTablet={isTablet}>
						{[1, 2, 3].map((i, index) => (
							<StatCard key={i}>
								<div>
									<Skeleton style={{ width: '80px', height: '14px', marginBottom: '8px' }} />
									<Skeleton style={{ width: '60px', height: '32px' }} />
									{index === 0 && !isMobile && (
										<div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
											<div>
												<Skeleton style={{ width: '60px', height: '12px', marginBottom: '5px' }} />
												<Skeleton style={{ width: '40px', height: '15px' }} />
											</div>
											<div>
												<Skeleton style={{ width: '100px', height: '12px', marginBottom: '5px' }} />
												<Skeleton style={{ width: '40px', height: '15px' }} />
											</div>
										</div>
									)}
								</div>
								<Skeleton style={{ width: '80px', height: '65px' }} />
							</StatCard>
						))}
					</StatsGrid>
				</div>

				<div>
					<Skeleton style={{ width: '300px', height: '20px', marginBottom: '20px' }} />
					<CoreTokensGrid isTablet={isTablet}>
						{[1, 2, 3].map((i) => (
							<CoreTokenCard key={i}>
								<TokenHeader>
									<Skeleton style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
									<div>
										<Skeleton style={{ width: '100px', height: '18px', marginBottom: '8px' }} />
										<Skeleton style={{ width: '60px', height: '12px' }} />
									</div>
								</TokenHeader>
								<Skeleton style={{ width: '100%', height: '40px' }} />
								<Skeleton style={{ width: '100%', height: '40px', borderRadius: '4px' }} />
							</CoreTokenCard>
						))}
					</CoreTokensGrid>
				</div>

				<div>
					<Skeleton style={{ width: '300px', height: '20px', marginBottom: '20px' }} />
					<TabsAndSearchContainerSkeleton isMobile={isMobile}>
						<TabsContainer>
							<Skeleton style={{ width: '180px', height: '40px', borderRadius: '50px' }} />
							<Skeleton style={{ width: '180px', height: '40px', borderRadius: '50px' }} />
						</TabsContainer>
						<Skeleton
							style={{
								width: '100%',
								maxWidth: isMobile ? '100%' : '300px',
								height: '50px',
								borderRadius: '50px',
							}}
						/>
					</TabsAndSearchContainerSkeleton>
					<TableContainer>
						<TableSkeleton>
							{!isTablet && (
								<TableRow>
									{[1, 2, 3, 4, 5, 6].map((i) => (
										<Skeleton key={i} style={{ height: '20px' }} />
									))}
								</TableRow>
							)}
							{[1, 2, 3, 4, 5].map((i) => (
								<TableRow key={i} isTablet={isTablet}>
									{isTablet ? (
										<>
											<Skeleton style={{ width: '70%', height: '20px', marginBottom: '10px' }} />
											<Skeleton style={{ width: '90%', height: '15px', marginBottom: '10px' }} />
											<Skeleton style={{ width: '50%', height: '15px' }} />
										</>
									) : (
										[1, 2, 3, 4, 5, 6].map((j) => <Skeleton key={j} style={{ height: '20px' }} />)
									)}
								</TableRow>
							))}
						</TableSkeleton>
					</TableContainer>
				</div>
			</LeftPanel>

			{!(isTablet || isMobile) && (
				<AllocationPanel>
					<Skeleton style={{ width: '150px', height: '29px', marginBottom: '10px' }} />
					<Skeleton style={{ width: '300px', height: '12px', marginBottom: '20px' }} />

					<Skeleton style={{ width: '100%', height: '300px', borderRadius: '50%', marginBottom: '20px' }} />

					<Skeleton style={{ width: '100%', height: '20px', marginBottom: '10px' }} />
					<Skeleton style={{ width: '100%', height: '1px', marginBottom: '10px' }} />

					<Skeleton style={{ width: '80%', height: '20px', marginBottom: '15px' }} />

					<div style={{ marginBottom: '20px' }}>
						{[1, 2, 3, 4, 5].map((i) => (
							<div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
								<Skeleton style={{ width: '70%', height: '20px' }} />
								<Skeleton style={{ width: '20%', height: '20px' }} />
							</div>
						))}
					</div>

					<Skeleton style={{ width: '100%', height: '50px', borderRadius: '4px' }} />
				</AllocationPanel>
			)}
		</Container>
	);
}

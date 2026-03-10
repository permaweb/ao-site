import React from 'react';

import { Modal } from 'components/atoms/Modal';
import { EthTokenEnum } from 'helpers/types';

import { BalanceSection } from './BalanceSection';
import * as S from './styles';

export default function MintBalances() {
	const [info, setInfo] = React.useState<string | null>(null);

	return (
		<>
			<S.BalancesWrapper>
				<S.BalancesBodyWrapper>
					<S.BalancesBreakdownWrapper>
						<S.BalancesFlexWrapper>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.StEth} />
							</S.BalanceFlexSection>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.USDS} />
							</S.BalanceFlexSection>
							<S.BalanceFlexSection>
								<BalanceSection type={EthTokenEnum.DAI} />
							</S.BalanceFlexSection>
						</S.BalancesFlexWrapper>
					</S.BalancesBreakdownWrapper>
				</S.BalancesBodyWrapper>
			</S.BalancesWrapper>
			{info && (
				<Modal header={'Earnings'} handleClose={() => setInfo(null)}>
					<S.ModalWrapper className={'modal-wrapper'}>
						<span>{info}</span>
					</S.ModalWrapper>
				</Modal>
			)}
		</>
	);
}

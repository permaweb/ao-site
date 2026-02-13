import { Button } from 'components/atoms/Button';
import { formatAddress } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function WalletConnect() {
  const arProvider = useArweaveProvider();
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];

  let label = language.connectWallet;

  if (arProvider.walletAddress) label = formatAddress(arProvider.walletAddress, false);

  return (
    <S.ConnectWrapper
      className={'border-wrapper-primary'}
      onClick={() => (arProvider.walletAddress ? {} : arProvider.setWalletModalVisible(true))}
      isConnected={!!arProvider.walletAddress}
    >
      <p>{label}</p>
      {arProvider.walletAddress && (
        <Button type={'alt2'} label={language.disconnect} handlePress={() => arProvider.handleDisconnect()} />
      )}
    </S.ConnectWrapper>
  );
}

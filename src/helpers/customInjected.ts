// cc https://github.com/Synthetixio/js-monorepo/blob/master/v2/ui/containers/Connector/customInjected.ts

import { EIP1193Provider } from '@web3-onboard/core';
import { InjectedNameSpace, InjectedWalletModule, ProviderLabel } from '@web3-onboard/injected-wallets/dist/types';

// This disables brave showing when injected
export const customBrave: InjectedWalletModule = {
  // The label that will be displayed in the wallet selection modal
  label: ProviderLabel.Brave,
  // The property on the window where the injected provider is defined
  // Example: window.ethereum
  injectedNamespace: InjectedNameSpace.Ethereum,

  checkProviderIdentity: ({}) => false,

  // A method that returns a string of the wallet icon which will be displayed
  getIcon: async () => (await import('@web3-onboard/injected-wallets/dist/icons/brave')).default,
  // Returns a valid EIP1193 provider. In some cases the provider will need to be patched to satisfy the EIP1193 Provider interface
  getInterface: async () => {
    let provider = {} as EIP1193Provider;
    if ((window?.ethereum && window.ethereum.isMetaMask && !window.ethereum?.isBraveWallet) || !window?.ethereum) {
      window.open('https://brave.com/wallet/', '_blank');
    } else {
      provider = window?.ethereum;
    }

    return {
      provider,
      instance: {},
    };
  },
  // A list of platforms that this wallet supports
  platforms: ['all'],
};

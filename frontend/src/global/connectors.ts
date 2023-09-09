import { Mainnet, Rinkeby, Goerli, BSC, BSCTestnet } from '@usedapp/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { MAINNET_RPC, TESTNET_RPC, GOERLI_RPC, BSCMAIN_RPC, BSCTEST_RPC } from './constants';

export const injected = new InjectedConnector({
  supportedChainIds: [Mainnet.chainId, Rinkeby.chainId, Goerli.chainId, BSC.chainId, BSCTestnet.chainId],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    [Mainnet.chainId]: MAINNET_RPC,
    [Rinkeby.chainId]: TESTNET_RPC,
    [Goerli.chainId]: GOERLI_RPC,
    [BSC.chainId]: BSCMAIN_RPC,
    [BSCTestnet.chainId]: BSCTEST_RPC,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
  supportedChainIds: [Mainnet.chainId, Rinkeby.chainId, Goerli.chainId, BSC.chainId, BSCTestnet.chainId],
});

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/35bfbfa4f2454a729b06fbe0d14f7378`,
  appName: 'Star System Labs Frontend',
  supportedChainIds: [Mainnet.chainId, Rinkeby.chainId, Goerli.chainId, BSC.chainId, BSCTestnet.chainId],
});

import { Mainnet, Rinkeby, Goerli, BSC, BSCTestnet, Config, DAppProvider } from '@usedapp/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { GOERLI_RPC, MAINNET_RPC, TESTNET_RPC, BSCMAIN_RPC, BSCTEST_RPC } from 'global/constants';

import App from './App';
import reportWebVitals from './reportWebVitals';

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  networks: [Mainnet, Rinkeby, Goerli, BSC, BSCTestnet],
  readOnlyUrls: {
    [Mainnet.chainId]: MAINNET_RPC,
    [Rinkeby.chainId]: TESTNET_RPC,
    [Goerli.chainId]: GOERLI_RPC,
    [BSC.chainId]: BSCMAIN_RPC,
    [BSCTestnet.chainId]: BSCTEST_RPC,
  },
  pollingInterval: 15000,
};

ReactDOM.render(
  <DAppProvider config={config}>
    <Router>
      <Toaster />
      <App />
    </Router>
  </DAppProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

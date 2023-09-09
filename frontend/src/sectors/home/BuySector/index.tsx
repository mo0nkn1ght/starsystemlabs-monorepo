import { BSCMAIN_RPC, MAINNET_RPC, METEOR_ADDR, METEOR_DECIMAL, MOONBASE_ADDR, MOONBASE_DECIMAL } from 'global/constants';
import useScript from 'hooks/useScript';
import React, { useEffect, useState } from 'react'; // eslint-disable-next-line
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Button from 'components/based/Button';
import Input from 'components/based/Input';
import { useEthers, BSC, useTokenBalance, useEtherBalance } from '@usedapp/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import WalletConnectionModal from 'components/composed/WalletConnectionModal';
import { toast } from 'react-hot-toast';
import { formatUnits } from '@ethersproject/units'; // eslint-disable-next-line

import styles from './index.module.scss';

declare global {
  interface Window {
    RubicSDK: any;
    ethereum: any;
    BinanceChain: any;
  }
}

interface InstantTrade {
  swap: any;
}

const fromContracts = [
  {
    name: 'BNB',
    address: '0x0000000000000000000000000000000000000000',
  },
  {
    name: 'WBNB',
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
];

const toContracts = [
  {
    name: 'MNBASE',
    address: MOONBASE_ADDR,
  },
  {
    name: 'METO',
    address: METEOR_ADDR,
  },
];

export default function BuySector() {
  useScript('https://unpkg.com/rubic-sdk@latest/dist/rubic-sdk.min.js');
  const { account, chainId, switchNetwork } = useEthers();
  const [fromAddress, setFromAddress] = useState(fromContracts[0]);
  const [toAddress, setToAddress] = useState(toContracts[0]);
  const [fromAmount, setFromAmount] = useState('0.01');
  const [toAmount, setToAmount] = useState('Calculating...');
  const [open, setOpen] = useState(false);

  // const [fromDropdown] = useState(fromContracts);
  // const [toDropdown] = useState(toContracts);
  const [enableSwitch, setEnableSwitch] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<InstantTrade | null>(null);
  const BNBBalance = useEtherBalance(account);
  const WBNBBalance = useTokenBalance('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', account);
  const MNBASEBalance = useTokenBalance(MOONBASE_ADDR, account);
  const METOBalance = useTokenBalance(METEOR_ADDR, account);
  const BNBBalanceNum = Number(formatUnits(BNBBalance || '0', 18)).toFixed(6);
  const WBNBBalanceNum = Number(formatUnits(WBNBBalance || '0', 18)).toFixed(6);
  const MNBASEBalanceNum = Number(formatUnits(MNBASEBalance || '0', MOONBASE_DECIMAL)).toFixed(6);
  const METOBalanceNum = Number(formatUnits(METOBalance || '0', METEOR_DECIMAL)).toFixed(6);
  const balances = JSON.stringify({ BNB: BNBBalanceNum, WBNB: WBNBBalanceNum, MNBASE: MNBASEBalanceNum, METO: METOBalanceNum });

  useEffect(() => {
    if (chainId !== 56) {
      setEnableSwitch(true);
    } else {
      setEnableSwitch(false);
      const delayDebounceFn = setTimeout(() => {
        // console.log(fromAmount);
        if (fromAmount === '' || fromAmount === '0') {
          setFromAmount('0');
          setToAmount('0');
        } else {
          getTrades(fromAddress.address, toAddress.address, fromAmount);
        }
      }, 3000);

      return () => clearTimeout(delayDebounceFn);
    } // eslint-disable-next-line
  }, [chainId, account, fromAmount, fromAddress.address, toAddress.address]);

  const handleChange = (field: string, value: string) => {
    let num = value;
    if (Number(value) >= 1) {
      num = value.replace(/^0+/, '') || '0';
    } else if (Number(num) < 0) {
      toast.error('Buy amount should be greater than 0');
      num = '0';
    }
    if (field === 'from') {
      setFromAmount(num.toString());
    } else if (field === 'to') {
      setToAmount(num.toString());
    }
    setToAmount('Calculating...');
  };

  const handleSelect = (field: string, value: string) => {
    if (field === 'from') {
      setFromAddress(JSON.parse(value));
      getTrades(JSON.parse(value).address, toAddress.address, fromAmount);
    } else if (field === 'to') {
      setToAddress(JSON.parse(value));
      getTrades(fromAddress.address, JSON.parse(value).address, fromAmount);
    }
    setToAmount('Calculating...');
  };

  const getTrades = async (from: any, to: any, fromAmount: any) => {
    if (window.RubicSDK && account) {
      const walletProvider = {
        address: account,
        chainId: `0x${chainId?.toString(16)}`,
        core: window.ethereum,
      };
      const configuration = {
        rpcProviders: {
          ETH: {
            mainRpc: MAINNET_RPC,
          },
          BSC: {
            mainRpc: BSCMAIN_RPC,
          },
        },
        walletProvider,
      };
      try {
        const sdk = await window.RubicSDK.SDK.createSDK(configuration);
        const blockchain = 'BSC';

        // calculate trades
        const trades = await sdk.instantTrades.calculateTrade({ blockchain, address: from }, fromAmount, to, { slippageTolerance: 0.1 });

        let foundTrade = false;
        trades.map((instantTrade: any) => {
          if (instantTrade.to) {
            if (instantTrade.type === 'PANCAKE_SWAP') {
              foundTrade = true;
              setCurrentTrade(instantTrade);
              setToAmount(instantTrade.to.tokenAmount.toFixed());
              // setHasTrade(hasTrade + 1);
            }
            console.log(
              `(${instantTrade.type}) ${instantTrade.from.symbol}: ${instantTrade.from.tokenAmount.toFixed()} -> ${
                instantTrade.to.symbol
              }: ${instantTrade.to.tokenAmount.toFixed()}`
            );
          }
        });
        if (!foundTrade) {
          setTimeout(() => {
            getTrades(from, to, fromAmount);
          }, 5000);
        }
      } catch (e: any) {
        if (e.message) {
          toast.error(e.message);
        } else {
          const err = e?.stack?.split(' at ')[1]?.split('.')[0]?.trim();
          toast.error(err.replace(/([a-z])([A-Z])/g, '$1 $2'));
        }
        // console.log(e);
      }
    } else {
      setTimeout(() => {
        getTrades(from, to, fromAmount);
      }, 3000);
    }
  };

  const onConfirm = (hash: string) => {
    toast.success(`Transaction Successful, TxId: ${hash}`);
  };

  const onApprove = (hash: string) => {
    toast.success(`Approved, TxId: ${hash}`);
  };

  const submitSwap = async () => {
    try {
      currentTrade && (await currentTrade.swap({ onConfirm, onApprove }));
    } catch (e: any) {
      if (e.message) {
        toast.error(e.message);
      } else {
        const err = e?.stack?.split(' at ')[1]?.split('.')[0]?.trim();
        toast.error(err.replace(/([a-z])([A-Z])/g, '$1 $2'));
      }
    }
  };

  /* const switchFromTo = () => {
    if (JSON.stringify(fromContracts) === JSON.stringify(fromDropdown)) {
      setFromDropdown(toContracts);
      setToDropdown(fromContracts);
    } else {
      setFromDropdown(fromContracts);
      setToDropdown(toContracts);
    }
    const switchAddress = '' + fromAddress;
    const switchAmount = fromAmount;
    getTrades(toAddress, switchAddress, toAmount);
    setFromAddress(toAddress);
    setToAddress(switchAddress);
    setFromAmount(toAmount);
    setToAmount('Calculating...');
  }; */

  return (
    <section className={styles.sectorWrapper} id="buy">
      <WalletConnectionModal open={open} onClose={() => setOpen(false)} />
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.auction}>
            <div className={styles.header}>
              <h2>Become a Citizen</h2>
            </div>
            <div className={styles.header}>
              <p>
                <img src="/images/buy.png" width="100%" />
              </p>
            </div>
            <p>
              Moonbase and Meteor both have <b className={styles.warning}>Anti Whale/Bot/Rug mechanics</b> by limiting the number of tokens able to be
              transfered and held by wallets.
            </p>
            <div style={{ padding: '30px 0' }}>
              {account ? (
                enableSwitch ? (
                  <Button secondary customClass={styles.connect} onClick={() => switchNetwork(BSC.chainId)}>
                    Switch Network to BSC
                  </Button>
                ) : (
                  <>
                    <Input
                      id="from"
                      balance={balances}
                      inputValue={fromAmount}
                      ticker={fromAddress}
                      options={fromContracts}
                      onHandleChange={handleChange}
                      onHandleSelect={handleSelect}
                    />
                    <div>
                      {/* <Button secondary customClass={styles.connect} onClick={switchFromTo}> */}
                      <ArrowDownward />
                      {/* </Button> */}
                    </div>
                    <Input
                      id="to"
                      balance={balances}
                      inputValue={toAmount}
                      ticker={toAddress}
                      options={toContracts}
                      onHandleChange={handleChange}
                      onHandleSelect={handleSelect}
                    />
                    <div style={{ marginTop: '25px' }}>
                      <Button secondary customClass={styles.connect} onClick={submitSwap} disabled={toAmount === 'Calculating...'}>
                        {toAmount === 'Calculating...' ? toAmount : 'Swap'}
                      </Button>
                    </div>
                  </>
                )
              ) : (
                <Button secondary customClass={styles.connect} onClick={() => setOpen(true)}>
                  <AccountBalanceWalletIcon />
                  <span className={styles.connectText}>Connect wallet</span>
                </Button>
              )}
            </div>
            <div className={styles.buy_info}>
              <div className={styles.mnbase}>
                <p className={styles.smalltitle}>
                  <u>Moonbase Limits</u>
                </p>
                <p>
                  Max Buy/Sell - <b className={styles.warning}>691000 $MNBASE</b>
                </p>
                <p>
                  Max Wallet Amount - <b className={styles.warning}>6910000 $MNBASE</b>
                </p>
                <p>Buy/Sell Limits Delay - 55 Seconds</p>
              </div>
              <div className={styles.meteor}>
                <p className={styles.smalltitle}>
                  <u>Meteor Limits</u>
                </p>
                <p>
                  Max Buy/Sell - <b className={styles.warning}>100 $METO</b>
                </p>
                <p>
                  Max Wallet Amount - <b className={styles.warning}>6910 $METO</b>
                </p>
                <p>Buy/Sell Limits Delay - 22 Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

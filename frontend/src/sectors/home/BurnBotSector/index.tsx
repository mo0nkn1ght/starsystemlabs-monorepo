import { useEthers, useTokenAllowance, useTokenBalance, BSC } from '@usedapp/core';
import { formatAmount } from 'global/utils';
import React, { useEffect, useState } from 'react'; // eslint-disable-next-line
import { formatUnits, parseUnits } from '@ethersproject/units'; // eslint-disable-next-line
import Button from 'components/based/Button';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import WalletConnectionModal from 'components/composed/WalletConnectionModal';
import { useApproveFn, useContractMethod, useContractCallMethod, useTotalSupplyAddress, useCallMethod } from 'hooks/useOtto';
import {
  WLUNA_ADDR,
  WLUNC_ADDR,
  AUTOBOT_ADDR,
  WLUNA_DECIMAL,
  WLUNC_DECIMAL,
  MOONBASE_DECIMAL,
  METEOR_DECIMAL,
  DISCORD_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
} from 'global/constants';
import { toast } from 'react-hot-toast'; // eslint-disable-next-line
import useScript from 'hooks/useScript';
import useLink from 'hooks/useLink';
// import Input from 'components/based/Input';

import styles from './index.module.scss';

declare global {
  interface Window {
    Odometer: any;
  }
}

const addresses: any = {
  WLUNA: WLUNA_ADDR,
  WLUNC: WLUNC_ADDR,
};

// let loaded = false;

export default function BurnBotSector() {
  useScript('https://github.hubspot.com/odometer/odometer.js');
  useLink('css/odometer.css');

  const { account, chainId, switchNetwork } = useEthers();
  const tokenABalance = useTokenBalance(WLUNC_ADDR, account);
  const tokenBBalance = useTokenBalance(WLUNA_ADDR, account);
  const tokenABalanceNum = Number(formatUnits(tokenABalance || '0', WLUNC_DECIMAL));
  const tokenBBalanceNum = Number(formatUnits(tokenBBalance || '0', WLUNA_DECIMAL));

  const totalSupplyA = useTotalSupplyAddress(WLUNC_ADDR);
  const totalSupplyB = useTotalSupplyAddress(WLUNA_ADDR);
  const totalSupplyANum = Number(formatUnits(toFixed(totalSupplyA) || 0, WLUNC_DECIMAL));
  const totalSupplyBNum = Number(toFixed(totalSupplyB) / Math.pow(10, WLUNA_DECIMAL));

  const [amount, setAmount] = useState('0');
  const [token, setToken] = useState('WLUNC');
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('Approve');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [showMBClaim, setShowMBClaim] = useState(false);
  const [showMClaim, setShowMClaim] = useState(false);
  const [showMBClaimAmount, setShowMBClaimAmount] = useState(0);
  const [showMClaimAmount, setShowMClaimAmount] = useState(0);
  const [enableSwitch, setEnableSwitch] = useState(false);
  const [burnt, setBurnt] = useState(-1);

  const { approve } = useApproveFn(addresses[token]);
  const { send: sendTokenAtoC } = useContractMethod(AUTOBOT_ADDR, 'sendTokenAtoC');
  const { send: sendTokenBtoC } = useContractMethod(AUTOBOT_ADDR, 'sendTokenBtoC');
  const { send: sendTokenAtoD } = useContractMethod(AUTOBOT_ADDR, 'sendTokenAtoD');
  const { send: sendTokenBtoD } = useContractMethod(AUTOBOT_ADDR, 'sendTokenBtoD');

  const { send: swapAtoC } = useContractMethod(AUTOBOT_ADDR, 'AtoCSwap');
  const { send: swapBtoC } = useContractMethod(AUTOBOT_ADDR, 'BtoCSwap');
  const { send: swapAtoD } = useContractMethod(AUTOBOT_ADDR, 'AtoDSwap');
  const { send: swapBtoD } = useContractMethod(AUTOBOT_ADDR, 'BtoDSwap');

  const allowances: any = {
    WLUNC: Number(formatUnits(useTokenAllowance(addresses['WLUNC'], account, AUTOBOT_ADDR) || '0', WLUNC_DECIMAL)),
    WLUNA: Number(formatUnits(useTokenAllowance(addresses['WLUNA'], account, AUTOBOT_ADDR) || '0', WLUNA_DECIMAL)),
  };

  const aTocTokenTrackerBalance = useContractCallMethod(account ? account : null, 'aTocTokenTrackerBalance');
  const bTocTokenTrackerBalance = useContractCallMethod(account ? account : null, 'bTocTokenTrackerBalance');
  const aTodTokenTrackerBalance = useContractCallMethod(account ? account : null, 'aTodTokenTrackerBalance');
  const bTodTokenTrackerBalance = useContractCallMethod(account ? account : null, 'bTodTokenTrackerBalance');
  const aTocTokenTrackerBalanceNum = Number(
    formatUnits(aTocTokenTrackerBalance && aTocTokenTrackerBalance.value ? aTocTokenTrackerBalance.value[0] : 0, MOONBASE_DECIMAL)
  );
  const bTocTokenTrackerBalanceNum = Number(
    formatUnits(bTocTokenTrackerBalance && bTocTokenTrackerBalance.value ? bTocTokenTrackerBalance.value[0] : 0, MOONBASE_DECIMAL)
  );
  const aTodTokenTrackerBalanceNum = Number(
    formatUnits(aTodTokenTrackerBalance && aTodTokenTrackerBalance.value ? aTodTokenTrackerBalance.value[0] : 0, METEOR_DECIMAL)
  );
  const bTodTokenTrackerBalanceNum = Number(
    formatUnits(bTodTokenTrackerBalance && bTodTokenTrackerBalance.value ? bTodTokenTrackerBalance.value[0] : 0, METEOR_DECIMAL)
  );

  const totalTokenBurnt = useCallMethod(AUTOBOT_ADDR, 'totalTokenBurnt', []);
  const totalTokenBurntNum = parseInt(formatUnits(toFixed(totalTokenBurnt) || 0, WLUNA_DECIMAL));

  function toFixed(x: any) {
    if (Math.abs(x) < 1.0) {
      const e = parseInt(x.toString().split('e-')[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = '0.' + new Array(e).join('0') + x.toString().substring(2);
      }
    } else {
      let e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join('0');
      }
    }
    return x;
  }

  useEffect(() => {
    if (chainId !== 56) {
      setEnableSwitch(true);
    } else {
      setEnableSwitch(false);
      getInfo(token).then();
    } // eslint-disable-next-line
  }, [
    account,
    chainId,
    allowances,
    token,
    aTocTokenTrackerBalanceNum,
    bTocTokenTrackerBalanceNum,
    aTodTokenTrackerBalanceNum,
    bTodTokenTrackerBalanceNum,
    totalTokenBurntNum,
  ]);

  async function getInfo(currToken: string) {
    if (window.Odometer && burnt !== totalTokenBurntNum) {
      setBurnt(totalTokenBurntNum);
      // loaded = true;
      const odometer = new window.Odometer({
        auto: false,
        duration: 3000,
        animation: 'count',
        el: document.getElementsByClassName('odometer')[0],
        theme: 'car',
        format: '(,ddd).dd',
      });
      odometer.update(totalTokenBurntNum);
    }
    setBurnt(totalTokenBurntNum);
    setShowMBClaim(false);
    setShowMClaim(false);
    const AllowanceNumber = allowances[currToken];
    if (AllowanceNumber > 0) {
      if (currToken === 'WLUNC' && (aTocTokenTrackerBalanceNum > 0 || aTodTokenTrackerBalanceNum > 0)) {
        setStep('Claim');
        if (aTocTokenTrackerBalanceNum > 0) {
          setShowMBClaim(true);
          setShowMBClaimAmount(aTocTokenTrackerBalanceNum / 1000);
        }
        if (aTodTokenTrackerBalanceNum > 0) {
          setShowMClaim(true);
          setShowMClaimAmount(aTodTokenTrackerBalanceNum / 1000000);
        }
      } else if (currToken === 'WLUNA' && (bTocTokenTrackerBalanceNum > 0 || bTodTokenTrackerBalanceNum > 0)) {
        setStep('Claim');
        if (bTocTokenTrackerBalanceNum > 0) {
          setShowMBClaim(true);
          setShowMBClaimAmount(bTocTokenTrackerBalanceNum / 1000);
        }
        if (bTodTokenTrackerBalanceNum > 0) {
          setShowMClaim(true);
          setShowMClaimAmount(bTodTokenTrackerBalanceNum * 1000000);
        }
      } else {
        setStep('Burn');
      }
    } else {
      setStep('Approve');
    }
  }

  const handleChange = (e: any) => {
    let num = e.target.value;
    if (Number(num) >= 1) {
      num = e.target.value.replace(/^0+/, '') || '0';
    } else if (num < 0) {
      toast.error('Burn value should be greater than 0');
      num = '0';
    }

    setAmount(num);
  };

  const handleSelect = (e: any) => {
    setToken(e.target.value);
    getInfo(e.target.value);
  };

  const getAmount = () => {
    if (token === 'WLUNC') {
      return formatAmount(tokenABalance) + ' ' + token;
    } else if (token === 'WLUNA') {
      return formatAmount(tokenBBalance, 6) + ' ' + token;
    }
  };

  const callApprove = async () => {
    if (token === 'WLUNC') {
      setButtonDisable(true);
      await approve(AUTOBOT_ADDR, parseUnits(totalSupplyANum.toString(), WLUNC_DECIMAL));
      setButtonDisable(false);
    } else if (token === 'WLUNA') {
      setButtonDisable(true);
      await approve(AUTOBOT_ADDR, parseUnits(totalSupplyBNum.toString(), WLUNA_DECIMAL));
      setButtonDisable(false);
    }
    getInfo(token);
  };

  const callBurn = async (sendTo: string) => {
    if (Number(amount) <= 0) {
      toast.error('Burn Amount should be greater than 0');
    } else if (Number(amount) > (token === 'WLUNC' ? tokenABalanceNum : tokenBBalanceNum)) {
      toast.error('Burn Amount should be less than your balance');
    } else if (Number(amount) > allowances[token]) {
      toast.error('Burn Amount should be less than approved amount');
      setStep('Approve');
    } else {
      const newAmount = parseUnits(amount.toString(), token === 'WLUNC' ? WLUNC_DECIMAL : WLUNA_DECIMAL);
      if (token === 'WLUNC') {
        setButtonDisable(true);
        if (sendTo === 'Moonbase') {
          await sendTokenAtoC(newAmount);
        } else if (sendTo === 'Meteor') {
          await sendTokenAtoD(newAmount);
        }
        setButtonDisable(false);
      } else if (token === 'WLUNA') {
        setButtonDisable(true);
        if (sendTo === 'Moonbase') {
          await sendTokenBtoC(newAmount);
        } else if (sendTo === 'Meteor') {
          await sendTokenBtoD(newAmount);
        }
        setButtonDisable(false);
      }
      setAmount('0');
    }
    getInfo(token);
  };

  const callSwap = async (sendTo: string) => {
    if (token === 'WLUNC') {
      setButtonDisable(true);
      if (sendTo === 'Moonbase') {
        await swapAtoC();
      } else if (sendTo === 'Meteor') {
        await swapAtoD();
      }
      setButtonDisable(false);
    } else if (token === 'WLUNA') {
      setButtonDisable(true);
      if (sendTo === 'Moonbase') {
        await swapBtoC();
      } else if (sendTo === 'Meteor') {
        await swapBtoD();
      }
      setButtonDisable(false);
    }
    setStep('Burn');
    getInfo(token);
  };

  const getButton = () => {
    if (step === 'Approve') {
      return (
        <button className={styles.button} onClick={callApprove} disabled={buttonDisable}>
          Approve
        </button>
      );
    } else if (step === 'Burn') {
      return (
        <div>
          <button
            className={styles.button}
            onClick={() => {
              callBurn('Moonbase');
            }}
            disabled={buttonDisable}
          >
            Burn for Moonbase
          </button>
          <button
            className={styles.button}
            onClick={() => {
              callBurn('Meteor');
            }}
            disabled={buttonDisable}
          >
            Burn for Meteor
          </button>
        </div>
      );
    } else if (step === 'Claim') {
      return (
        <div>
          {showMBClaim && (
            <button
              className={styles.button}
              onClick={() => {
                callSwap('Moonbase');
              }}
              disabled={buttonDisable}
            >
              Claim {showMBClaimAmount} Moonbase
            </button>
          )}
          {showMClaim && (
            <button
              className={styles.button}
              onClick={() => {
                callSwap('Meteor');
              }}
              disabled={buttonDisable}
            >
              Claim {showMClaimAmount} Meteor
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <section className={styles.sectorWrapper} id="burn">
      <WalletConnectionModal open={open} onClose={() => setOpen(false)} />
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.auction}>
            <div className={styles.header}>
              <h2>Burn your WLUNA</h2>
            </div>
            <div className={styles.header}>
              <p>
                <img src="/images/ottoburn.png" width="100%" />
              </p>
            </div>
            {account ? (
              enableSwitch ? (
                <div>
                  <Button secondary customClass={styles.connect} onClick={() => switchNetwork(BSC.chainId)}>
                    Switch Network to BSC
                  </Button>
                </div>
              ) : (
                <div id="burnOperations" style={{ margin: '0 5%' }}>
                  <div className={styles.balance}>
                    <h3>Total LUNA burnt</h3>
                  </div>
                  <div>
                    <div id="odometer" className={'odometer'} style={{ fontSize: '30px', margin: '20px' }}></div>
                  </div>
                  {step === 'Burn' && (
                    <input className={'burn-input'} type={'number'} onChange={handleChange} value={amount} style={{ fontSize: '18px', width: '60%' }} />
                    // <Input id="to" balance={balances} inputValue={toAmount} ticker={toAddress} options={toContracts} onHandleChange={handleChange} />
                  )}
                  <select className={styles.dropdown} name="fromToken" id="fromToken" onChange={handleSelect} value={token} style={{ margin: '0 10px' }}>
                    <option className={styles.drop} value="WLUNC">
                      WLUNC
                    </option>
                    <option value="WLUNA">WLUNA</option>
                  </select>
                  {step === 'Burn' && (
                    <div style={{ fontSize: '14px', margin: '10px 0 20px 0' }}>
                      <button
                        className={styles.button}
                        onClick={() => {
                          if (token === 'WLUNC') {
                            setAmount((tokenABalanceNum * 0.25).toFixed(6));
                          } else if (token === 'WLUNA') {
                            setAmount((tokenBBalanceNum * 0.25).toFixed(6));
                          }
                        }}
                      >
                        25%
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => {
                          if (token === 'WLUNC') {
                            setAmount((tokenABalanceNum * 0.5).toFixed(6));
                          } else if (token === 'WLUNA') {
                            setAmount((tokenBBalanceNum * 0.5).toFixed(6));
                          }
                        }}
                      >
                        50%
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => {
                          if (token === 'WLUNC') {
                            setAmount((tokenABalanceNum * 0.75).toFixed(6));
                          } else if (token === 'WLUNA') {
                            setAmount((tokenBBalanceNum * 0.75).toFixed(6));
                          }
                        }}
                      >
                        75%
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => {
                          if (token === 'WLUNC') {
                            setAmount(tokenABalanceNum.toFixed(6));
                          } else if (token === 'WLUNA') {
                            setAmount(tokenBBalanceNum.toFixed(6));
                          }
                        }}
                      >
                        100%
                      </button>
                    </div>
                  )}
                  <div className={styles.balance}>
                    <h3>Balance: {getAmount()}</h3>
                  </div>
                  {buttonDisable ? <div className={styles.transaction}>Performing blockchain transaction...</div> : <div>{getButton()}</div>}
                </div>
              )
            ) : (
              <Button secondary customClass={styles.connect} onClick={() => setOpen(true)}>
                <AccountBalanceWalletIcon />
                <span className={styles.connectText}>Connect wallet</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { FC } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from 'components/based/Button';
import { shortenAddress, useEtherBalance, useEthers } from '@usedapp/core';
import { injected, walletconnect, CoinbaseWallet } from 'global/connectors';
import clsx from 'clsx';
import { formatAmount } from 'global/utils';

import styles from './index.module.scss';

interface WalletConnectionModalProps {
  open: boolean;
  onClose: () => void;
}

const WalletConnectionModal: FC<WalletConnectionModalProps> = ({ open, onClose }) => {
  const { account, activate, deactivate, connector } = useEthers();
  const avaxBalance = useEtherBalance(account);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={styles.paper}>
          <div className={styles.heading}>{account ? `${shortenAddress(account)} (${formatAmount(avaxBalance)} AVAX)` : 'Connect to your wallet'}</div>
          <div className={styles.content}>
            <Button
              secondary
              customClass={clsx(styles.button, {
                [styles.selected]: account && connector === injected,
              })}
              onClick={() => {
                activate(injected);
                onClose();
              }}
              fullWidth
            >
              <img src="/images/wallet/metamask.svg" />
              <span className={styles.inner}>
                Metamask
                <small>Connect to your MetaMask Wallet</small>
              </span>
            </Button>
            <Button
              secondary
              customClass={clsx(styles.button, {
                [styles.selected]: account && connector === walletconnect,
              })}
              onClick={() => {
                activate(walletconnect);
                onClose();
              }}
              fullWidth
            >
              <img src="images/wallet/walletconnect.svg" />
              <span className={styles.inner}>
                WalletConnect
                <small>Scan with WalletConnect to connect</small>
              </span>
            </Button>
            <Button
              secondary
              customClass={clsx(styles.button, {
                [styles.selected]: account && connector === CoinbaseWallet,
              })}
              onClick={() => {
                activate(CoinbaseWallet);
                onClose();
              }}
              fullWidth
            >
              <img src="images/wallet/coinbase.svg" />
              <span className={styles.inner}>
                Coinbase Wallet
                <small>Connect your Coinbase Wallet</small>
              </span>
            </Button>
            {account && (
              <Button secondary customClass={styles.disconnect} onClick={deactivate}>
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default WalletConnectionModal;

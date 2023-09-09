import { IconButton } from '@material-ui/core';
import Button from 'components/based/Button';
import { usePublicMint, useTotalSupply, useWhitelistMint, useWhitelistMintEnabled } from 'hooks/useNFT';
import React, { useState } from 'react';
import { parseEther } from '@ethersproject/units';
import { useEthers } from '@usedapp/core';
import { MERKLE_TREE_DATA } from 'global/constants';
import { toast } from 'react-hot-toast';

import styles from './index.module.scss';

export default function MintSector() {
  const [mintAmount, setMintAmount] = useState(1);
  const totalSupply = useTotalSupply();
  const whitelistMintEnabled = useWhitelistMintEnabled();
  const { account } = useEthers();
  const { whitelistMint } = useWhitelistMint();
  const { mint } = usePublicMint();

  const onMint = () => {
    const mintPrice = parseEther(`${mintAmount * 0.0777}`);
    mint(mintAmount, { value: mintPrice });
  };

  const onWhitelistMint = () => {
    if (!account) {
      toast.error('Connect to your wallet');
      return;
    }
    if (!MERKLE_TREE_DATA[account]) {
      toast.error('The wallet is not whitelisted');
      return;
    }
    const mintPrice = parseEther(`${mintAmount * 0.0777}`);
    whitelistMint(mintAmount, MERKLE_TREE_DATA[account].proof, {
      value: mintPrice,
    });
  };

  return (
    <div className={styles.sectorWrapper} id="mint">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={styles.heading}>
              {`${totalSupply.toLocaleString()} / ${Number(9999).toLocaleString()}`}
              <br />
              <b>Duo-alities&apos;s</b> Minted
            </div>
            <div className={styles.actions}>
              <div className={styles.number}>
                <IconButton className={styles.numSpin} onClick={() => mintAmount > 1 && setMintAmount(mintAmount - 1)}>
                  -
                </IconButton>
                <span>{mintAmount}</span>
                <IconButton className={styles.numSpin} onClick={() => mintAmount < 20 && setMintAmount(mintAmount + 1)}>
                  +
                </IconButton>
              </div>
              <Button gradient onClick={whitelistMintEnabled ? onWhitelistMint : onMint} fullWidth>
                Mint
              </Button>
            </div>
          </div>
          <div className={styles.pepes}>
            <img src="/images/home/Gif.gif" />
            <div className={styles.price}>
              <b>0.06 Ξ</b> / Duo-ality
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

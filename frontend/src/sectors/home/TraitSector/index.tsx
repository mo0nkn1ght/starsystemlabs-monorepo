import React from 'react';

import styles from './index.module.scss';

export default function TraitSector() {
  return (
    <div className={styles.sectorWrapper} id="trait">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.description}>
            <div className={styles.title}>Trait Rarity</div>
            <p>
              The 9999 Duo-alities will have some of the most complex traits system with a significant number of layers increasing the complexity of the Rarity
              Trait Reward System. This reward system comes in the form of pure liquid asset, Ethereum. The rewards will be based on domain saled from the
              Innova-Host LLC which is focused on providing Domain Services utilizing the Innova Domain System. Each quarter 5% of the net sales will be taken
              and used to purchase ETH, this will be be placed under control of our Smart Contract in charge of Reward Payments and it will attach the relative
              amount of the ETH according to the rarity traits, the more rare the NFT is the more ETH is claimable. The Eth will be claimable on our website,
              once the wallet is attached and verified that the NFT is in your possesion you will be able to claim said ETH into your wallet. Along with ETH
              rewards we also have Innova planned as rewards, as well as adding MORE Ethereum to the quarterly payout in the form of 5% taken out of royalty
              sales. Innova Collateral Nodes will be donated by the Innova-Foundation and the rewards used frm said Collateral Nodes will be locked in the
              Wrapped Innova System. The wINN will then be airdropped into the NFT holders wallets quartlery.
            </p>
          </div>
          <div className={styles.rarity}>
            <span className={styles.common}>
              Common<label>C%</label>
            </span>
            <hr />
            <span className={styles.rare}>
              Rare<label>B%</label>
            </span>
            <hr />
            <span className={styles.mythic}>
              Legendary<label>A%</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

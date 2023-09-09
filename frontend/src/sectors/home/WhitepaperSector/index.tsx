import React from 'react';

import styles from './index.module.scss';

export default function TraitSector() {
  return (
    <div className={styles.sectorWrapper} id="whitepaper">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.description}>
            <div className={styles.header}>
              <h2>Whitepaper</h2>
            </div>
            <p>
              <b>Introduction:</b> Welcome to Star System Labs, we are here to provide an economic service to our Citizen. Right now many users that hold the
              Wrapped Luna Classic tokens [Both Terra Shuttle and Wormhole] are unable to bridge back and forth, this traps a massive amounts of liquidity off
              Terra Classic chain. ALong with the bridge issue, Terra Classic faces the duanting task of re-pegging USTC, which will require the work of many
              minds and supporters as well as a massive amount of liquidity. Star System Labs offers another supporting solution to help bring everything back
              into a functioning state, starting with addressing the Wrapped Luna [Classic] trapped off Terra Classic and moving to a full fledged CosmOS
              Ecosystem approach that will provide another pillar of support for the re-pegging of USTC.
            </p>
            <p>
              <b>EVM Approach:</b> Our first step is to give the holders of the Wrapped Luna [Classic] a solution that can provide not only gains on current
              holdings but future dividends in the form of LUNC while supporting the burn at a more aggressive rate off-chain [30%] and maintaining one hundred
              percent value [After burn]. How can we provide this? First the Citizen must purchase debt in our system using Wrapped Luna [Classic], this secures
              a bonded token, Moonbase [MMBASE] or Meteor [METO]. Holding Moonbase [MNBASE] allows the Citizen to unlock automatically distributed dividend
              payments in the form of $WLUNA Wrapped Luna Classic [Wormhole], holding Meteor [METO] will allow the Citizen to vote on what happens within the
              Star System Labs EVM ecosystem and Multi-Signature Vault. Why would someone want to hold Moonbase and accumulate $WLUNA Wrapped Luna Classic
              [Wormhole]? This is becuase we will offer a bridge solution that will allow Citizens to bridge their Moonbase INTO the CosmOS Ecosystem. This
              bridge will also be setup to accomodate the leftover wrapped tokens, the Citizen will be able to convert the Wrapped Luna [Classic] into debt to
              be bridged over, holding this debt rewards in LUNC once bridged into the CosmOS Ecosystem. There will be no <b className={styles.warning}>ICO</b>{' '}
              for Moonbase [MNBASE] or [METO] on <b>ANY</b> EVM blockchain
            </p>
            ️
            <p>
              <b>- $MNBASE:</b> Bonds will be handed out at a ratio of 1 $MNBASE : 1,000 $WLUNA Wrapped Luna [Classic].
            </p>
            <p>
              <b>- $METO:</b> Governance Bonds will be handed out at a ratio of 1 $METO : 1,000,000 $WLUNA Wrapped Luna [Classic].
            </p>
            ️<p>$MNBASE & $METO will have a 10% buy/sell tax. The 10% tax will be divided up as followed:</p>
            <p>
              <b>- $MNBASE:</b> 2% $WLUNA and $MNBASE burn, 5% Dividends, 1% liquidity injection, 1% Dev, 1% Marketing team.
            </p>
            <p>
              <b>- $METO:</b> 8% LP injection ($MNBASE), 1% Dev, 1% Marketing team.
            </p>
            <p></p>
            <p>
              <b>LP injection</b> is another feature of both Moonbase [MNBASE] and Meteor [METO], Moonbase inject liquidity into its own pair and sends the LP
              tokens into the Multi-Signature Vault to be voted on whether to lock them forever by burning them. Meteor has an LP Injection tool that can be
              directed to other pairs and injects liquidity into them, currently it is pointed at the MNBASE/BNB pair to support the base dividend payout
              system.
            </p>
            <p>
              <b>CosmOS Ecosystem Approach:</b> Star System Labs is focused on bringing a solution that helps all of Terra Classic and its community, this will
              be in the form of the CosmOS approach. Currently our lead dev moonknight is doing research on the best ways to solve these problems but currently
              we will launch a Reserve on the CosmOS Ecosystem that can issue debt and function as a bridge for these debts from the EVM blockchains. This
              Reserve would be under the control of both the community and the validators via voting on chain. Our solution is called Sol. Please check{' '}
              <b>Jupiter UI</b> section for more details on our custom wallet.
            </p>
            <p>
              <img className={styles.img} src="/images/map.png" alt="whitepapermap" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

import styles from './index.module.scss';

export default function AboutSector() {
  return (
    <section className={styles.sectorWrapper} id="about">
      <div className={styles.sector}>
        <div className={styles.inner2}>
          <div className={styles.intro}>
            <div className={styles.header}>
              <h2>About The Project</h2>
            </div>
            <p>
              Star System Labs was created as a response to the Terra Crash to produce a true community focused project that places the people and the support
              of Terra Classic Chain first. The initial issue to deal with in this case would be the exteremely high supply, first step would be phase{' '}
              <b>ONE</b> which is meant to <b className={styles.warning}>BURN</b> Luna Classic, giving the Luna Community a 30% burn option to more aggressively
              reduce the supply of LUNC. Giving holders an option to take part of a 30% LUNC burn while at the same time maintaining 100% value in a bonded
              token. Not only are we providing a service that brings a more substantial burn rate, we also provide Wrapped Luna Classic as rewards in many
              forms. But how can Star System Labs manage this and provide a robust and secure community run project?
            </p>
            <p></p>
            <p>
              Introducing, MOONBASE ($MNBASE) & METEOR ($METO)! The Citizen will bring their $WLUNA (Wrapped Luna Classic - both Wormhole and Terra Shuttle
              variants work at the moment) and deposits into Otto the AutoBot, the Citizen will then receive bonds in the form of $MNBASE or $METO as a receipt
              of their deposit into our economic system. This is <b className={styles.warning}>FULLY</b> automated and the team does not touch any tokens during
              the process. Instead the bot directly sends 30% to the burn address while sending you 100% value of your tokens in $MNBASE or $METO. The remaining
              70% is sent to a vault that will distribute the tokens to an LP reward system. The Citizen can accumulate Wrapped Luna Classic in two forms, with
              a third planned, first is in the form of automatic dividend rewards paid direct to Moonbase holders, second is to LP ( Liquidity Pool ) Token
              holders that stake their LP tokens locking them and the liquidity associated with them. Ensuring that all the Wrapped Luna Classic that goes
              through the system is either burned <b className={styles.warning}>OR</b> redistributed to the community.{' '}
              <b className={styles.warning}>
                The Team Does not get ANY [Wrapped] Luna Classic from this process. 100% of it is community controlled for community rewards! The Multi-Sig
                Vault DOES NOT PAY THE TEAM, IT IS FULLY FOR COMMUNITY. WE WILL START VOTING SOON TO CONTROL FUNDS WITHIN THE VAULT.
              </b>
            </p>
            <p></p>
            <p>
              As we launch on more smart chains, there will be plenty of opportunities that allows the Citizen to customize their earning method & participation
              in our system.
            </p>
          </div>
        </div>
      </div>
      {/* <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p>So why send us your WLUNA?</p>
            <p></p>
            <p>A number of reasons but here are just a few!</p>
            <p>25% WLUNA Burn - an aggressive burn stance</p>
            <p>
              <b>LP injection to WLUNA pairs</b>
            </p>
            <p>
              <b>Gain WLUNA in rewards</b>
            </p>
            <p>
              <b>Gain 2 tokens that hold value</b>
            </p>
            <p>
              <b>Reflections to holders</b>
            </p>
            <p>
              This allows holders to take multiple stances in our system while giving them multiple positions to reposition themselves Without a leverage
              system, all is pure liquid being used, no leveraging!
            </p>
          </div>
          <div className={styles.clip}>
            <img src="images/moonbase.jpg" />
          </div>
        </div>
      </div>
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p>
              <b>LP Staking?</b>
            </p>
            <p>We are planning to have LP staking for Moonbase and Meteor with higher rewards on Meteor LP staking.</p>
            <p>Planned NFT collection to boost your LP staking rewards!</p>
            <p>NFTs will be mintable with either WLUNA or ETH!</p>
          </div>
        </div>
  </div>*/}
    </section>
  );
}

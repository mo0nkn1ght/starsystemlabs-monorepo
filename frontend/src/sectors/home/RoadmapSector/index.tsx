import React from 'react';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';

import styles from './index.module.scss';

export default function RoadmapSector() {
  return (
    <div className={styles.sectorWrapper} id="roadmap">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.title}>
            <h2>Roadmap</h2>
          </div>
          <div className={styles.item}>
            <b>
              EVM Approach - Q3 2022 - <s>Completed</s>
            </b>
            <span>Currently running on BSC, plans for ETH launch TBD.</span>
          </div>
          <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>
              LP Staking - Q3 2022 - <u>WIP</u>
            </b>
            <span>
              Reward options for Citizens that provide LP to the Moonbase [MNBASE] or Meteor [METO] pairs, stake your LP tokens to gain even more Wrapped Luna
              Classic [Wormhole].
            </span>
          </div>
          <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>
              Ethereum Launch - Q4 2022 - <u>WIP</u>
            </b>
            <span>Launch on ETH chain and subsequent ETH Layer 2 chains that require support for the abandoned Wrapped Luna Holders.</span>
          </div>
          <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>Sol Protocol Development - Q1 2023</b>
            <span>
              Our Official CosmOS Approach that will bring the worlds first true blockchain based bonds system to the market. A true support system for the
              Terra Classic blockchain and its community. Currently in Development with planned public testnet.
            </span>
          </div>
          <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>Jupiter UI - Q1 2023</b>
            <span>An all-in-one solution to manage all your assets with the Star System Labs system, from Terra Classic to EVM chains.</span>
          </div>
          <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>Mobile App - Q1 2023</b>
            <span>The mobile implementation of the Jupiter UI. More details TBD on functionality.</span>
          </div>
          <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>Bridge - Q2 2023</b>
            <span>
              Our response to Terra Shuttle shutdown, a community and validator controlled bridge that will allow tranfer between EVM and CosmOS chains.
            </span>
          </div>
          <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>Security Audit - Q2 2023</b>
            <span>Security Audit for the entire Star System Labs System.</span>
          </div>
          {/* <ArrowIcon className={styles.arrow} />
          <div className={styles.item}>
            <b>Sol Launch</b>
            <span>Moonbase Protocol full launch on Terra Classic chain. 8% Burn fee direct on Terra Classic.</span>
          </div>*/}
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <div className={styles.item}>
            <span>
              <b>No exact dates will be provided due to the high volatility and unpredictable nature of the market and current world events.</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

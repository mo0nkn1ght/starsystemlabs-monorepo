import React from 'react';

import styles from './index.module.scss';

export default function TokenomicsSector() {
  return (
    <section className={styles.sectorWrapper} id="tokenomics">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <div className={styles.header}>
              <h2>Moonbase Tokenomics</h2>
            </div>
            <p>
              <b>Total Supply - 691,000,000</b>
            </p>
            <p>
              <b>Wrapped Luna Classic Ratio - 1:1,000</b>
            </p>
            <p>
              <b>Total Trade Fee - 10%</b>
            </p>
            <p>
              <b>Wrapped Luna Classic Dividends - 5%</b>
            </p>
            <p>
              <b>Wrapped Luna Classic Burn - 2%</b>
            </p>
            <p>
              <b>LP Injection - 1%</b>
            </p>
            <p>
              <b>Marketing Fund - 1%</b>
            </p>
            <p>
              <b>Development Fund - 1%</b>
            </p>
            <p>
              <b>Otto the AutoBot - 94.5% of the supply</b>
            </p>
            <p>
              <b>SSL Vault - 5.5% of the supply</b>
            </p>
            <p className={styles.warning}>
              The Star System Labs team does not keep any Moonbase tokens from the supply, the entire supply is for the community spread between the AutoBot and
              the Vault. Vault funds will be voted on, and are under multisignature control.
            </p>
          </div>
        </div>
      </div>
      {/*<div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <div className={styles.header}>
              <p>
                <img src="/images/rocket.jpg" width="100%" />
              </p>
            </div>
          </div>
        </div>
  </div>*/}
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <div className={styles.header}>
              <h2>Meteor Tokenomics</h2>
            </div>
            <p>
              <b>Total Supply - 691,000</b>
            </p>
            <p>
              <b>Wrapped Luna Classic Ratio - 1:1,000,000</b>
            </p>
            <p>
              <b>Total Trade Fee - 10%</b>
            </p>
            <p>
              <b>LP Injection - 8%</b>
            </p>
            <p>
              <b>Marketing Fund - 1%</b>
            </p>
            <p>
              <b>Development Fund - 1%</b>
            </p>
            <p>
              <b>Otto the AutoBot - 94.5% of the supply</b>
            </p>
            <p>
              <b>SSL Vault - 5.5% of the supply</b>
            </p>
            <p className={styles.warning}>
              The Star System Labs team does not keep any Meteor tokens from the supply, the entire supply is for the community spread between the AutoBot and
              the Vault. Vault funds will be voted on, and are under multisignature control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

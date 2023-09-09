import React, { useEffect } from 'react';

import styles from './index.module.scss';

export default function BuySector() {
  return (
    <section className={styles.sectorWrapper} id="buy">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.auction}>
            <div className={styles.header}>
              <h2>Become a Citizen</h2>
            </div>
            <div></div>
            <div className={styles.links}>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                BNB
              </a>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                ETH
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

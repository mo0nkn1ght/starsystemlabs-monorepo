import { DISCORD_LINK, TELEGRAM_LINK, TWITTER_LINK } from 'global/constants';
import React from 'react';

import styles from './index.module.scss';

export default function AppFooter() {
  return (
    <div className={styles.sectorWrapper}>
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.socials}>
            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
              <img src="/images/socials/telegram.png" />
            </a>
            <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
              <img src="/images/socials/twitter.png" />
            </a>
            <a href={DISCORD_LINK} target="_blank" rel="noreferrer">
              <img src="/images/socials/discord.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

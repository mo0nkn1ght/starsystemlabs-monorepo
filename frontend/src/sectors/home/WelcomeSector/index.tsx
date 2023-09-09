import { DISCORD_LINK, TELEGRAM_LINK, TWITTER_LINK } from 'global/constants';
import { convertToDuration } from 'global/utils';
import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

export default function WelcomeSector() {
  const startTime = 1659878740;
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<number>();
  const timerShowed = startTime > 0 && currentTime > 0 && currentTime <= startTime;
  const duration = convertToDuration(currentTime, startTime);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => setCurrentTime(Math.floor(new Date().getTime() / 1000)), 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (startTime > 0 && currentTime > 0 && currentTime > startTime) {
      clearInterval(intervalRef.current);
    }
  }, [startTime, currentTime]);

  return (
    <div className={styles.sectorWrapper} id="home">
      <div className={styles.sector} style={{ backgroundImage: 'url(/images/home/bg.png)' }}>
        <div className={styles.inner}>
          <div className={styles.timer}>
            <img src="/images/home/bg.png" alt="starsystemlabs" />
            {timerShowed && <b>{duration}</b>}
            <small className={styles.text}>Terra Luna First</small>
            {/*<small className={styles.text}>Lunc over Luna</small>*/}
          </div>
          <div className={styles.socials}>
            <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
              <img src="/images/socials/telegram.png" width="40" height="40" />
            </a>
            <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
              <img src="/images/socials/twitter.png" width="40" height="40" />
            </a>
            <a href={DISCORD_LINK} target="_blank" rel="noreferrer">
              <img src="/images/socials/discord.png" width="40" height="40" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import WelcomeSector from 'sectors/home/WelcomeSector';
import BurnBotSector from 'sectors/home/BurnBotSector';
import BuySector from 'sectors/home/BuySector';
import { useLocation } from 'react-router-dom';

import styles from './index.module.scss';

const HomePage = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  return (
    <div className={styles.home}>
      <div className={styles.inner}>
        {/* <WelcomeSector /> */}
       {/* <BurnBotSector />*/}
        {/*<BuySector />*/}
      </div>
    </div>
  );
};

export default HomePage;

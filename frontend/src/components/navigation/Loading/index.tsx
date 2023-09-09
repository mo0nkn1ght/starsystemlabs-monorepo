import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

import styles from './index.module.scss';

export default function AppLoading() {
  return (
    <div className={styles.wrapper}>
      <PuffLoader color="#fff" loading={true} />
    </div>
  );
}

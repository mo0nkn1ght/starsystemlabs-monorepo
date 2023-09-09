import React from 'react';

import styles from './index.module.scss';

export default function TeamSector() {
  const TEAM_DATA = [
    {
      avatar: '/images/Moonknight-modified.png',
      name: 'Moonknight',
      role: 'Founder/Developer',
    },
    {
      avatar: '/images/Interstellar.png',
      name: 'Cosmic Stoic',
      role: 'Management/Marketing',
    },
    {
      avatar: '/images/Gongoda.png',
      name: 'Adrian',
      role: 'Artist/Graphics Design',
    },
    {
      avatar: '/images/martian.png',
      name: 'Terra Martian',
      role: 'Community Moderator',
    },
    {
      avatar: '/images/bot.png',
      name: 'Otto the AutoBot',
      role: 'The SSL Burn Bot',
    },
  ];

  return (
    <div className={styles.sectorWrapper} id="team">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.title}>Team</div>
          <div className={styles.items}>
            {TEAM_DATA.map((member) => (
              <div className={styles.widget} key={member.name}>
                <img src={member.avatar} />
                <b>{member.name}</b>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { lazy } from 'react';
import BuySector from 'sectors/home/BuySector';
import { Link } from 'react-router-dom';

import { RouteType } from './types';

const APP_ROUTES: RouteType[] = [
  {
    path: '/',
    component: lazy(() => import('pages/Home')),
    title: '',
    isNavLinked: false,
    subMenu: [],
  },
  {
    path: 'https://starsystemlabs.com',
    title: 'Home',
    isNavLinked: true,
    subMenu: [],
    externalLink: 'https://starsystemlabs.com',
  },
  // {
  //   path: '#',
  //   component: AboutSector,
  //   title: 'About',
  //   isNavLinked: true,
  //   subMenu: [
  //     {
  //       path: '/#about',
  //       component: AboutSector,
  //       title: 'About',
  //       isNavLinked: true,
  //     },
  //     {
  //       path: '/#tokenomics',
  //       component: TokenomicsSector,
  //       title: 'Tokenomics',
  //       isNavLinked: true,
  //     },
  //     {
  //       path: '/#whitepaper',
  //       component: WhitepaperSector,
  //       title: 'Whitepaper',
  //       isNavLinked: true,
  //     },
  //     {
  //       path: '/#jupiter',
  //       component: JupiterSector,
  //       title: 'Jupiter UI',
  //       isNavLinked: true,
  //     },
  //     {
  //       path: '/#roadmap',
  //       component: RoadmapSector,
  //       title: 'Roadmap',
  //       isNavLinked: true,
  //     },
  //     {
  //       path: '/#faq',
  //       component: FaqSector,
  //       title: 'FAQ',
  //       isNavLinked: true,
  //     },
  //     {
  //       path: '/#team',
  //       component: TeamSector,
  //       title: 'Team',
  //       isNavLinked: true,
  //     },
  //   ],
  // },
  // {
  //   path: '/burn',
  //   component: BurnBotSector,
  //   title: 'Burn',
  //   isNavLinked: true,
  //   subMenu: [],
  // },
  // {
  //   path: '/buy',
  //   component: BuySector,
  //   title: 'Buy',
  //   isNavLinked: true,
  //   subMenu: [],
  // },
];

export default APP_ROUTES;

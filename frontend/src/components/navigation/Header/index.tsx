import React, { useCallback, useEffect, useState } from 'react';
import APP_ROUTES from 'global/routes';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
//import { HashLink } from 'react-router-hash-link';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Button from 'components/based/Button';
import { shortenAddress, useEthers } from '@usedapp/core';
import clsx from 'clsx';
import { Menu, MenuItem, MenuProps } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import WalletConnectionModal from 'components/composed/WalletConnectionModal';
import { RouteType } from 'global/types';

import styles from './index.module.scss';

let APP_ROUTES_SMALL: RouteType[] = [];

APP_ROUTES.map((ar) => {
  if (ar.subMenu?.length) {
    APP_ROUTES_SMALL = APP_ROUTES_SMALL.concat(ar.subMenu);
  } else {
    APP_ROUTES_SMALL.push(ar);
  }
});

// APP_ROUTES.map((ar) => {
//   if (ar.subMenu.length) {
//     APP_ROUTES_SMALL = APP_ROUTES_SMALL.concat(ar.subMenu);
//   } else {
//     APP_ROUTES_SMALL.push(ar);
//   }
// });

console.log(APP_ROUTES_SMALL);

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: '30px',
    minWidth: 180,
    background: 'black',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: '1.5px',
      },
      '& a': {
        textDecoration: 'none',
        color: 'white',
      },
    },
  },
}));

export default function AppHeader() {
  const location = useLocation();
  const { account } = useEthers();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleScroll = useCallback(() => {
    setScroll(window.pageYOffset > (location.pathname.startsWith('/home') ? 200 : 0));
  }, [location.pathname]);

  const handleResize = () => {
    setMenuOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open_mui = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, location.pathname]);

  return (
    <header className={scroll ? styles.scrolled : ''}>
      <WalletConnectionModal open={open} onClose={() => setOpen(false)} />
      <div className={styles.inner}>
        <div className={styles.title}>
          <Button customClass={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} secondary>
            {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </Button>
          <a href="/" className={styles.name}>
            <img src="/images/logo.png" className={styles.favicon} />
            <img src="/images/logo.png" className={styles.logo} />
          </a>
        </div>
        <div className={styles.nav}>
          {/* Larger screens */}
          {APP_ROUTES.map((route) =>
            (route.subMenu ? route.subMenu.length : 0) === 0 ? (
              route.externalLink ? (
                <a
                  href={route.externalLink}
                  key={route.path}
                  className={clsx(styles.menu, {
                    [styles.selected]: route.title === 'Home',
                  })}
                >
                  {route.title}
                </a>
              ) : (
                <Link
                  to={route.path}
                  key={route.path}
                  className={clsx(styles.menu, {
                    [styles.selected]: !location.hash && location.pathname === route.path,
                  })}
                >
                  {route.title}
                </Link>
              )
            ) : (
              <div>
                <div
                  className={clsx(styles.menu, {
                    [styles.selected]: (!location.hash && location.pathname === route.path) || location.hash.startsWith(route.path),
                  })}
                  id="demo-customized-button"
                  aria-controls={open_mui ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open_mui ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {route.title}
                </div>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open_mui}
                  onClose={handleClose}
                >
                  {route.subMenu?.map((sm: any) => (
                    <MenuItem key={sm.path} onClick={handleClose} disableRipple>
                      <Link
                        to={sm.path}
                        key={sm.path}
                        className={clsx(styles.menuDropdown, {
                          [styles.selected]: !location.hash && location.pathname === route.path,
                        })}
                      >
                        {sm.title}
                      </Link>
                    </MenuItem>
                  ))}
                </StyledMenu>
              </div>
            )
          )}
          {account ? (
            <div className={styles.reflect}>{shortenAddress(account)}</div>
          ) : (
            <Button secondary customClass={styles.connect} onClick={() => setOpen(true)}>
              <AccountBalanceWalletIcon />
              <span className={styles.connectText}>Connect wallet</span>
            </Button>
          )}
        </div>
      </div>
      <Collapse in={menuOpen} timeout="auto" unmountOnExit>
        <div className={styles.dropdown}>
          {APP_ROUTES_SMALL.map((route) => (
            <Link
              to={route.path}
              key={route.path}
              className={clsx(styles.menuDropdown, {
                [styles.selected]: !location.hash && location.pathname.startsWith(route.path),
              })}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </Collapse>
    </header>
  );
}

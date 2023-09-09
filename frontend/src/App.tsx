import React, { Suspense } from 'react';
import AppLoading from 'components/navigation/Loading';
import { Route, Routes, useLocation } from 'react-router';
import APP_ROUTES from 'global/routes';
import { useTransition, animated } from 'react-spring';
import AppHeader from 'components/navigation/Header';
import AppFooter from 'components/navigation/Footer';

import styles from './App.module.scss';

export default function App() {
  const location = useLocation();
  const transitions = useTransition(location, {
    keys: (locat) => locat.pathname,
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
  });  

  console.log(Object.keys(transitions));


  return (
    <div className={styles.app}>
      <Suspense fallback={<AppLoading />}>
      {transitions.length > 0 && transitions.map(({ item, props, key }) => (
          <animated.div
            style={{
              ...props,
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
            key={key}
          >
            <AppHeader />
            <Routes location={item}>
              {APP_ROUTES.map((route) => (
                <Route key={route.path} path={route.path} component={route.component} exact />
              ))}
            </Routes>
            <AppFooter />
          </animated.div>
        ))}
      </Suspense>
    </div>
  );
}

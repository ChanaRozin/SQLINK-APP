import React from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Router, Switch } from 'react-router-dom';
import { Information } from './pages/information/information';
import { Login } from './pages/login/login';
import { useRootStore } from './stores/root-store/use-root-store';

export const App = observer(() => {
  const { routerStore } = useRootStore();

  return (
    <Router history={routerStore.history}  >
      <Switch>
        <Route
          path={'/login'}
          component={() => (<Login />)}
        />
        <Route
          path={'/info'}
          component={() => (<Information />)}
        />
        <Route
          path={'/'}
          component={() => (<Login />)}
        />
      </Switch>
    </Router >
  );
})



import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Router, Switch,RouteProps } from 'react-router-dom';
import { BasicCard } from './pages/card/card';
import { Information } from './pages/information';
import { Login } from './pages/login';
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





// <Router>
// <Routes>
//   <Route
//     path={'/icon-start/:businessId/:url'}
//     element={<IconStart />} />
// </Routes>
// <Routes>
//   <Route
//     path={'/icon-start/callHotline/:hotlineId/:url/:language'}
//     element={<WidgetHotlineStart />} />
// </Routes>
// <Routes>
//   <Route
//     path={'/wix-error'}
//     element={<WixError />} />
// </Routes>
// </Router>
  );
})



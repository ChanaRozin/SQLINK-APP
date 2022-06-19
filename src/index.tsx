import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { RootStore } from './stores/root-store/root-store';
import { StoreContext } from './stores/root-store/use-root-store';

export const render = () => (
  <StoreContext.Provider value={new RootStore()}>
    <App />
  </StoreContext.Provider>
);

ReactDOM.render(render(), document.getElementById('root'));

reportWebVitals();



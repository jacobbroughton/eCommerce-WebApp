import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "./contexts/auth0-context";
import { StatusUrlProvider } from "./contexts/statusUrl-context";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <StatusUrlProvider>
      <Auth0Provider>
        <App />
    </Auth0Provider>
    </StatusUrlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

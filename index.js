import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {store} from './redux/store';
import {Provider} from 'react-redux';

//mostly code I dont know the reason for writing.
//One thing should be made sure of is keeping App between provider.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>  
  </React.StrictMode>
);



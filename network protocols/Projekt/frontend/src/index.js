import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import logger from './logger'
import thunk from 'redux-thunk';
import { MainReducer } from './reducers/MainReducer'

const store = createStore(
  combineReducers({
    roomnames: MainReducer,
  }), 
  compose(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

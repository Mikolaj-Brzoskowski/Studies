import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { MoviesReducer } from './reducers/MoviesReducer';
import { DirectorsReducer } from './reducers/DirectorsReducer';
import { Provider } from 'react-redux';
import { ActorsReducer } from './reducers/ActorsReducer';
import logger from './middlewares/logger'
import { ButtonReducer } from './reducers/ButtonReducer';
import incrementer from './middlewares/incrementer'


let store = createStore(
  combineReducers(
    {
      movies: MoviesReducer,
      directors: DirectorsReducer,
      actors: ActorsReducer,
      button: ButtonReducer
    }
  ), applyMiddleware(logger, incrementer))

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

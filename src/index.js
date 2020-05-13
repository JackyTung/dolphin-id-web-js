import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

import React from 'react' 
import { Provider } from 'react-redux'
import rootReducer from '../reducers'
import App from '../components/App'
import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(promise)
// ));

const store = createStore(
    rootReducer, /* preloadedState, */
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
    ),
)

sagaMiddleware.run(rootSaga)

const AppV1 = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default AppV1

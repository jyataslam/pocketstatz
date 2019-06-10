import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/index";
import { checkAuth } from './actions';
import types from './actions/types';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

if(localStorage.getItem('auth') === 'true'){
    store.dispatch({
        type: types.SIGN_IN_USER,
        response: {
            auth: true
        }
    });

    checkAuth()(store.dispatch);
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

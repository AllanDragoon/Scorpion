import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './components/app';

import './style/common.scss';
import './style/head.scss';
import './style/index.scss';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
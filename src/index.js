import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { PageHome } from '../src/components/page-home';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <PageHome />
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

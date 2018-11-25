import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pageHome from '../components/page-home/reducer';


const reducer = combineReducers({
  pageHome,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //eslint-disable-line
  applyMiddleware(thunk),
);

export default store;

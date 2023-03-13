import { legacy_createStore as createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const composeEnhancers = composeWithDevTools();

const store = createStore(reducers, composeEnhancers);

export default store;

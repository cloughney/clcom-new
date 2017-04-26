import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';

import Console from './console';
//import { reducer } from './common/reducers';

//const stateStore = createStore<{AppState}>(reducer);

//<Provider store={stateStore}>
//</Provider>,
 ReactDOM.render(
	<Console />,
	document.getElementById('app'));

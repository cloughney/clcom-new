import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';

import Console from './console/index';
//import { reducer } from './common/reducers';

//const stateStore = createStore<{AppState}>(reducer);

//<Provider store={stateStore}>
//</Provider>,
 ReactDOM.render(
	<Console onCommandReceived={
		(command) => {
			console.dir(command);
			return new Promise<number>(resolve => {
				let count = 3;
				const timer = setInterval(() => {
					if (count > 1) {
						command.stdout.write('working...');
					} else if (count > 0) {
						command.stdout.write('done');
					} else {
						clearInterval(timer);
						resolve(0);
					}

					count--;
				}, 1000);
			});
		}
	} />,
	document.getElementById('app'));

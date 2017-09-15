import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import WindowManager, { AppState, reducer } from '../window-manager';

const store = createStore(reducer);

render(
	<Provider store={ store }>
		<WindowManager />
	</Provider>,
	document.querySelector('body .content .showcase'));

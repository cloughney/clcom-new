import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Showcase, { AppState as ShowcaseAppState } from '../showcase/containers/showcase';

import Console from '../console/components/console';
import onCommandReceived, { welcomeMessage } from '../console/handlers/default';

const initialState: ShowcaseAppState = {
	showcaseComponents: [
		<div className="console">
			<Console outputLines={welcomeMessage} onCommandReceived={onCommandReceived} />
		</div>
	]
};

const store = createStore((state: ShowcaseAppState, action) => {
	return initialState;
});

render(
	<Provider store={ store }>
		<Showcase />
	</Provider>,
	document.querySelector('body .content .showcase'));

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Showcase, { AppState as ShowcaseAppState } from '../showcase/containers/showcase';
import ConsoleActivity from '../showcase/components/console';
import ExplorerActivity from '../showcase/components/explorer';

const initialState: ShowcaseAppState = {
	availableActivities: {
		'console': ConsoleActivity,
		'explorer': ExplorerActivity
	},
	openActivities: [{
		activity: ConsoleActivity,
		position: {
			x: 0,
			y: 0,
			width: 300,
			height: 300
		}
	}]
};

const store = createStore((state: ShowcaseAppState, action) => {
	if (!state) {
		state = initialState;
	}

	switch (action.type) {
		case 'OPEN_ACTIVITY':

			break;
		case 'CLOSE_ACTIVITY':

			break;
		case 'CHANGE_ACTIVITY':
			const newActivity = state.availableActivities[action.id];
			if (newActivity) {
				return { ...state, currentActivity: newActivity };
			}
			break;
	}

	return state;
});

render(
	<Provider store={ store }>
		<Showcase />
	</Provider>,
	document.querySelector('body .content .showcase'));

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Showcase, { AppState } from '../showcase/containers/showcase';
import { OpenWindow, OpenWindowPosition, ActivityClass, ActivityProps } from '../showcase/components/showcase-activity';
import ConsoleActivity from '../showcase/components/console';
import ExplorerActivity from '../showcase/components/explorer';

const openWindow = (state: AppState, activity: ActivityClass<ActivityProps>): AppState => {
	return {
		...state,
		openWindows: [
			{
				activity,
				position: {
					x: 0,
					y: 0,
					width: 500,
					height: 300,
					isMaximized: true
				}
			},
			...state.openWindows
		]
	};
}

const closeWindow = (state: AppState, activity: ActivityClass<ActivityProps>): AppState => {
	return {
		...state,
		openWindows: state.openWindows.filter(x => x.activity !== activity)
	};
}

const setWindowPosition = (state: AppState, windowHandle: OpenWindow, propName: keyof OpenWindowPosition, value: any): AppState => {
	return {
		...state,
		openWindows: [
			{
				...windowHandle,
				position: { ...windowHandle.position, [propName]: value }
			},
			...state.openWindows.filter(x => x !== windowHandle)
		]
	};
}

const initialState: AppState = openWindow({
	availableActivities: [
		ConsoleActivity,
		ExplorerActivity
	],
	openWindows: []
}, ConsoleActivity);

const store = createStore((state: AppState, action) => {
	state = state || initialState;
	action.options = action.options || {};

	let windowIndex: number;
	switch (action.type) {
		case 'OPEN_WINDOW':
			return openWindow(state, action.options.activity);
		case 'CLOSE_WINDOW':
			return closeWindow(state, action.options.activity || action.window.activity);
		case 'FOCUS_WINDOW':
			break;
		case 'MAXIMIZE_WINDOW':
			return setWindowPosition(state, action.window, 'isMaximized', true);
		case 'RESTORE_WINDOW':
			return setWindowPosition(state, action.window, 'isMaximized', false);
	}

	return state;
});

render(
	<Provider store={ store }>
		<Showcase />
	</Provider>,
	document.querySelector('body .content .showcase'));

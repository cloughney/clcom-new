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

const closeWindow = (state: AppState, windowHandle: OpenWindow): AppState => {
	return {
		...state,
		openWindows: state.openWindows.filter(x => x !== windowHandle)
	};
}

const focusWindow = (state: AppState, windowHandle: OpenWindow): AppState => {
	return {
		...state,
		openWindows: [
			windowHandle,
			...state.openWindows.filter(x => x !== windowHandle)
		]
	}
}

const setWindowPosition = (state: AppState, windowHandle: OpenWindow, updates: Partial<OpenWindowPosition>): AppState => {
	return {
		...state,
		openWindows: [
			{
				...windowHandle,
				position: { ...windowHandle.position, ...updates }
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

	console.log(action);

	let windowIndex: number;
	switch (action.type) {
		case 'OPEN_WINDOW':
			return openWindow(state, action.options.activity);
		case 'CLOSE_WINDOW':
			return closeWindow(state, action.options.window || action.window);
		case 'FOCUS_WINDOW':
			return focusWindow(state, action.options.window || action.window)
		case 'MAXIMIZE_WINDOW':
			return setWindowPosition(state, action.options.window || action.window, { isMaximized: true });
		case 'RESTORE_WINDOW':
			return setWindowPosition(state, action.options.window || action.window, { isMaximized: false });
		case 'MOVE_WINDOW':
			return setWindowPosition(state, action.options.window || action.window, { x: action.options.x, y: action.options.y });
	}

	return state;
});

render(
	<Provider store={ store }>
		<Showcase />
	</Provider>,
	document.querySelector('body .content .showcase'));

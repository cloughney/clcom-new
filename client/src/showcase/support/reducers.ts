// import { combineReducers, Reducer, AnyAction } from 'redux';
// import { Activity, ActivityProps, OpenWindow, WindowPosition } from 'react-window-manager';

// import * as Actions from './actions';
// import ConsoleActivity from '../components/activities/console';
// import ExplorerActivity from '../components/activities/item-explorer';

// const defaultPosition: WindowPosition = {
// 	x: 0,
// 	y: 0,
// 	width: 500,
// 	height: 300,
// 	isMaximized: true,
// 	isMinimized: false
// };

// const defaultActivity: Activity = {
// 	locator: 'explorer',
// 	title: 'Item Explorer',
// 	icon: 'folder-o',
// 	component: ExplorerActivity
// };

// const availableActivities: ActivityProps['availableActivities'] = [
// 	defaultActivity,
// 	{
// 		locator: 'console',
// 		title: 'Console',
// 		icon: 'microchip',
// 		component: ConsoleActivity,
// 	}
// ];

// const initialState: AppState = openWindow({
// 	availableActivities,
// 	openWindows: []
// }, defaultActivity);

// export type AppState = {
// 	readonly availableActivities: ActivityProps['availableActivities'];
// 	readonly openWindows: OpenWindow[];
// }

// export const reducer: Reducer<AppState> = (state: AppState, action: AnyAction) => {
// 	state = state || initialState;
// 	action.options = action.options || {};

// 	console.log(action);

// 	let windowIndex: number;
// 	switch (action.type) {
// 		case Actions.OPEN_WINDOW:
// 			return openWindow(state, action.options.activity);
// 		case Actions.CLOSE_WINDOW:
// 			return closeWindow(state, action.options.window);
// 		case Actions.FOCUS_WINDOW:
// 			return focusWindow(state, action.options.window);
// 		case Actions.MINIMIZE_WINDOW:
// 			return setWindowPosition(state, action.options.window, { isMinimized: true, isMaximized: false });
// 		case Actions.MAXIMIZE_WINDOW:
// 			return setWindowPosition(state, action.options.window, { isMinimized: false, isMaximized: true });
// 		case Actions.RESTORE_WINDOW:
// 			return setWindowPosition(state, action.options.window, { isMinimized: false, isMaximized: false });
// 		case Actions.MOVE_WINDOW:
// 			return setWindowPosition(state, action.options.window, { x: action.options.location.x, y: action.options.location.y });
// 	}

// 	return state;
// }

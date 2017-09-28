import * as React from 'react';
import WindowManager, { Activity, ActivityProps } from 'react-window-manager';
import ConsoleActivity from './components/activities/console';
import ExplorerActivity from './components/activities/item-explorer';
// import { AppState, actionFactory } from './support';

// function mapStateToProps(state: AppState): Partial<Props> {
// 	return {
// 		availableActivities: state.availableActivities,
// 		openWindows: state.openWindows
// 	};
// }

// function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<Props> {
// 	return {
// 		onWindowAction: (action, window, options = {}) => {
// 			switch (action) {
// 				case WindowAction.Open:
// 					dispatch(actionFactory.openWindow(options.activity));
// 					break;
// 				case WindowAction.Close:
// 					dispatch(actionFactory.closeWindow(options.window || window));
// 					break;
// 				case WindowAction.Focus:
// 					dispatch(actionFactory.focusWindow(options.window || window));
// 					break;
// 				case WindowAction.Move:
// 					dispatch(actionFactory.moveWindow(options.window || window, { x: options.x, y: options.y }));
// 					break;
// 				case WindowAction.Resize:
// 					dispatch(actionFactory.resizeWindow(options.window || window));
// 					break;
// 				case WindowAction.Maximize:
// 					dispatch(actionFactory.maximizeWindow(options.window || window));
// 					break;
// 				case WindowAction.Minimize:
// 					dispatch(actionFactory.minimizeWindow(options.window || window));
// 					break;
// 				case WindowAction.Restore:
// 					dispatch(actionFactory.restoreWindow(options.window || window));
// 					break;
// 				default:
// 					throw new Error('Invalid action type performed on window.');
// 			}
// 		}
// 	};
// }

const defaultActivity: Activity = {
	locator: 'explorer',
	title: 'Item Explorer',
	icon: 'folder-o',
	component: ExplorerActivity
};

const availableActivities: ActivityProps['availableActivities'] = [
	defaultActivity,
	{
		locator: 'console',
		title: 'Console',
		icon: 'microchip',
		component: ConsoleActivity
	},
	{
		locator: 'view-source',
		title: 'View Source',
		icon: 'code',
		component: ConsoleActivity
	}
];

const Showcase: React.SFC = () => (
	<WindowManager
		availableActivities={ availableActivities }
		openWindows={ [{
			activity: defaultActivity,
			position: {
				x: 0,
				y: 0,
				width: 400,
				height: 300,
				state: 'MAXIMIZED'
			}
		}] }/>
)

export default Showcase;
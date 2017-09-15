import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, actionFactory } from './support';

function mapStateToProps(state: AppState): Partial<Props> {
	return {
		availableActivities: state.availableActivities,
		openWindows: state.openWindows
	};
}

function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<Props> {
	return {
		onWindowAction: (action, window, options = {}) => {
			switch (action) {
				case WindowAction.Open:
					dispatch(actionFactory.openWindow(options.activity));
					break;
				case WindowAction.Close:
					dispatch(actionFactory.closeWindow(options.window || window));
					break;
				case WindowAction.Focus:
					dispatch(actionFactory.focusWindow(options.window || window));
					break;
				case WindowAction.Move:
					dispatch(actionFactory.moveWindow(options.window || window, { x: options.x, y: options.y }));
					break;
				case WindowAction.Resize:
					dispatch(actionFactory.resizeWindow(options.window || window));
					break;
				case WindowAction.Maximize:
					dispatch(actionFactory.maximizeWindow(options.window || window));
					break;
				case WindowAction.Minimize:
					dispatch(actionFactory.minimizeWindow(options.window || window));
					break;
				case WindowAction.Restore:
					dispatch(actionFactory.restoreWindow(options.window || window));
					break;
				default:
					throw new Error('Invalid action type performed on window.');
			}
		}
	};
}
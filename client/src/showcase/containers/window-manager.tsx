import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState, actionFactory } from '../support';
import ActivityWindow, { Activity, ActivityProps, OpenWindow, WindowAction } from '../components/activity-window';

type Props = {
	availableActivities: AppState['availableActivities'];
	openWindows: AppState['openWindows'];
	onWindowAction: (action: WindowAction, window: OpenWindow, options?: any) => void; //TODO types for options
}

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

const WindowManager: React.SFC<Props> = (props: Props): JSX.Element => {
	const openWindows = props.openWindows
		.filter(x => !x.position.isMinimized)
		.map((openWindow, i) => (
			<ActivityWindow
				key={ i } depth={ i } window={ openWindow }
				availableActivities={ props.availableActivities }
				onWindowAction={ (action, options) => { props.onWindowAction(action, openWindow, options) } } />
			));

	const dockedWindows = props.openWindows
		.filter(x => x.position.isMinimized)
		.map((openWindow, i) => (
			<li onClick={ () => { props.onWindowAction(WindowAction.Restore, openWindow) } } key={ i }>
				{ openWindow.activity.icon ? <i className={ `fa fa-${openWindow.activity.icon}` } /> : undefined }
				{ openWindow.activity.title }
			</li>
		));

	return (
		<div>
			{ openWindows }
			<ul className="dock">
				{ dockedWindows }
			</ul>
		</div>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WindowManager);

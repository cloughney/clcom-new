import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActivityComponent, OpenWindow, WindowAction } from '../components/activity-window';

type Props = {
	availableActivities: ActivityComponent[];
	openWindows: OpenWindow[];
	onWindowAction: (action: WindowAction, window: OpenWindow, options?: object) => void;
}

const actionToTypeMap = new Map<WindowAction, string>();
actionToTypeMap.set(WindowAction.Open, 'OPEN_WINDOW');
actionToTypeMap.set(WindowAction.Close, 'CLOSE_WINDOW');
actionToTypeMap.set(WindowAction.Focus, 'FOCUS_WINDOW');
actionToTypeMap.set(WindowAction.Maximize, 'MAXIMIZE_WINDOW');
actionToTypeMap.set(WindowAction.Minimize, 'MINIMIZE_WINDOW');
actionToTypeMap.set(WindowAction.Restore, 'RESTORE_WINDOW');
actionToTypeMap.set(WindowAction.Resize, 'RESIZE_WINDOW');
actionToTypeMap.set(WindowAction.Move, 'MOVE_WINDOW');

function mapStateToProps(state: AppState): Partial<Props> {
	return {
		availableActivities: state.availableActivities,
		openWindows: state.openWindows
	};
}

function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<Props> {
	return {
		onWindowAction: (action, window, options) => {
			const type = actionToTypeMap.get(action);
			if (!type) { new Error('Invalid action type performed on window.'); }
			dispatch({ type, window, options });
		}
	};
}

const Showcase: React.SFC<Props> = (props: Props): JSX.Element => {
	const activities = props.openWindows
		.map((openWindow, i) => (
			<openWindow.activity
				key={ i } depth={ i } window={ openWindow }
				availableActivities={ props.availableActivities }
				onWindowAction={ (action, options) => { props.onWindowAction(action, openWindow, options) } } />
			));

	return (<div>{ activities }</div>);
}

export type AppState = {
	availableActivities: ActivityComponent[];
	openWindows: OpenWindow[];
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Showcase);

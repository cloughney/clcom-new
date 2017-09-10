import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ActivityAdapter, { ActivityProps, ActivityClass, OpenWindow, OpenWindowPosition, WindowAction } from '../components/showcase-activity';
import ActivityWindow from '../components/activity-window';

interface ShowcaseProps {
	availableActivities: ActivityClass<ActivityProps>[];
	openWindows: OpenWindow[];
	onWindowAction: (action: WindowAction, window: OpenWindow, options?: object) => void;
}

interface ShowcaseState {}

const actionToTypeMap = new Map<WindowAction, string>();
actionToTypeMap.set(WindowAction.Open, 'OPEN_WINDOW');
actionToTypeMap.set(WindowAction.Close, 'CLOSE_WINDOW');
actionToTypeMap.set(WindowAction.Focus, 'FOCUS_WINDOW');
actionToTypeMap.set(WindowAction.Maximize, 'MAXIMIZE_WINDOW');
actionToTypeMap.set(WindowAction.Minimize, 'MINIMIZE_WINDOW');
actionToTypeMap.set(WindowAction.Restore, 'RESTORE_WINDOW');
actionToTypeMap.set(WindowAction.Resize, 'RESIZE_WINDOW');

function mapStateToProps(state: AppState): Partial<ShowcaseProps> {
	return {
		availableActivities: state.availableActivities,
		openWindows: state.openWindows
	};
}

function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<ShowcaseProps> {
	return {
		onWindowAction: (action, window, options) => {
			const type = actionToTypeMap.get(action);
			if (!type) { new Error('Invalid action type performed on window.'); }
			dispatch({ type, window, options });
		}
	};
}

class Showcase extends React.Component<ShowcaseProps, ShowcaseState> {
	private activityMap: Map<OpenWindow, HTMLDivElement>;

	public constructor(props: ShowcaseProps) {
		super(props);
		this.state = {};
		this.activityMap = new Map<OpenWindow, HTMLDivElement>();
	}

	public render(): JSX.Element {
		const activities = this.props.openWindows
			.map((x, i) => (
				<ActivityWindow key={ i } window={ x } depth={ i }
					availableActivities={ this.props.availableActivities }
					onWindowAction={ this.props.onWindowAction } />
				));

		return (<div>{ activities }</div>);
	}
}

export interface AppState {
	availableActivities: ActivityClass<ActivityProps>[];
	openWindows: OpenWindow[];
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Showcase);

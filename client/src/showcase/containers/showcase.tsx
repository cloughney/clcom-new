import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ShowcaseActivity, { ShowcaseActivityProps, ShowcaseActivityAction, ShowcaseActivityClass, OpenActivity, OpenActivityPosition } from '../components/showcase-activity';

interface ShowcaseProps {
	availableActivities: { [id: string]: ShowcaseActivityClass<ShowcaseActivityProps> };
	openActivities: OpenActivity[];
	onActivityAction: (action: ShowcaseActivityAction, activityId: string, options?: object) => void;
}

interface ShowcaseState {}

function mapStateToProps(state: AppState): Partial<ShowcaseProps> {
	return {
		availableActivities: state.availableActivities,
		openActivities: state.openActivities
	};
}

const actionToTypeMap = new Map<ShowcaseActivityAction, string>();
actionToTypeMap.set(ShowcaseActivityAction.Open, 'OPEN_ACTIVITY');
actionToTypeMap.set(ShowcaseActivityAction.Close, 'CLOSE_ACTIVITY');
actionToTypeMap.set(ShowcaseActivityAction.Focus, 'CHANGE_ACTIVITY');

function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<ShowcaseProps> {
	return {
		onActivityAction: (action, id, options) => {
			const type = actionToTypeMap.get(action);
			if (!type) { new Error('Invalid action type performed on activity.'); }
			dispatch({ type, id });
		}
	};
}

class Showcase extends React.Component<ShowcaseProps, ShowcaseState> {
	public constructor(props: ShowcaseProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		const activities = this.props.openActivities
			.map((x, i) => {
				return (
					<div className="activity" key={ i } style={ this.getActivityWindowStyle(x.position, i) }>
						<div className="titlebar">
							<div className="title">Console</div>
							<button onClick={ this.onWindowAction.bind(this, 'close', x.position) }><i className="fa fa-window-close" /></button>
							<button onClick={ this.onWindowAction.bind(this, 'maximize', x.position) }><i className="fa fa-window-maximize" /></button>
							<button onClick={ this.onWindowAction.bind(this, 'minimize', x.position) }><i className="fa fa-window-minimize" /></button>
						</div>
						<x.activity onActivityAction={ this.props.onActivityAction } position={ x.position } />
					</div>
				);
			});

		return (<div>{ activities }</div>);
	}

	private onWindowAction = (action: string, position: OpenActivityPosition): void => {
		switch (action) {
			case 'maximize':
			
				break;
		}
	}

	private getActivityWindowStyle(position: OpenActivityPosition, index: number): React.CSSProperties {
		return {
			position: 'absolute',
			top: `${position.y}px`,
			left: `${position.x}px`,
			width: `${position.width}px`,
			height: `${position.height}px`,
			zIndex: (index + 1) * 100,
			overflow: 'hidden'
		};
	}


}

export interface AppState {
	availableActivities: { [id: string]: ShowcaseActivityClass<ShowcaseActivityProps> };
	openActivities: OpenActivity[];
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Showcase);

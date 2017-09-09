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
	private activityMap: Map<OpenActivity, HTMLDivElement>;

	public constructor(props: ShowcaseProps) {
		super(props);
		this.state = {};
		this.activityMap = new Map<OpenActivity, HTMLDivElement>();
	}

	public render(): JSX.Element {
		const activities = this.props.openActivities
			.map((x, i) => {
				return (
					<div ref={ ref => this.activityMap.set(x, ref) } className="activity" key={ i } style={ this.getActivityWindowStyle(x.position, i) }>
						<div className="titlebar">
							<div className="title">Console</div>
							<button onClick={ this.onWindowAction.bind(this, 'close', x) }><i className="fa fa-window-close" /></button>
							<button onClick={ () => { this.onWindowAction(x.position.isMaximized ? 'restore' : 'maximize', x); } }><i className={ x.position.isMaximized ? 'fa fa-window-restore' : 'fa fa-window-maximize' } /></button>
							<button onClick={ this.onWindowAction.bind(this, 'minimize', x) }><i className="fa fa-window-minimize" /></button>
						</div>
						<x.activity onActivityAction={ this.props.onActivityAction } />
					</div>
				);
			});

		return (<div>{ activities }</div>);
	}

	private onWindowAction = (action: string, activity: Readonly<OpenActivity>): void => {
		const activityDiv = this.activityMap.get(activity);

		switch (action) {
			case 'maximize':
				activity.position.isMaximized = true;
				this.applyActivityWindowStyle(activity.position, 0, activityDiv);
				break;
			case 'restore':
				activity.position.isMaximized = false;
				this.applyActivityWindowStyle(activity.position, 0, activityDiv);
				break;
		}
	}

	private getActivityWindowStyle(position: OpenActivityPosition, index: number): React.CSSProperties {
		const styles: React.CSSProperties = {
			position: 'absolute',
			zIndex: (index + 1) * 100,
			overflow: 'hidden'
		};

		if (position.isMaximized) {
			styles.top = 0,
			styles.left =  0,
			styles.right = 0,
			styles.bottom =  0
		} else {
			styles.top = `${position.y}px`,
			styles.left =  `${position.x}px`,
			styles.width =  `${position.width}px`,
			styles.height =  `${position.height}px`
		}

		return styles;
	}

	private applyActivityWindowStyle(position: OpenActivityPosition, index: number, element: HTMLElement): void {
		const style = this.getActivityWindowStyle(position, index);
		let styleString = '';
		Object.getOwnPropertyNames(style).forEach(x => {
			let styleName = x;
			switch (x) {
				case 'zIndex':
					styleName = 'z-index';
					break;
			}

			if (styleString.length > 0) {
				styleString += ';';
			}

			styleString += `${styleName}: ${style[x]}`;
		});

		element.setAttribute('style', styleString);
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

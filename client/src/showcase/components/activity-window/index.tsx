import * as React from 'react';
import ShowcaseActivity, { ActivityProps, ActivityClass, WindowAction, OpenWindow, OpenWindowPosition } from '../showcase-activity';

interface Props extends ActivityProps {
	availableActivities: ActivityClass<ActivityProps>[];
	window: OpenWindow;
	depth: number;
	onWindowAction: (action: WindowAction, activity: OpenWindow, options?: object) => void;
}

const getActivityWindowStyle = (depth: number, position: OpenWindowPosition): React.CSSProperties => {
	const styles: React.CSSProperties = {
		position: 'absolute',
		zIndex: (100 - depth) * 100,
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

const applyActivityWindowStyle = (depth: number, position: OpenWindowPosition, index: number, element: HTMLElement): void => {
	const style = getActivityWindowStyle(depth, position);
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

export default class ActivityWindow extends ShowcaseActivity<Props, {}> {
	public constructor(props: Props) {
		super(props);
		this.state = {};
	}

	private get isWindowMaximized(): boolean {
		return this.props.window.position.isMaximized;
	}

	public render(): JSX.Element {
		return (
			<div ref={ ref => void 0 } className="activity" style={ getActivityWindowStyle(this.props.depth, this.props.window.position) }>
				<div className="titlebar">
					<div className="title">Console</div>
					<button onClick={ () => { this.props.onWindowAction(WindowAction.Close, this.props.window); } }>
						<i className="fa fa-window-close" />
					</button>
					<button onClick={ () => {
						const action = this.isWindowMaximized ? WindowAction.Restore : WindowAction.Maximize;
						this.props.onWindowAction(action, this.props.window);
					} }>
						<i className={ this.isWindowMaximized ? 'fa fa-window-restore' : 'fa fa-window-maximize' } />
					</button>
					<button onClick={ () => { this.props.onWindowAction(WindowAction.Minimize, this.props.window); } }>
						<i className="fa fa-window-minimize" />
					</button>
				</div>
				<this.props.window.activity
					availableActivities={ this.props.availableActivities }
					onWindowAction={ (action, options) => { this.props.onWindowAction(action, this.props.window, options); } } />
			</div>
		);
	}
}

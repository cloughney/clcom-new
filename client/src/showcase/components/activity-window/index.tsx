import * as React from 'react';

type ActivityProps = {
	availableActivities: ActivityClass<any>[];
	onWindowAction: (action: WindowAction, options?: object) => void;
}

type Props = ActivityProps & {
	window: OpenWindow;
	depth: number;
}

type State = {
	readonly isMoving: boolean;
	readonly offset: { top: number, left: number };
	readonly windowStyle: React.CSSProperties;
}

const getActivityWindowStyle = (depth: number, position: WindowPosition): React.CSSProperties => {
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

export type AdapterProps = ActivityProps;

export abstract class ActivityAdapter<TProps extends AdapterProps, TState> extends React.Component<TProps, TState> {
	protected constructor(props: TProps) {
		super(props);
	}
}

export enum WindowAction {
	Open,
	Close,
	Focus,
	Restore,
	Minimize,
	Maximize,
	Resize,
	Move
}

export interface WindowPosition {
	x: number;
	y: number;
	width: number;
	height: number;
	isMaximized: boolean;
}

export interface OpenWindow {
	activity: ActivityClass;
	position: WindowPosition;
}

export interface ActivityClass<T extends AdapterProps = AdapterProps> {
	new(props: any): ActivityAdapter<T, any>;
}

export default class ActivityWindow extends ActivityAdapter<Props, State> {
	private element: HTMLDivElement;

	public constructor(props: Props) {
		super(props);
		this.state = {
			isMoving: false,
			offset: { top: 0, left: 0 },
			windowStyle: getActivityWindowStyle(props.depth, props.window.position)
		};
	}

	private get isWindowMaximized(): boolean {
		return this.props.window.position.isMaximized;
	}

	public render(): JSX.Element {
		return (
			<div ref={ ref => { this.element = ref; } } className={ `activity ${ this.isWindowMaximized ? 'maximized' : '' }` } style={ this.state.windowStyle } onMouseDown={ this.onFocus }>
				<div className="titlebar" onMouseDown={ this.onMouseDown }>
					<div className="title">{ this.props.window.activity.name.replace('Activity', '') }</div>
					<button onClick={ () => { this.props.onWindowAction(WindowAction.Close); } }>
						<i className="fa fa-window-close" />
					</button>
					<button onClick={ () => {
						const action = this.isWindowMaximized ? WindowAction.Restore : WindowAction.Maximize;
						this.props.onWindowAction(action);
					} }>
						<i className={ this.isWindowMaximized ? 'fa fa-window-restore' : 'fa fa-window-maximize' } />
					</button>
					<button onClick={ () => { this.props.onWindowAction(WindowAction.Minimize); } }>
						<i className="fa fa-window-minimize" />
					</button>
				</div>
				<this.props.window.activity
					availableActivities={ this.props.availableActivities }
					onWindowAction={ (action, options) => { this.props.onWindowAction(action, options); } } />
			</div>
		);
	}

	public componentWillReceiveProps(props: Props): void {
		this.setState(state => ({
			...state,
			windowStyle: getActivityWindowStyle(props.depth, props.window.position)
		}));
	}

	public componentDidUpdate(props: Props, state: State): void {
		if (!state.isMoving && this.state.isMoving) {
			document.addEventListener('mousemove', this.onMouseMove);
			document.addEventListener('mouseup', this.onMouseUp);
		} else if (state.isMoving && !this.state.isMoving) {
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('mouseup', this.onMouseUp);
		}
	}

	private onFocus = (): void => {
		if (this.props.depth !== 0) {
			this.props.onWindowAction(WindowAction.Focus);
		}
	}

	private onMouseDown = (e: React.MouseEvent<any>): void => {
		if (this.state.isMoving || this.props.window.position.isMaximized) { return; }
		e.preventDefault();

		const top = e.clientY - this.element.offsetTop;
		const left = e.clientX - this.element.offsetLeft;

		this.setState({
			isMoving: true,
			offset: { top, left }
		});
	}

	private onMouseUp = (e: MouseEvent): void => {
		if (!this.state.isMoving || this.props.window.position.isMaximized) { return; }
		e.preventDefault();

		this.setState({ isMoving: false });
		this.props.onWindowAction(WindowAction.Move, {
			x: this.element.offsetLeft,
			y: this.element.offsetTop
		});
	}

	private onMouseMove = (e: MouseEvent): void => {
		if (!this.state.isMoving) { return; }
		e.preventDefault();

		const x = e.clientX - this.state.offset.left;
		const y = e.clientY - this.state.offset.top;

		this.setState((state, props) => ({
			...state,
			windowStyle: getActivityWindowStyle(props.depth, {
				...props.window.position,
				x, y
			})
		}));
	}
}

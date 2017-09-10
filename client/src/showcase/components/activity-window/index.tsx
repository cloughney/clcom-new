import * as React from 'react';
import ShowcaseActivity, { ActivityProps, ActivityClass, WindowAction, OpenWindow, OpenWindowPosition } from '../showcase-activity';

interface Props extends ActivityProps {
	availableActivities: ActivityClass<ActivityProps>[];
	window: OpenWindow;
	depth: number;
	onWindowAction: (action: WindowAction, activity: OpenWindow, options?: object) => void;
}

interface State {
	isMoving: boolean;
	offset: { top: number, left: number };
	windowStyle: React.CSSProperties;
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

export default class ActivityWindow extends ShowcaseActivity<Props, State> {
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
			<div
				ref={ ref => { this.element = ref; } }
				className="activity"
				style={ this.state.windowStyle }>
				<div className="titlebar" onMouseDown={ this.onMouseDown }>
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

		console.log('end');
		this.setState({ isMoving: false });
	}

	private onMouseMove = (e: MouseEvent): void => {
		if (!this.state.isMoving) { return; }
		e.preventDefault();

		const x = this.element.clientLeft + (e.clientX - this.state.offset.left);
		const y = this.element.clientTop + (e.clientY - this.state.offset.top);

		console.log(`e: ${this.element.offsetLeft}, ${this.element.offsetTop}`)
		console.log(`f: ${x}, ${y}`);

		this.setState((state, props) => ({
			...state,
			windowStyle: getActivityWindowStyle(props.depth, {
				...props.window.position,
				x, y
			})
		}));
	}
}

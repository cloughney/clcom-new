import * as React from 'react';
import { ActivityComponent, ActivityProps, WindowAction, WindowPosition } from './activity';
import TitleBar from './title-bar';

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

type State = {
	readonly isMoving: boolean;
	readonly offset: { top: number, left: number };
	readonly windowStyle: React.CSSProperties;
}

export type AdapterProps = {
	availableActivities: ActivityProps['availableActivities'];
	onWindowAction: ActivityProps['onWindowAction'];
}

export function asAdapter<TProps extends AdapterProps>(Component: React.ComponentType<TProps>): ActivityComponent {
	const ActivityWindow = class extends React.Component<ActivityProps, State> {
		private element: HTMLDivElement;

		public constructor(props: ActivityProps) {
			super(props);
			this.state = {
				isMoving: false,
				offset: { top: 0, left: 0 },
				windowStyle: getActivityWindowStyle(props.depth, props.window.position)
			};
		}

		private get windowClassName(): string {
			const classList: string[] = ['activity'];

			if (this.props.window.position.isMaximized) {
				classList.push('maximized');
			}

			if (this.state.isMoving) {
				classList.push('dragging');
			}

			return classList.join(' ');
		}

		public render(): JSX.Element {
			return (
				<div
					ref={ ref => { this.element = ref; } }
					className={ this.windowClassName }
					style={ this.state.windowStyle }
					onMouseDown={ this.onFocus }>
					<TitleBar window={ this.props.window } onWindowAction={ this.props.onWindowAction } onMouseDown={ this.onMouseDown } />
					<Component
						availableActivities={ this.props.availableActivities }
						onWindowAction={ (action, options) => { this.props.onWindowAction(action, options); } } />
				</div>
			);
		}

		public componentWillReceiveProps(props: ActivityProps): void {
			this.setState(state => ({
				...state,
				windowStyle: getActivityWindowStyle(props.depth, props.window.position)
			}));
		}

		public componentDidUpdate(props: ActivityProps, state: State): void {
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

	return ActivityWindow;
}

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

export type ActivityProps = {
	availableActivities: ActivityComponent[];
	window: OpenWindow;
	depth: number;
	onWindowAction: (action: WindowAction, options?: object) => void;
}

export type ActivityComponent = React.ComponentType<ActivityProps>;
export type Activity = {
	component: ActivityComponent;
}

export interface OpenWindow {
	activity: ActivityComponent;
	position: WindowPosition;
}

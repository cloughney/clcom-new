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
	availableActivities: Activity[];
	window: OpenWindow;
	depth: number;
	onWindowAction: (action: WindowAction, options?: object) => void;
}

export type ActivityComponent = React.ComponentType<ActivityProps>;
export type Activity = {
	locator: string;
	title: string;
	component: ActivityComponent;
}

export interface OpenWindow {
	activity: Activity;
	position: WindowPosition;
}

import * as React from 'react';

abstract class ActivityAdapter<TProps extends ActivityProps, TState> extends React.Component<TProps, TState> {
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
	Resize
}

export interface OpenWindowPosition {
	x: number;
	y: number;
	width: number;
	height: number;
	isMaximized: boolean;
}

export interface OpenWindow {
	activity: ActivityClass<ActivityProps>;
	position: OpenWindowPosition;
}

export interface ActivityProps extends React.Props<HTMLElement> {
	availableActivities: ActivityClass<ActivityProps>[];
	onWindowAction: (action: WindowAction, options?: object) => void;
}

export interface ActivityClass<T extends ActivityProps> {
	new(props: any): ActivityAdapter<T, any>;
}

export default ActivityAdapter;

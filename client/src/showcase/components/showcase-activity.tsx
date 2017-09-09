import * as React from 'react';

abstract class ShowcaseActivity<TProps extends ShowcaseActivityProps, TState> extends React.Component<TProps, TState> {
	protected constructor(props: TProps) {
		super(props);
	}
}

export enum ShowcaseActivityAction {
	Open,
	Close,
	Focus
}

export interface OpenActivityPosition {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface OpenActivity {
	activity: ShowcaseActivityClass<ShowcaseActivityProps>;
	position: OpenActivityPosition;
}

export interface ShowcaseActivityProps {
	onActivityAction: (action: ShowcaseActivityAction, activityId: string, options?: object) => void;
	position: OpenActivityPosition
}

export interface ShowcaseActivityClass<T extends ShowcaseActivityProps> {
	new(props: any): ShowcaseActivity<T, any>;
}

export default ShowcaseActivity;

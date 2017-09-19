import * as React from 'react';
import { ActivityProps } from 'react-window-manager';

interface State {}

export default class Explorer extends React.Component<ActivityProps, State> {
	public constructor(props: ActivityProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (<div style={{ width: '100%', height: '100%', background: 'blue' }} />);
	}
}

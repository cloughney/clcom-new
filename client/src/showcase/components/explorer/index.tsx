import * as React from 'react';
import { ActivityProps } from '../activity-window';
import Explorer from '../../../item-explorer';

class ExplorerActivity extends React.Component<ActivityProps> {
	public constructor(props: ActivityProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (<Explorer />);
	}
}

export default ExplorerActivity;

import * as React from 'react';
import { asAdapter, AdapterProps } from '../activity-window';
import Explorer from '../../../item-explorer';

class ExplorerActivity extends React.Component<AdapterProps> {
	public constructor(props: AdapterProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (<Explorer />);
	}
}

export default asAdapter(ExplorerActivity);

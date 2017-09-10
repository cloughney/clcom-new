import * as React from 'react';
import { ActivityAdapter, AdapterProps } from '../activity-window';
import Explorer from '../../../item-explorer';

export default class ExplorerActivity extends ActivityAdapter<AdapterProps, {}> {
	public constructor(props: AdapterProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (<Explorer />);
	}
}

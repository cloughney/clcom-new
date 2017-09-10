import * as React from 'react';
import ActivityAdapter, { ActivityProps } from '../showcase-activity';
import Explorer from '../../../item-explorer';

interface Props extends ActivityProps {}

export default class ExplorerActivity extends ActivityAdapter<Props, {}> {
	public constructor(props: Props) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (<Explorer />);
	}
}

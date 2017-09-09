import * as React from 'react';
import ShowcaseActivity, { ShowcaseActivityProps } from '../showcase-activity';
import Explorer from '../../../item-explorer';

interface Props extends ShowcaseActivityProps {}

export default class ExplorerActivity extends ShowcaseActivity<Props, {}> {
	public constructor(props: Props) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (<Explorer />);
	}
}

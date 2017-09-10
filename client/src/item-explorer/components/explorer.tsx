import * as React from 'react';

interface ExplorerProps {}
interface ExplorerState {}

export default class Explorer extends React.Component<ExplorerProps, ExplorerState> {
	public constructor(props: ExplorerProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (<div style={{ width: '100%', height: '100%', background: 'blue' }} />);
	}
}

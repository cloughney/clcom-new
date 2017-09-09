import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface ShowcaseProps {
	components: JSX.Element[];
}
interface ShowcaseState {
	activeComponent: JSX.Element;
}

function mapStateToProps(state: AppState): Partial<ShowcaseProps> {
	return {
		components: state.showcaseComponents
	};
}

function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<ShowcaseProps> {
	return {};
}

class Showcase extends React.Component<ShowcaseProps, ShowcaseState> {
	public constructor(props: ShowcaseProps) {
		super(props);
		this.state = {
			activeComponent: props.components[0]
		};
	}

	public componentWillMount(): void {

	}

	public render(): JSX.Element {
		const ActiveComponent = this.state.activeComponent;
		return ActiveComponent;
	}
}

export interface AppState {
	showcaseComponents: JSX.Element[];
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Showcase);

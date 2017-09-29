import * as React from 'react';
import { ActivityProps, WindowAction } from 'react-window-manager';

type State = {
	activePointerThings: { type: string, text: string }[];
};

export default class ItemExplorerActivity extends React.Component<ActivityProps, State> {
	public constructor(props: ActivityProps) {
		super(props);
		this.state = {
			activePointerThings: []
		};
	}

	public render(): JSX.Element {
		const pointerThings = this.state.activePointerThings.map((x, i) => 
			(<div key={ i } className={ `pointer-thing ${x.type}` }><i />{ x.text }</div>));

		return (
			<div className="item-explorer" style={{ position: 'relative' }}>
				{ pointerThings }
				<h1>Explore things...</h1>
				<ul>
					{ 
						this.props.availableActivities
							.filter(x => x.component !== ItemExplorerActivity)
							.map((x, i) => (
								<li key={ i } onClick={ e => this.props.onWindowAction(WindowAction.Open, { activity: x }) }>
									<i className={ `fa-${x.icon}` } />
									<span>{ x.title }</span>
								</li>
							))
					}
				</ul>
			</div>
		);
	}
}

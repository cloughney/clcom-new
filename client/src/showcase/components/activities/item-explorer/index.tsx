import * as React from 'react';
import { ActivityProps, WindowAction } from 'react-window-manager';

const ExplorerActivity: React.SFC<ActivityProps> = props => (
	<div className="item-explorer">
		<ul>
			{ props.availableActivities.filter(x => x.component !== ExplorerActivity).map(x => (
				<li onClick={ e => props.onWindowAction(WindowAction.Open, { activity: x }) }>
					<i className={ `fa-${x.icon}` } />
					<span>{ x.title }</span>
				</li>
			)) }
		</ul>
	</div>
)

export default ExplorerActivity;

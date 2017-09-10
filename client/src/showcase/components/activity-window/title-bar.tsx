import * as React from 'react';
import { WindowAction } from './activity';

const TitleBar: React.SFC = props => (
	<div className="titlebar" onMouseDown={ this.onMouseDown }>
		<div className="title">{ this.props.window.activity.name.replace('Activity', '') }</div>
		<button onClick={ () => { this.props.onWindowAction(WindowAction.Close); } }>
			<i className="fa fa-window-close" />
		</button>
		<button onClick={ () => {
			const action = this.isWindowMaximized ? WindowAction.Restore : WindowAction.Maximize;
			this.props.onWindowAction(action);
		} }>
			<i className={ this.isWindowMaximized ? 'fa fa-window-restore' : 'fa fa-window-maximize' } />
		</button>
		<button onClick={ () => { this.props.onWindowAction(WindowAction.Minimize); } }>
			<i className="fa fa-window-minimize" />
		</button>
	</div>
)

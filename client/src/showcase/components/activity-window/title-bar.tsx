import * as React from 'react';
import { OpenWindow, WindowAction, ActivityProps } from './activity';

type Props = {
	onMouseDown: React.MouseEventHandler<HTMLDivElement>;
	onWindowAction: ActivityProps['onWindowAction'];
	window: ActivityProps['window'];
}

const getMaximizeToggleAction = (window: Props['window']): WindowAction =>
	window.position.isMaximized
		? WindowAction.Restore
		: WindowAction.Maximize;

const getMaximizeToggleClassName = (window: Props['window']): string =>
	window.position.isMaximized
		? 'fa fa-window-restore'
		: 'fa fa-window-maximize';

const TitleBar: React.SFC<Props> = (props: Props): JSX.Element => (
	<div className="titlebar" onMouseDown={ props.onMouseDown }>
		<div className="title">
			{props.window.activity.icon
				? <i className={ `fa fa-${props.window.activity.icon}` } />
				: undefined
			}
			{ props.window.activity.title }
		</div>
		<button onClick={ () => { props.onWindowAction(WindowAction.Close); } }>
			<i className="fa fa-window-close" />
		</button>
		<button onClick={ () => { props.onWindowAction(getMaximizeToggleAction(props.window)); } }>
			<i className={ getMaximizeToggleClassName(props.window) } />
		</button>
		<button onClick={ () => { props.onWindowAction(WindowAction.Minimize); } }>
			<i className="fa fa-window-minimize" />
		</button>
	</div>
)

export default TitleBar;

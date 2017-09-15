import * as React from 'react';
import { ActivityProps, WindowAction, Activity } from '../activity-window';
import Console, { ConsoleCommand, ConsoleTextLineType } from 'react-console';
import createCommandHandler from './commands';

const welcomeMessage = [
	{ text: 'Welcome!', type: ConsoleTextLineType.Standard, hasEol: true },
	{ text: 'Type \'help\' to see available commands.', type: ConsoleTextLineType.Standard, hasEol: true }
];

const ConsoleActivity: React.SFC<ActivityProps> = ({ availableActivities, onWindowAction }) => (
	<div className="console">
		<Console outputLines={ welcomeMessage } onCommandReceived={ createCommandHandler(availableActivities, activity => onWindowAction(WindowAction.Open, { activity })) } />
	</div>
)

export default ConsoleActivity;

import * as React from 'react';
import { asAdapter, AdapterProps, WindowAction } from '../activity-window';
import Console, { ConsoleCommand, ConsoleTextLineType } from '../../../console';
import handleCommand from './commands';

const onCommandReceived = async (command: ConsoleCommand): Promise<number> => {
	if (command.name == 'switch') {
		// const activityName = command.args[0];
		// const activity = availableActivities.find(x => x.name.toLowerCase().replace('activity', '') === activityName);
		// if (activity) {
		// 	this.props.onWindowAction(WindowAction.Open, { activity });
		// 	return 0;
		// }

		return 1;
	}

	return handleCommand(command);
}

const welcomeMessage = [
	{ text: 'Welcome!', type: ConsoleTextLineType.Standard, hasEol: true },
	{ text: 'Type \'help\' to see available commands.', type: ConsoleTextLineType.Standard, hasEol: true }
];

const ConsoleActivity: React.SFC<AdapterProps> = (props): JSX.Element => (
	<div className="console">
		<Console outputLines={ welcomeMessage } onCommandReceived={ command => onCommandReceived(command) } />
	</div>
)

export default asAdapter(ConsoleActivity);

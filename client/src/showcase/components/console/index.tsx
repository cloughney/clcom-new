import * as React from 'react';
import { ActivityProps, WindowAction, Activity } from '../activity-window';
import Console, { ConsoleCommand, ConsoleTextLineType } from '../../../console';
import handleCommand from './commands';

const onCommandReceived = async (
	command: ConsoleCommand,
	activities: ActivityProps['availableActivities'],
	onWindowAction: ActivityProps['onWindowAction']): Promise<number> => {

	if (command.name.startsWith('./')) {
		const activityName = command.name.slice(2);
		const activity = activities.find(x => x.locator.toLowerCase() === activityName);
		if (activity) {
			onWindowAction(WindowAction.Open, { activity });
			return 0;
		}

		return 1;
	}

	return handleCommand(command);
}

const welcomeMessage = [
	{ text: 'Welcome!', type: ConsoleTextLineType.Standard, hasEol: true },
	{ text: 'Type \'help\' to see available commands.', type: ConsoleTextLineType.Standard, hasEol: true }
];

const ConsoleActivity: React.SFC<ActivityProps> = (props): JSX.Element => (
	<div className="console">
		<Console outputLines={ welcomeMessage } onCommandReceived={ cmd => onCommandReceived(cmd, props.availableActivities, props.onWindowAction) } />
	</div>
)

export default ConsoleActivity;

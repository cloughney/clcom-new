import * as React from 'react';
import ActivityAdapter, { ActivityProps, WindowAction } from '../showcase-activity';
import Console, { ConsoleCommand, ConsoleTextLineType } from '../../../console';
import handleCommand from './commands';

interface Props extends ActivityProps {}

export default class ConsoleActivity extends ActivityAdapter<Props, {}> {
	public constructor(props: Props) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		const welcomeMessage = [
			{ text: 'Welcome!', type: ConsoleTextLineType.Standard, hasEol: true },
			{ text: 'Type \'help\' to see available commands.', type: ConsoleTextLineType.Standard, hasEol: true }
		];

		return (
			<div className="console">
				<Console
					outputLines={ welcomeMessage }
					onCommandReceived={ this.onCommandReceived.bind(this) } />
			</div>
		)
	}

	private async onCommandReceived(command: ConsoleCommand): Promise<number> {
		if (command.name == 'switch') {
			const activityName = command.args[0];
			const activity = this.props.availableActivities.find(x => x.name.toLowerCase().replace('activity', '') === activityName);
			if (activity) {
				this.props.onWindowAction(WindowAction.Open, { activity });
				return 0;
			}

			return 1;
		}

		return handleCommand(command);
	}
}

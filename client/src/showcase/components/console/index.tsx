import * as React from 'react';
import ShowcaseActivity, { ShowcaseActivityProps, ShowcaseActivityAction } from '../showcase-activity';
import Console, { ConsoleCommand, ConsoleTextLineType } from '../../../console';
import handleCommand from './commands';

interface Props extends ShowcaseActivityProps {}

export default class ConsoleActivity extends ShowcaseActivity<Props, {}> {
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
			command.stdout.writeLine(`switching to ${command.args[0]}...`);
			this.props.onActivityAction(ShowcaseActivityAction.Open, command.args[0]);
			return 0;
		}

		return handleCommand(command);
	}
}

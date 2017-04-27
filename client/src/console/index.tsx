import * as React from 'react';

interface ConsoleStream {
	write: (data: string) => Promise<void>;
}

interface ConsoleCommand {
	input: string;
	name: string;
	args: string[];

	stdout: ConsoleStream;
	stderr: ConsoleStream;
}

interface ConsoleCommandResponse {

}

interface ConsoleProps extends React.Props<any> {
	outputLines?: string[];
	input?: string;
	cursor?: string;
	onCommandReceived?: (command: ConsoleCommand) => Promise<number>;
}

interface ConsoleState {
	outputLines: string[];
	input: string;
}

const welcomeMessage = [
	'### Welcome ###############################################',
	'### Type \'help\' to see available commands. ################',
	'###########################################################'
];

export default class Console extends React.Component<ConsoleProps, ConsoleState> {
	private cursorElement: HTMLLabelElement;
	private inputElement: HTMLInputElement;

	private get cursor(): string {
		return this.props.cursor || '$>';
	}

	public constructor(props: ConsoleProps) {
		super(props);
		this.state = {
			outputLines: props.outputLines || welcomeMessage,
			input: props.input || ''
		};
	}

	public render(): JSX.Element {
		const outputHtml = this.state.outputLines.map((line, index) => (<div key={ index }>{ line }</div>));

		return (
			<form onClick={ this.onFocus } onSubmit={ this.onInput }>
				<div className="output">
					{ outputHtml }
				</div>
				<div className="input-line">
					<label ref={ el => { this.cursorElement = el; } }>{ this.cursor }</label>
					<input type="text" ref={ el => { this.inputElement = el; } } />
				</div>
			</form>
		);
	}

	private onFocus = (): void => {
		this.inputElement.focus();
	};

	private onInput = async (e: React.FormEvent<any>): Promise<void> => {
		e.preventDefault();

		this.inputElement.style.visibility = 'hidden';
		this.cursorElement.style.visibility = 'hidden';

		const input = this.inputElement.value;
		this.onStdOut(`${this.cursor} ${input}`);
		this.inputElement.value = '';

		await this.sendCommand(input);

		this.cursorElement.style.visibility = 'visible';
		this.inputElement.style.visibility = 'visible';
		this.inputElement.focus();
	};

	private onStdOut = async (data: string): Promise<void> => {
		this.setState({ outputLines: this.state.outputLines.concat([ data ]) });
	};

	private onStdErr = async (data: string): Promise<void> => {
		this.setState({ outputLines: this.state.outputLines.concat([ data ]) });
	};

	private sendCommand = (input: string): Promise<number> => {
		if (!this.props.onCommandReceived) return;

		const inputParts = input.split(' ');
		const commandName = inputParts[0];
		const commandArgs = inputParts.slice(1);

		return new Promise<number>(async (resolve, reject) => {
			const timeoutTimer = setTimeout(() => { reject(new Error('Command timed out.')); }, 10000);
			const exitCode = await this.props.onCommandReceived({
				input,
				name: commandName,
				args: commandArgs,

				stdout: { write: this.onStdOut },
				stderr: { write: this.onStdErr }
			});

			clearTimeout(timeoutTimer);
			resolve(exitCode);
		});
	};
};

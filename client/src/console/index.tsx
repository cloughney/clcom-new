import * as React from 'react';

interface ConsoleProps extends React.Props<any> {
	outputLines?: ConsoleTextLine[];
	input?: string;
	cursor?: string;
	onCommandReceived?: (command: ConsoleCommand) => Promise<number>;
}

interface ConsoleState {
	outputLines: ConsoleTextLine[];
	input: string;
}

interface ConsoleTextLine {
	text: string;
	className?: string;
}

const welcomeMessage = [
	{ text: '### Welcome ###############################################' },
	{ text: '### Type \'help\' to see available commands. ################' },
	{ text: '###########################################################' }
];

export default class Console extends React.Component<ConsoleProps, ConsoleState> {
	private formElement: HTMLFormElement;
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
		const outputHtml = this.state.outputLines.map((line, index) => (<div key={ index } className={ line.className }>{ line.text }</div>));

		return (
			<form onClick={ this.onFocus } onSubmit={ this.onInput } ref={ el => { this.formElement = el; } }>
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
		await this.onStdOut(`${this.cursor} ${input}`);
		this.inputElement.value = '';

		await this.sendCommand(input);

		this.cursorElement.style.visibility = 'visible';
		this.inputElement.style.visibility = 'visible';
		this.inputElement.focus();
	};

	private onStdOut = async (data: string): Promise<void> => {
		const dataLine = {
			text: data
		};

		this.setState(state => ({ outputLines: state.outputLines.concat([ dataLine ]) }));
		this.formElement.scrollTop = this.formElement.scrollHeight;
	};

	private onStdErr = async (data: string): Promise<void> => {
		const dataLine = {
			className: 'error',
			text: data
		};

		this.setState(state => ({ outputLines: state.outputLines.concat([ dataLine ]) }));
		this.formElement.scrollTop = this.formElement.scrollHeight;
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

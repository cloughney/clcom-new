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
	type: ConsoleTextLineType;
	hasEol: boolean;
}

enum ConsoleTextLineType {
	Standard,
	Error
}

const welcomeMessage = [
	{ text: '### Welcome ###############################################', type: ConsoleTextLineType.Standard, hasEol: true },
	{ text: '### Type \'help\' to see available commands. ################', type: ConsoleTextLineType.Standard, hasEol: true },
	{ text: '###########################################################', type: ConsoleTextLineType.Standard, hasEol: true }
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
		const outputHtml = this.state.outputLines.map((line, index) => {
			let className: string;
			switch (line.type) {
				case ConsoleTextLineType.Error:
					className = 'error';
					break;
			}

			return (<div key={ index } className={ className }>{ line.text }</div>);
		});

		return (
			<form onClick={ this.focusInput } onSubmit={ this.onInput } ref={ el => { this.formElement = el; } }>
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

	private focusInput = (): void => {
		this.formElement.scrollTop = this.formElement.scrollHeight;
		this.inputElement.focus();
	};

	private onInput = async (e: React.FormEvent<any>): Promise<void> => {
		e.preventDefault();

		this.inputElement.style.visibility = 'hidden';
		this.cursorElement.style.visibility = 'hidden';

		const input = this.inputElement.value;
		this.inputElement.value = '';

		await this.writeOutput({ data: `${this.cursor} ${input}`, writeLine: true, forceNewLine: true });
		await this.sendCommand(input);

		this.cursorElement.style.visibility = 'visible';
		this.inputElement.style.visibility = 'visible';
		this.focusInput();
	};

	private writeOutput = async (params: {
		data: string;
		writeLine?: boolean;
		forceNewLine?: boolean;
		outputType?: ConsoleTextLineType;
	}): Promise<void> => {

		this.setState(state => {
			const outputLines = state.outputLines;
			const currentLine: ConsoleTextLine = outputLines.length !== 0 ? outputLines[outputLines.length - 1] : undefined;
			const writeNewLine = !currentLine || currentLine.hasEol || params.forceNewLine;

			if (writeNewLine) {
				outputLines.push({
					text: params.data,
					type: params.outputType,
					hasEol: params.writeLine
				});
			} else {
				currentLine.text += params.data;
				currentLine.type = params.outputType;
				currentLine.hasEol = params.writeLine;
			}

			if (outputLines.length > 100) {
				outputLines.splice(0, 1);
			}

			return { outputLines };
		});

		this.focusInput();
	};

	private clearOutput = (): Promise<void> => {
		this.setState(state => ({ outputLines: [] }));
		return Promise.resolve();
	}

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

				stdout: {
					write: data => this.writeOutput({ data, writeLine: false }),
					writeLine: data => this.writeOutput({ data, writeLine: true }),
					clear: this.clearOutput
				},
				stderr: {
					write: data => this.writeOutput({ data, writeLine: false, outputType: ConsoleTextLineType.Error }),
					writeLine: data => this.writeOutput({ data, writeLine: true, outputType: ConsoleTextLineType.Error }),
					clear: this.clearOutput
				}
			} as ConsoleCommand);

			clearTimeout(timeoutTimer);
			resolve(exitCode);
		});
	};
};

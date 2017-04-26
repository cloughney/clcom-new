import * as React from 'react';

interface ConsoleProps extends React.Props<any> {
	outputLines?: string[];
	input?: string;
	cursor?: string;
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
	private inputControl: HTMLInputElement;

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
					<label>{ this.cursor }</label>
					<input type="text" ref={ input => { this.inputControl = input; } } />
				</div>
			</form>
		);
	}

	private onFocus = (): void => {
		this.inputControl.focus();
	};

	private onInput = (e: React.FormEvent<any>) => {
		this.setState({ outputLines: this.state.outputLines.concat([ `${this.cursor} ${this.inputControl.value}` ]) });
		this.inputControl.value = '';
		this.inputControl.focus();

		e.preventDefault();
	};
};

import * as React from 'react';
import { render } from 'react-dom';
//import { createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';

import Console, { ConsoleTextLineType } from './console/components/console';
//import { reducer } from './common/reducers';

//const stateStore = createStore<{AppState}>(reducer);

const commands = new Map<string, (command: any) => Promise<number>>();
commands.set('help', cmd => new Promise<number>(resolve => {
	cmd.stdout.write('HELP!');
	cmd.stdout.write('HELP!');
	resolve(0);
}));

commands.set('clear', async cmd => {
	await cmd.stdout.clear();
	return Promise.resolve(0);
});

const exeNotFound = async (cmd: ConsoleCommand) => {
	await cmd.stderr.writeLine(`'${cmd.name}' is not a valid command.`);
	return Promise.resolve(1);
};

const welcomeMessage = [
	{ text: 'Welcome!', type: ConsoleTextLineType.Standard, hasEol: true },
	{ text: 'Type \'help\' to see available commands.', type: ConsoleTextLineType.Standard, hasEol: true }
];

const onCommandReceived = (command: ConsoleCommand): Promise<number> => {
	let exe = commands.get(command.name) || exeNotFound;
	return exe(command);
};

//<Provider store={stateStore}>
//</Provider>,
render(
	<Console
		outputLines={welcomeMessage}
 		onCommandReceived={onCommandReceived} />,
 document.getElementById('app'));

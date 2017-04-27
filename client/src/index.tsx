import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { createStore, applyMiddleware } from 'redux';
//import { Provider } from 'react-redux';

import Console from './console/index';
//import { reducer } from './common/reducers';

//const stateStore = createStore<{AppState}>(reducer);

const commands = new Map<string, (command: any) => Promise<number>>();
commands.set('help', cmd => new Promise<number>(resolve => {
	cmd.stdout.write('HELP!');
	cmd.stdout.write('HELP!');
	resolve(0);
}));

const exeNotFound = cmd => new Promise<number>(resolve => {
	cmd.stderr.writeLine(`'${cmd.name}' is not a valid command.`);
	resolve(1);
});

//<Provider store={stateStore}>
//</Provider>,
 ReactDOM.render(
	<Console onCommandReceived={
		(command) => {
			let exe = commands.get(command.name) || exeNotFound;
			return exe(command);
		}
	} />,
	document.getElementById('app'));

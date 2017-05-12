import { ConsoleTextLineType } from '../components/console';

export default function onCommandReceived(command: ConsoleCommand): Promise<number> {
	let exe = commands.get(command.name) || exeNotFound;
	return exe(command);
}

export const welcomeMessage = [
	{ text: 'Welcome!', type: ConsoleTextLineType.Standard, hasEol: true },
	{ text: 'Type \'help\' to see available commands.', type: ConsoleTextLineType.Standard, hasEol: true }
];

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

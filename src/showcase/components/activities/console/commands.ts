import { Activity, ActivityProps } from 'react-window-manager';
import { ConsoleTextLineType, ConsoleCommand } from 'react-console';

interface ConsoleCommandExecutable {
	name: string;
	description: string;
	exe: (receivedCommand: ConsoleCommand) => Promise<number>;
}

const commands = new Map<string, ConsoleCommandExecutable>();
commands.set('help', {
	name: 'help',
	description: 'Displays a list of available commands.',
	exe: cmd => new Promise<number>(resolve => {
		cmd.stdout.writeLine('Available commands:');
		commands.forEach((command, commandName) => {
			cmd.stdout.writeLine(` > ${commandName} - ${command.description}`);
		});

		resolve(0);
	})
});

commands.set('clear', {
	name: 'clear',
	description: 'Clears all previous output from the console window.',
	exe: async cmd => {
		await cmd.stdout.clear();
		return Promise.resolve(0);
	}
});

const exeNotFound = async (cmd: any): Promise<number> => {
	await cmd.stderr.writeLine(`'${cmd.name}' is not a valid command.`);
	return Promise.resolve(1);
};

export default function createCommandHandler(activities: Activity[], openWindow: (activity: Activity) => void) {
	activities.forEach(x => {
		commands.set(x.locator, {
			name: x.locator,
			description: x.title,
			exe: async cmd => { openWindow(x); return 0; }
		});
	});

	return (command: ConsoleCommand): Promise<number> => {
		const matchedCommand = commands.get(command.name);
		const exe = matchedCommand ? matchedCommand.exe : exeNotFound;
		return exe(command);
	};
}

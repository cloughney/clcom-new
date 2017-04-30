interface ConsoleStream {
	write: (data: string) => Promise<void>;
	writeLine: (data: string) => Promise<void>;
	clear: () => Promise<void>;
}

interface ConsoleCommand {
	input: string;
	name: string;
	args: string[];

	stdout: ConsoleStream;
	stderr: ConsoleStream;
}

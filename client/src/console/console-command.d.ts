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

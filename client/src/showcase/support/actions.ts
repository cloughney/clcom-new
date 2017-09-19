import * as React from 'react';
import { AnyAction } from 'redux'
import { Activity, OpenWindow } from 'react-window-manager';

export const OPEN_WINDOW = 'OPEN_WINDOW';
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const FOCUS_WINDOW = 'FOCUS_WINDOW';
export const MOVE_WINDOW = 'MOVE_WINDOW';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';
export const MAXIMIZE_WINDOW = 'MAXIMIZE_WINDOW';
export const MINIMIZE_WINDOW = 'MINIMIZE_WINDOW';
export const RESTORE_WINDOW = 'RESTORE_WINDOW';

export type Actions = {
	OPEN_WINDOW: {
		type: typeof OPEN_WINDOW;
		options: {
			activity: Activity
		}
	},
	CLOSE_WINDOW: {
		type: typeof CLOSE_WINDOW;
		options: {
			window: OpenWindow
		}
	},
	FOCUS_WINDOW: {
		type: typeof FOCUS_WINDOW;
		options: {
			window: OpenWindow
		}
	},
	MOVE_WINDOW: {
		type: typeof MOVE_WINDOW;
		options: {
			window: OpenWindow,
			location: { x: number, y: number }
		}
	},
	RESIZE_WINDOW: {
		type: typeof RESIZE_WINDOW;
		options: {
			window: OpenWindow
		}
	},
	MAXIMIZE_WINDOW: {
		type: typeof MAXIMIZE_WINDOW;
		options: {
			window: OpenWindow
		}
	},
	MINIMIZE_WINDOW: {
		type: typeof MINIMIZE_WINDOW;
		options: {
			window: OpenWindow
		}
	},
	RESTORE_WINDOW: {
		type: typeof RESTORE_WINDOW;
		options: {
			window: OpenWindow
		}
	}
}

export const actionFactory = {
	openWindow: (activity: Activity): Actions[typeof OPEN_WINDOW] => ({
		type: OPEN_WINDOW,
		options: { activity }
	}),
	closeWindow: (windowHandle: OpenWindow): Actions[typeof CLOSE_WINDOW] => ({
		type: CLOSE_WINDOW,
		options: { window: windowHandle }
	}),
	focusWindow: (windowHandle: OpenWindow): Actions[typeof FOCUS_WINDOW] => ({
		type: FOCUS_WINDOW,
		options: { window: windowHandle }
	}),
	moveWindow: (windowHandle: OpenWindow, location: { x: number, y: number }): Actions[typeof MOVE_WINDOW] => ({
		type: MOVE_WINDOW,
		options: { window: windowHandle, location }
	}),
	resizeWindow: (windowHandle: OpenWindow): Actions[typeof RESIZE_WINDOW] => ({
		type: RESIZE_WINDOW,
		options: { window: windowHandle }
	}),
	maximizeWindow: (windowHandle: OpenWindow): Actions[typeof MAXIMIZE_WINDOW] => ({
		type: MAXIMIZE_WINDOW,
		options: { window: windowHandle }
	}),
	minimizeWindow: (windowHandle: OpenWindow): Actions[typeof MINIMIZE_WINDOW] => ({
		type: MINIMIZE_WINDOW,
		options: { window: windowHandle }
	}),
	restoreWindow: (windowHandle: OpenWindow): Actions[typeof RESTORE_WINDOW] => ({
		type: RESTORE_WINDOW,
		options: { window: windowHandle }
	})
}

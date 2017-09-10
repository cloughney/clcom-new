import * as React from 'react';
import { AnyAction } from 'redux'

export const OPEN_WINDOW = 'OPEN_WINDOW';

export type Actions = {
	OPEN_WINDOW: {
		type: typeof OPEN_WINDOW;
		options: {}
	}
}

export const actionFactory = {
	openWindow: (): Actions[typeof OPEN_WINDOW] => ({
		type: OPEN_WINDOW,
		options: undefined
	})
}

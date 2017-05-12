import * as React from 'react';
import { render } from 'react-dom';

import Console from './console/components/console';
import onCommandReceived, { welcomeMessage } from './console/handlers/default';

import Feed from './feed';

render(
	<Console
		outputLines={welcomeMessage}
		onCommandReceived={onCommandReceived} />,
	document.querySelector('body header .console'));

render(
	<Feed />,
	document.querySelector('body .content')
)

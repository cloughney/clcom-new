import * as React from 'react';
import { render } from 'react-dom';

import Console from '../console/components/console';
import onCommandReceived, { welcomeMessage } from '../console/handlers/default';

render(
	<Console
		outputLines={welcomeMessage}
		onCommandReceived={onCommandReceived} />,
	document.querySelector('body .content .console'));

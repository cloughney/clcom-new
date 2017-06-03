import * as React from 'react';
import { render } from 'react-dom';

import Feed from '../feed/feed';

render(
	<Feed />,
	document.querySelector('body .content')
)

import * as React from 'react';
import { assert } from 'chai';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';

import Console from '../../../src/console/components/console';

describe('The Console component', () => {
	let renderer: ShallowRenderer;

	beforeEach(() => {
		renderer = createRenderer();
		renderer.render(<Console />);
	});

	it('test', () => {
		var test = renderer.getRenderOutput();
	});

});

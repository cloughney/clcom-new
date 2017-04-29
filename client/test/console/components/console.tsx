import * as React from 'react';
import { mount } from 'enzyme';

import Console from '../../../src/console/components/console';

describe('<Console />', () => {
	it('displays input', () => {
		const input = 'test string';
		const wrapper = mount(<Console />);

		wrapper.setState({ input });
		wrapper.find('form').simulate('submit');

		waits(1000);
		expect(wrapper.find('.output').children().last().text()).toBe(input);
	});

});

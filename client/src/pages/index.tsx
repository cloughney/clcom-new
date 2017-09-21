import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Showcase from '../showcase';

// const store = createStore(reducer);
// <Provider store={ store }></Provider>

render(<Showcase />, document.querySelector('body .content .showcase'));

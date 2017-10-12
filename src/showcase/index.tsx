import * as React from 'react';
import WindowManager, { Activity, ActivityProps } from 'react-window-manager';
import ConsoleActivity from './components/activities/console';
import ExplorerActivity from './components/activities/item-explorer';
import ViewSourceActivity from './components/activities/view-source';

const defaultActivity: Activity = {
	locator: 'explorer',
	title: 'Item Explorer',
	icon: 'folder-o',
	component: ExplorerActivity,
	attributes: {
		'source-url': 'https://github.com/cloughney/react-window-manager'
	}
};

const availableActivities: ActivityProps['availableActivities'] = [
	defaultActivity,
	{
		locator: 'console',
		title: 'Console',
		icon: 'microchip',
		component: ConsoleActivity,
		attributes: {
			'source-url': 'https://github.com/cloughney/react-console'
		}
	},
	{
		locator: 'view-source',
		title: 'View Source',
		icon: 'code',
		component: ViewSourceActivity
	}
];

const Showcase: React.SFC = () => (
	<WindowManager
		availableActivities={ availableActivities }
		openWindows={ [{
			activity: defaultActivity,
			position: {
				x: 0,
				y: 0,
				width: 640,
				height: 480,
				state: 'MAXIMIZED'
			}
		}] }/>
)

export default Showcase;
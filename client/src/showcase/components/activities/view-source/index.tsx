import * as React from 'react';
import { ActivityWindowProps } from 'react-window-manager';

const ViewSourceActivity: React.SFC<ActivityWindowProps> = props => (
    <div style={{ width: '100%', height: '100%', background: '#fff' }}>
        <ul>
            <li>Website</li>
            <li>Console</li>
            <li>Window Manager</li>
        </ul>
    </div>
);

export default ViewSourceActivity;
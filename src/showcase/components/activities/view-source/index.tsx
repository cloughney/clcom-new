import * as React from 'react';
import { ActivityWindowProps } from 'react-window-manager';

const ViewSourceActivity: React.SFC<ActivityWindowProps> = props => (
    <div className="view-source">
        <p>
            Check out the repositories for the projects that are showcased here.
        </p>
        <ul>
            {
                props.availableActivities
                    .filter(x => x.attributes && x.attributes['source-url'])
                    .map((x, i) => (
                        <li key={ i }><a href={ x.attributes['source-url'] }>{ x.title }</a></li>
                    ))
            }
            <li><a href="https://github.com/cloughney/clcom-new">ChrisLoughney.com</a></li>
        </ul>
    </div>
);

export default ViewSourceActivity;
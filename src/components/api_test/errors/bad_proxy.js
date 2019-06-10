import React from 'react';

export default ({example}) => (
    <div className="help">
        <ol>
            <li>In the <code>package.json</code> file you should have a proxy property that looks like:
                <pre>{example}</pre>
            </li>
            <li>If you do not see the proxy config in the <code>package.json</code> file then add it
                <ul>
                    <li><strong>NOTE:</strong> Your port number may be different, set the port number to whatever port YOUR Apache server is running on</li>
                </ul>
            </li>
            <li>If the proxy config was in your <code>package.json</code> make sure it matches the above example, but with your port number. Also make sure it is not nested inside one of the other properties.</li>
            <li>After making changes to the <code>package.json</code> file you will need to restart the Node Dev Server
                <ol>
                    <li>In your terminal press <code>ctrl + c</code> on the keyboard to stop the server</li>
                    <li>Then run the command to start the server again: <code>npm start</code></li>
                </ol>
            </li>
            <li>If the above steps didn't fix your problem, reach out to an instructor</li>
        </ol>
    </div>
);

import React from 'react';

export default ({example}) => (
    <div className="help">
        <ol>
            <li>Is your Apache server running?
                                    <ul>
                    <li>You should have started an Apache server using MAMP, XAMMP, Docker, or something similar</li>
                </ul>
            </li>
            <li>If your Apache server is running, verify what port it is running on, then check the proxy settings in the <code>package.json</code> file
                                    <ul>
                    <li>
                        <div>Here is what the proxy object looks like:</div>
                        <pre>{example}</pre>
                    </li>
                    <li>The port number that you see in the <code>package.json</code> file proxy settings ("target": "http://localhost:<mark>8000</mark>") must be the same as the port your Apache server is running on</li>
                    <li>If your port numbers do not match do ONE of the following:
                                            <ol>
                            <li>Change the port your Apache server is running on to match the port number in the <code>package.json</code> proxy config</li>
                            <li>If you don't want to or can't change your Apache port then change the port number in the <code>package.json</code> proxy config. If you change the <code>package.json</code> file you must restart the Node Dev Server:
                                                    <ol>
                                    <li>In your terminal press <code>ctrl + c</code> on the keyboard to stop the server</li>
                                    <li>Then run the command to start the server again: <code>npm start</code></li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ul>
            </li>
            <li>If neither of the above options fixed your issue, reach out to an instructor</li>
        </ol>
    </div>
);

import React from 'react';

export default props => (
    <div className="help">
        <ol>
            <li>Your document root is not correct. In your Apache config, change the document root to the <code>public</code> folder of this project</li>
            <li>Depending on what you are using for your Apache server will determine how you change the document root. If you are unable to figure it out, reach out to an instructor</li>
            <li>If the above steps didn't fix your problem, reach out to an instructor</li>
        </ol>
    </div>
);

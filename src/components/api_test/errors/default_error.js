import React from 'react';

export default ({error}) => (
    <div className="help">
        <ol>
            <li>An unknown error ocurred:
                <pre className="error">
                    {error.message}
                </pre>
            </li>
            <li>Reach out to an instructor for help</li>
        </ol>
    </div>
);

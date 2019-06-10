import React, { Fragment } from 'react';

export default ({ goToBrowse }) => {
    return (
        <div id="empty-homepage-container">
            <div className="link-container valign-wrapper">
                <div className="row">
                    <i id="symbol" onClick={goToBrowse} className="material-icons center col s12">add_circle</i>
                    <p className="content-text main-text col s12" onClick={goToBrowse}>Click Here To Add Teams To Your Home Page</p>
                </div>
            </div>
        </div>
    )
}
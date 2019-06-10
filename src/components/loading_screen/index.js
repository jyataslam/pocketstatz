import React from "react";
import LoadingImage from "../../../public/dist/assets/images/loading_images/dark-theme-loading.gif";
import './loading_screen.scss';

export default props => {
    return (
        <div className="loading-wrapper-container">
            <div className="loading-image-container">
                <div className="loading-image">
                    <img src={LoadingImage} alt="loading_image" />
                </div>
            </div>
        </div>
    );
}
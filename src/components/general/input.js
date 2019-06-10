import React from "react";

export default props => {
    const {input, id, label, meta: {error, touched}, type = "text"} = props;
    const errorText = {"fontSize": "1rem"};
    
    return(
        <div className="input-field">
            <input {...input} id={id} type={type}/>
            <label htmlFor={id}>{label}</label>
            <p style={errorText} className="red-text text-darken-2">{touched && error}</p>
        </div>
    );
}
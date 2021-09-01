import React, { Component } from 'react';



function Button({ onClick, className = "", children }) {

    return (
        <button
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    )
}


export default Button;
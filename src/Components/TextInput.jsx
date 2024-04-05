import React from 'react';
import './Input.css';


const Input = ({ type = ['text','email', "password"], placeholder = '', value, onChange, size, shape }) => {

    const inputClassName = () => {
        let className = 'input';
        if (size) {
            className += ` input-${size}`;
        }
        if (shape) {
            className += ` input-${shape}`;
        }
        return className;
    };
    const handleInputChange = (event) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            className={inputClassName()}
        />
    );
};

export default Input;
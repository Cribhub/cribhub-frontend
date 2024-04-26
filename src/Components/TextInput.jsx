import React from 'react';
import './Input.css';
import * as PropTypes from 'prop-types'

class Input extends React.Component {
    render() {
        let { type, placeholder, value, onChange, size, shape, color } = this.props

        const inputClassName = () => {
            let className = 'input'
            if (size) {
                className += ` input-${size}`
            }
            if (shape) {
                className += ` input-${shape}`
            }
            return className
        }
        const handleInputChange = (event) => {
            if (onChange) {
                onChange(event.target.value)
            }
        }

        const inputStyle = {
            color: color || 'black' // Default to black if color prop is not provided
        };

        return (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                className={inputClassName()}
                style= {inputStyle}
            />
        )
    }
}

Input.propTypes = {
    type: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.any,
    size: PropTypes.any,
    shape: PropTypes.any,
    color: PropTypes.string
}

Input.defaultProps = {type: ['text', 'email', "password"], placeholder: ''}

export default Input;
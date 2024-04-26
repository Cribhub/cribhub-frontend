import React from 'react';
import './Input.css';
import * as PropTypes from 'prop-types'

class Input extends React.Component {
    render() {
        let { type, placeholder, value, onChange, size, shape } = this.props

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
        return (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                className={inputClassName()}
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
    shape: PropTypes.any
}

Input.defaultProps = {type: ['text', 'email', "password"], placeholder: ''}

export default Input;
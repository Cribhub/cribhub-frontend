import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const CustomButton = ({ text, onClick, className, outlineColor, ...props }) => {


    return (
        <Button
            className={className}
            onClick={onClick}
            style={{
                border: `1px solid ${outlineColor}`, // Set border color
                backgroundColor: '#a6cba4', // Set background color to transparent
                color: outlineColor, // Set text color to outline color
                transition: 'background-color 0.3s', // Add transition for smoother hover effect
            }}
            {...props}
        >
            {text}
        </Button>
    );
};

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'error', 'inherit']),
    fillColor: PropTypes.string,
    outlineColor: PropTypes.string,
};

CustomButton.defaultProps = {
    onClick: () => {},
    className: '',
    color: 'third',
};

export default CustomButton;


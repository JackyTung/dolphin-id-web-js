import PropTypes from 'prop-types'
import React from 'react';

function Image(props) {
    return (
        <img 
            src={props.src}
            width='100%' 
            alt='dolphin'
        />
    )
}

Image.propTypes = {
    src: PropTypes.string,
}

export default Image

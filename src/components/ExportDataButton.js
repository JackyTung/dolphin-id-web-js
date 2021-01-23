import PropTypes from 'prop-types'
import React from 'react';

function ExportDataButton(props) {
    return (
        <button 
            name='export_data_begin'
            onClick={props.exportDataBegin}
        >
        Export Regions Data
        </button>    
    )
}

ExportDataButton.propTypes = {
    exportDataBegin: PropTypes.func,
}

export default ExportDataButton
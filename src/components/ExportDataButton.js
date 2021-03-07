import React from "react"
import PropTypes from "prop-types"

function ExportDataButton(props) {
  return (
    <button name="export_data_begin" onClick={props.exportDataBegin}>
      Export Regions Data
    </button>
  )
}

ExportDataButton.propTypes = {
  exportDataBegin: PropTypes.func,
}

export default ExportDataButton

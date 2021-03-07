import React from "react"
import PropTypes from "prop-types"

import ConnectedRegionRow from "../containers/ConnectedRegionRow"

import RegionHeader from "./RegionHeader"
import RegionRow from "./RegionRow"

function RegionTable(props) {
  const tableId = "TestTableId"

  if (props.regions.length > 0) {
    return (
      <table id={tableId}>
        <RegionHeader />
        <tbody>
          {props.regions.map((region, index) => (
            <ConnectedRegionRow key={index} region={region} />
          ))}
        </tbody>
      </table>
    )
  } else {
    return (
      <table id={tableId}>
        <RegionHeader />
      </table>
    )
  }
}

RegionTable.propTypes = {
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      data: PropTypes.object,
    })
  ),
}

export default RegionTable

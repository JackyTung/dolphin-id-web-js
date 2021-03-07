import React, { Component } from "react"
import { PropTypes } from "prop-types"

import style from "./style"

function Region(props) {
  const localStyle = {
    width: props.width + "%",
    height: props.height + "%",
    left: props.x + "%",
    top: props.y + "%",
  }

  let corners = null
  if (props.handles) {
    corners = (
      <div>
        <div data-dir="se" style={style.RegionHandleSE} />
        <div data-dir="sw" style={style.RegionHandleSW} />
        <div data-dir="nw" style={style.RegionHandleNW} />
        <div data-dir="ne" style={style.RegionHandleNE} />
      </div>
    )
  }

  return (
    <div
      style={Object.assign(
        {},
        style.Region,
        localStyle,
        props.customStyle,
        props.data.regionStyle
      )}
      onMouseDown={props.onCropStart}
      onTouchStart={props.onCropStart}
      data-wrapper="wrapper"
    >
      {corners}
    </div>
  )
}

// function renderCornerHandles() {
// 	return (
// 		<div>
// 			<div data-dir='se' style={style.RegionHandleSE} />
// 			<div data-dir='sw' style={style.RegionHandleSW} />
// 			<div data-dir='nw' style={style.RegionHandleNW} />
// 			<div data-dir='ne' style={style.RegionHandleNE} />
// 		</div>
// 	);
// }

Region.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onCropStart: PropTypes.func.isRequired,
  handles: PropTypes.bool,
  changing: PropTypes.bool,
  dataRenderer: PropTypes.func,
  data: PropTypes.object,
  customStyle: PropTypes.object,
}

export default Region

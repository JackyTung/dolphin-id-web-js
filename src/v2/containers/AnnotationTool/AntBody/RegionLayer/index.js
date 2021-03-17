import React from "react"
import { Rect } from "react-konva"
import { useSelector } from "react-redux"

const RegionLayer = () => {
  const boxes = useSelector((state) => state.box.boxes)

  return Object.keys(boxes).map((key) => {
    console.log(key, boxes[key])
    const {
      id,
      rect: { x, y, width, height },
    } = boxes[key]
    return (
      <Rect
        key={id}
        x={x}
        y={y}
        width={width}
        height={height}
        fill="transparent"
        stroke="black"
      />
    )
  })
}

export default RegionLayer

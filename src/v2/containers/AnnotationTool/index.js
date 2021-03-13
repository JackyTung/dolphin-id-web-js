import React from "react"

import AntBody from "./AntBody"
import PreviewImages from "./PreviewImages"

const AnnotationTool = () => {
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <div style={{ width: "25%", height: "600px", overflow: "scroll" }}>
        <PreviewImages />
      </div>
      <div style={{ width: "75%" }}>
        <AntBody />
      </div>
    </div>
  )
}

export default AnnotationTool

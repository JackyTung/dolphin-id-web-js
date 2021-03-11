import React from "react"

import PreviewImages from "./PreviewImages"

const AnnotationTool = () => {
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <div style={{ width: "25%" }}>
        <PreviewImages />
      </div>
      <div style={{ width: "75%" }}>This is Annotation Tool</div>
    </div>
  )
}

export default AnnotationTool

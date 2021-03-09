import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const FolderGetter = () => {
  const [imgPath, setImgPath] = useState("")
  const handleClick = () => {
    console.log("getter")
  }
  const handleChange = (e) => {
    setImgPath(e.target.value)
  }
  return (
    <div>
      <TextField
        id="image-folder-path"
        value={imgPath}
        required
        label="Required"
        onChange={handleChange}
        variant="outlined"
      />
      <Button onClick={handleClick} variant="contained">
        Get
      </Button>
    </div>
  )
}

export default FolderGetter

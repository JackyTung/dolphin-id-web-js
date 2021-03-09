import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

import { fetchFileSystemList } from "../../redux/fileSystem/slice"

const useStyles = makeStyles((theme) => ({
  getterSection: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    marginTop: "15px",
  },

  input: {
    marginRight: "10px",
  },
}))

const FolderGetter = () => {
  const [rootFolder, setRootFolder] = useState("")
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(fetchFileSystemList({ rootFolder }))
  }
  const handleChange = (e) => {
    setRootFolder(e.target.value)
  }
  return (
    <div className={classes.getterSection}>
      <TextField
        id="image-folder-path"
        className={classes.input}
        value={rootFolder}
        required
        label="Folder Path"
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

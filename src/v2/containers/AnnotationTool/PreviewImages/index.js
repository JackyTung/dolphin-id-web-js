import React from "react"
import { useSelector } from "react-redux"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { nanoid } from "nanoid"

const useStyles = makeStyles((theme) => ({
  preview: {
    cursor: "pointer",
    borderRadius: "10px",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
}))

const PreviewImages = () => {
  const classes = useStyles()
  const isLoading = useSelector((state) => state.fileSystem.isLoading)
  const fileContents = useSelector((state) => state.fileSystem.fileContents)

  if (isLoading) {
    return null
  }

  const handleClick = (file) => () => {
    console.log("select", file)
  }

  // NOTE: 不建議使用 nanoid()當作key, 正確使用方式應該是每個file都要有自己的獨立Id
  return (
    <Grid container spacing={1}>
      {fileContents.map((file) => (
        <Grid item key={nanoid()}>
          <img
            className={classes.preview}
            onClick={handleClick(file)}
            src={file}
            alt="dolphin"
            style={{
              width: "120px",
              height: "120px",
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default PreviewImages

/*
  return (
    <div>
      This is PreviewImages
      {fileContents.map((file) => (
        <div
          key={nanoid()}
          style={{
            width: "50px",
            height: "50px",
            backgroundImage: `url(${testFile})`,
            backgroundColor: "red",
          }}
        />
      ))}
    </div>
*/

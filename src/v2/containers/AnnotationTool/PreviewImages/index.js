import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import { nanoid } from "nanoid"
import { imageSetPath } from "v2/redux/image/slice"

const useStyles = makeStyles((theme) => ({
  preview: {
    cursor: "pointer",
    borderRadius: "10px",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },

  border: {
    border: "1px solid red",
  },
}))

const PreviewImages = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.fileSystem.isLoading)
  const fileContents = useSelector((state) => state.fileSystem.fileContents)
  const selectedPath = useSelector((state) => state.image.path)

  if (isLoading) {
    return null
  }

  const handleClick = (path) => () => {
    dispatch(imageSetPath({ path }))
  }

  // NOTE: 不建議使用 nanoid()當作key, 正確使用方式應該是每個file都要有自己的獨立Id
  // TODO: 處理render效能
  return (
    <Grid container spacing={1}>
      {fileContents.map((path) => (
        <Grid item key={nanoid()}>
          <img
            className={classNames(
              classes.preview,
              path === selectedPath && classes.border
            )}
            onClick={handleClick(path)}
            src={path}
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

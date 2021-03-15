import React, { useEffect } from "react"
import { Group, Layer, Stage } from "react-konva"
import { useDispatch } from "react-redux"
import { Provider } from "react-redux"
import { useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import useImage from "use-image"
import { DEFAULT_STAGE_HEIGHT, DEFAULT_STAGE_WIDTH } from "v2/constant"
//import RegionLayer from "./RegionLayer"
import { store } from "v2/containers/App"
import { imageSetMeta } from "v2/redux/image/slice"

import ImageLayer from "./ImageLayer"

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#006994", // ocean blue
    width: DEFAULT_STAGE_WIDTH,
    height: DEFAULT_STAGE_HEIGHT,
  },
}))

const AntBody = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const path = useSelector((state) => state.image.path)
  const [image] = useImage(path)

  useEffect(() => {
    if (image && path) {
      dispatch(imageSetMeta({ source: image }))
    }
  }, [dispatch, image, path])

  const handleMouseDown = () => {}
  const handleMouseUp = () => {}
  const handleMouseMove = () => {
    console.log("hi")
  }

  return (
    <div>
      <Stage
        className={classes.root}
        name="name"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={DEFAULT_STAGE_WIDTH}
        height={DEFAULT_STAGE_HEIGHT}
      >
        <Provider store={store}>
          <Layer>
            <Group>
              <ImageLayer />
            </Group>
          </Layer>
        </Provider>
      </Stage>
    </div>
  )
}

export default AntBody

import React, { useEffect } from "react"
import { Group, Layer, Stage } from "react-konva"
import { useDispatch } from "react-redux"
import { Provider } from "react-redux"
import { useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import useImage from "use-image"
import { DEFAULT_STAGE_HEIGHT, DEFAULT_STAGE_WIDTH } from "v2/constant"
import { store } from "v2/containers/App"
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "v2/redux/event/slice"
import { imageClearMeta, imageSetMeta } from "v2/redux/image/slice"

import ImageLayer from "./ImageLayer"
import RegionLayer from "./RegionLayer"

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "black", // ocean blue #006994
    width: DEFAULT_STAGE_WIDTH,
    height: DEFAULT_STAGE_HEIGHT,
  },
}))

const AntBody = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const path = useSelector((state) => state.image.path)
  const antMeta = useSelector((state) => state.image.antMeta)
  const [image] = useImage(path)

  const { layer } = antMeta

  useEffect(() => {
    if (image && path) {
      dispatch(imageSetMeta({ source: image }))
    }

    return () => {
      dispatch(imageClearMeta())
    }
  }, [dispatch, image, path])

  const onMouseDown = (event) => {
    dispatch(handleMouseDown({ event }))
  }
  const onMouseUp = (event) => {
    dispatch(handleMouseUp({ event }))
  }
  const onMouseMove = (event) => {
    dispatch(handleMouseMove({ event }))
  }

  if (!image) {
    return <div>This is annotation tool</div>
  }

  return (
    <div>
      <Stage
        className={classes.root}
        name="name"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        width={DEFAULT_STAGE_WIDTH}
        height={DEFAULT_STAGE_HEIGHT}
      >
        <Provider store={store}>
          <Layer x={layer.x} y={layer.y}>
            <Group>
              <ImageLayer />
            </Group>
          </Layer>
          <Layer x={layer.x} y={layer.y}>
            <Group>
              <RegionLayer />
            </Group>
          </Layer>
        </Provider>
      </Stage>
    </div>
  )
}

export default AntBody

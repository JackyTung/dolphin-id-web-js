import React from "react"
import { Image } from "react-konva"
import { useSelector } from "react-redux"
import useImage from "use-image"
//import { imageSetMeta } from "v2/redux/image/slice"

/*
const ImageLayer = () => {
  const dispatch = useDispatch()
  const path = useSelector((state) => state.image.path)
  const imgRef = useRef(null)
  if (!path) {
    return null
  }

  const handleOnLoad = () => {
    dispatch(
      imageSetMeta({
        meta: {
          width: imgRef.current.naturalWidth,
          height: imgRef.current.naturalHeight,
        },
      })
    )
  }

  return (
    <img
      src={path}
      ref={imgRef}
      width="100%"
      alt="antDolphin"
      onLoad={handleOnLoad}
    />
  )
}*/

/*
export const createCanvas = (width, height) => {
  const cv = document.createElement("canvas")
  cv.width = width
  cv.height = height
  const ctx = cv.getContext("2d")
  return [cv, ctx]
}*/

const ImageLayer = () => {
  const source = useSelector((state) => state.image.source)
  const antMeta = useSelector((state) => state.image.antMeta)
  const { imageCanvas } = antMeta

  //const [image] = useImage(path)

  if (!source) {
    return null
  }

  return (
    <Image
      image={source}
      width={imageCanvas.width}
      height={imageCanvas.height}
    />
  )
}

export default ImageLayer

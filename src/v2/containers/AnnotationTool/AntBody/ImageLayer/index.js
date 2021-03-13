import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { imageSetMeta } from "v2/redux/image/slice"

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
}

export default ImageLayer

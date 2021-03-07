import React from "react"
import PropTypes from "prop-types"

function Image(props) {
  const myRef = React.createRef()
  return (
    <img
      src={props.src}
      width="100%"
      alt="dolphin"
      ref={myRef}
      onLoad={() =>
        props.setImageMetaGen(
          myRef.current.naturalWidth,
          myRef.current.naturalHeight
        )
      }
    />
  )
}

Image.propTypes = {
  src: PropTypes.string,
}

export default Image

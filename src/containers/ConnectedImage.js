import { connect } from "react-redux"

import * as actions from "../action"
import Image from "../components/Image"

function mapStateToProps(state) {
  return {
    src: state.fileSystem.imgSrc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setImageMetaGen: (width, height) => {
      const meta = {
        width: width,
        height: height,
      }
      dispatch(actions.setImageMeta(meta))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image)

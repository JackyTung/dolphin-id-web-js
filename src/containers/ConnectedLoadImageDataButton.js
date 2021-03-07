import { connect } from "react-redux"

import * as actions from "../action"
import LoadImageDataButton from "../components/LoadImageDataButton"
import * as utils from "../utils"

function mapStateToProps(state) {
  return {
    image: state.image,
    data: getDataFromAggData(state.image.path, state.aggData),
  }
}

function getDataFromAggData(path, aggData) {
  if (path === undefined) {
    return {
      image: {},
      regions: [],
    }
  }

  const key = utils.getBasename(path)
  if (!(key in aggData)) {
    return {
      image: {},
      regions: [],
    }
  }
  return aggData[key]
}

function mapDispatchToProps(dispatch) {
  return {
    loadDataGen: (image, regions) => {
      return (event) => {
        event.preventDefault()

        dispatch(actions.setImageAll(image))

        dispatch(actions.setRegions(regions))
      }
    },
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const image = Object.assign({}, stateProps.data.data, {
    path: stateProps.image.path,
  })
  return Object.assign({}, ownProps, {
    loadData: dispatchProps.loadDataGen(image, stateProps.data.regions),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(LoadImageDataButton)

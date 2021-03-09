import { connect } from "react-redux"

import AlienRegionSelect from "../components/AlienRegionSelect"
import {
  createRegion,
  moveRegion,
  resizeRegion,
  setRegionStateUnchanged,
} from "../redux/action"

function mapStateToProps(state) {
  return {
    regions: state.regions,
    target: state.target,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createRegion: (x, y, index) => {
      dispatch(createRegion(x, y, index))
    },
    setRegionStateUnchangedDispatch: () => dispatch(setRegionStateUnchanged()),
    moveRegionDispatch: (
      index,
      oldX,
      oldY,
      oldClientPosX,
      oldClientPosY,
      newClientPosX,
      newClientPosY
    ) =>
      dispatch(
        moveRegion(
          index,
          oldX,
          oldY,
          oldClientPosX,
          oldClientPosY,
          newClientPosX,
          newClientPosY
        )
      ),
    resizeRegionDispatch: (
      index,
      resizeCornerDir,
      oppositeCornerX,
      oppositeCornerY,
      clientPosX,
      clientPosY
    ) =>
      dispatch(
        resizeRegion(
          index,
          resizeCornerDir,
          oppositeCornerX,
          oppositeCornerY,
          clientPosX,
          clientPosY
        )
      ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlienRegionSelect)

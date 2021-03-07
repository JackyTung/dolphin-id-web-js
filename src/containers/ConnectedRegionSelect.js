import { connect } from "react-redux"
import RegionSelect from "react-region-select"

import { createRegion, setRegions } from "../action"

function mapStateToProps(state) {
  return {
    regions: state.regions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (regions) => dispatch(setRegions(regions)),
    createRegionDispatch: (x, y) => dispatch(createRegion(x, y)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionSelect)

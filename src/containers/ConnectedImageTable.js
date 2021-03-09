import { connect } from "react-redux"

import ImageTable from "../components/ImageTable"
import * as actions from "../redux/action"

function mapStateToProps(state) {
  return {
    image: state.image,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setImageTripDate: (event) =>
      dispatch(actions.setImageTripDate(event.target.value)),
    setImageTripNumber: (event) =>
      dispatch(actions.setImageTripNumber(event.target.value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTable)

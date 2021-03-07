import { connect } from "react-redux"

import * as actions from "../action"
import ExportDataButton from "../components/ExportDataButton"

function mapStateToProps(state) {
  return {
    rootFolder: state.fileSystem.rootFolder,
    data: state.aggData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    exportDataBeginGen: (folder, data) => {
      return (event) => dispatch(actions.exportDataBegin(folder, data))
    },
  }
}

function mergeProps(stateProps, dispatchProps) {
  return {
    exportDataBegin: dispatchProps.exportDataBeginGen(
      stateProps.rootFolder,
      stateProps.data
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ExportDataButton)

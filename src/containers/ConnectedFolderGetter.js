import { connect } from 'react-redux'
import * as actions from '../action'
import FolderGetter from '../components/FolderGetter'

function mapStateToProps(state) {
    return {
        rootFolder: state.fileSystem.rootFolder,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setRootFolder: (event) => dispatch(actions.setRootFolder(
            event.target.value,
        )),
        sendReqListFolderGen: (folder) => {
            return (event) => dispatch(actions.sendReqListFolder(
                folder,
            ))
        },
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        rootFolder: stateProps.rootFolder,
        setRootFolder: dispatchProps.setRootFolder,
        sendReqListFolder: dispatchProps.sendReqListFolderGen(
            stateProps.rootFolder,
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FolderGetter)
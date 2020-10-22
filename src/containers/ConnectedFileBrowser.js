import { connect } from 'react-redux'
import FileBrowser from '../components/FileBrowser'

function mapStateToProps(state) {
    return {
        fileContents: state.fileSystem.fileContents,
    }
}

export default connect(mapStateToProps, null)(FileBrowser)
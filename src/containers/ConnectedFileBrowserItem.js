import { connect } from 'react-redux'
import * as actions from '../action'
import FileBrowserItem from '../components/FileBrowserItem'

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setImgSrc: (event) => {
            event.preventDefault()
            dispatch(actions.setImgSrc(
                ownProps.path,
            ))
        },
    }
}

export default connect(null, mapDispatchToProps)(FileBrowserItem)

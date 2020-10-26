import { connect } from 'react-redux'
import Image from '../components/Image'

function mapStateToProps(state) {
    return {
        src: state.fileSystem.imgSrc,
    }
}

export default connect(mapStateToProps, null)(Image)
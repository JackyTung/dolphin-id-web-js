import RegionSelect from 'react-region-select'
import { connect } from 'react-redux'
import { setRegions } from '../action'

function mapStateToProps(state) {
    return {
        regions: state.regions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChange: (regions) => dispatch(setRegions(
            regions
        ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionSelect)
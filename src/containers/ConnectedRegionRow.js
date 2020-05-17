import { connect } from 'react-redux'
import { updateTripNumber } from '../action'
import RegionRow from '../components/RegionRow'

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setTripNumber: (event) => dispatch(updateTripNumber(
            event.target.value,
            ownProps.region.data.index
        ))
    }
}

export default connect(null, mapDispatchToProps)(RegionRow)

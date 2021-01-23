import { connect } from 'react-redux'
import * as actions from '../action'
import FileBrowserItem from '../components/FileBrowserItem'

function mapStateToProps(state) {
    console.log(state)
    return {
        imageData: state.image,
        regions: state.regions,
        aggData: state.aggData,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setDataGen: (imageData, regions, newImageData, newRegions) => {
            return (event) => {
                event.preventDefault()
                console.log('aaa')
                // Set img src (for display)
                dispatch(actions.setImgSrc(
                    ownProps.path,
                ))

                // Set path to image data.
                console.log('Own Props Path')
                console.log(ownProps)
                dispatch(actions.setImagePath(
                    ownProps.path,
                ))

                console.log('ccc')
                // Set agg data.
                dispatch(actions.setAggData(
                    imageData,
                    regions,
                ))

//                 // Load corresponding data for new path, which is provided
//                 // by the own props.
//                 dispatch(actions.setImageAll(
//                     newImageData,
//                 ))
//                 dispatch(actions.setRegions(
//                     newRegions,
//                 ))
            }
        }
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const newData = getImageRegionsData(ownProps, stateProps.aggData)
    return Object.assign(
        {},
        ownProps,
        {
            setData: dispatchProps.setDataGen(
                stateProps.imageData,
                stateProps.regions,
                newData.imageData,
                newData.regions,
            )
        },
    )
}

function getBasename(path) {
    return path.split('/').reverse()[0]
}

function getImageRegionsData(ownProps, aggData) {
    if (!ownProps.path || aggData === undefined) {
        return {
            imageData: {},
            regions: [],
        }
    }

    const newKey = getBasename(ownProps.path)
    if (!(newKey in aggData)) {
        return {
            imageData: {},
            regions: [],
        }
    }
    
    const newData = aggData[newKey]
    return {
        imageData: newData.image,
        regions: newData.regions,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FileBrowserItem)

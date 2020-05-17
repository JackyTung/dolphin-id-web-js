import { combineReducers } from 'redux'
import { SET_TRIP_NUMBER } from './action'

const RED = 'rgba(255, 0, 0, 0.5)';
const GREEN = 'rgba(0, 255, 0, 0.5)';
const BLUE = 'rgba(0, 0, 255, 0.5)'; 

const BOX_RED = 'red'
const BOX_BLUE = 'blue'
const BOX_GREEN = 'green'


function setColorWithIndex(regions, color, index) {
    return [
        ...regions.slice(0, index),
        Object.assign({}, regions[index], {color: color}),
        ...regions.slice(index+1)
    ]
}

function setColor(state = [], action) {
    switch (action.type) {
        case BOX_RED:
            return setColorWithIndex(state, RED, action.index)
        case BOX_BLUE:
            return setColorWithIndex(state, BLUE, action.index)
        case BOX_GREEN:
            return setColorWithIndex(state, GREEN, action.index)
        default:
            return state
    }
}

function setRegions(regions = [], action) {
    console.log(action)
    if (regions.length === 0) {
        return regions
    } else {
        let oldRegion = regions[action.index]
        let newRegion = updateRegion(regions[action.index], action)
        console.log('Old Region:' + oldRegion)
        console.log('New Region:' + newRegion)
        return [
            ...regions.slice(0, action.index),
            updateRegion(regions[action.index], action),
            ...regions.slice(action.index)
        ]
    }
}

function updateRegion(region, action) {
    return Object.assign(
        {},
        region,
        {
            'data': updateRegionData(
                region.data,
                action
            )
        }
    )
}

function updateRegionData(data, action) {
    switch (action.type) {
        case SET_TRIP_NUMBER:
            return updateTripNumberData(data, action.num)
        default:
            return data
    }
}

function updateTripNumberData(data, num) {
    return Object.assign(
        {},
        data,
        {
            'trip_num': num
        }
    )
}

export default combineReducers({
    regions: setRegions
})
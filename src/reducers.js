import { combineReducers } from 'redux'
import * as all_actions from './action'
import { SET_TRIP_NUMBER, SET_REGION_IS_CHANGING, CREATE_REGION, RESIZE_REGION, MOVE_REGION, REGION_STATE_UNCHANGED, REGION_STATE_MOVE, REGION_STATE_RESIZE } from './action'
import * as c from './const'

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

function setTarget(target = {}, action) {
    switch (action.type) {
        case all_actions.REGION_STATE_UNCHANGED:
            return {
                index: target.index,
                state: null,
            }
        case all_actions.REGION_STATE_MOVE:
            return {
                index: action.index,
                state: action.type,
                oldX: action.oldX,
                oldY: action.oldY,
                clientPosX: action.clientPosX,
                clientPosY: action.clientPosY,
            }
        case all_actions.REGION_STATE_RESIZE:
            return {
                index: action.index,
                state: action.type,
                resizeCornerDir: action.resizeCornerDir,
                oppositeCornerX: action.oppositeCornerX,
                oppositeCornerY: action.oppositeCornerY,
            }
        case all_actions.CREATE_REGION:
            return {
                index: action.index,
                state: null, 
            }
        case all_actions.DELETE_REGION:
            let new_index
            if (action.index < target.index) {
                new_index = target.index - 1
            } else if (action.index === target.index) {
                new_index = -1
            } else {
                new_index = target.index
            }

            return Object.assign(
                {},
                target,
                {
                    index: new_index,
                }
            )
        default:
            return target
    }
}

function fixDim(oldDim, shift, length) {
    let newDimRaw = oldDim + shift
    console.log('oldDim:' + oldDim + ', newDimRaw:' + newDimRaw)
    if ((newDimRaw + length) >= 100) {
        return 100 - length
    } else if (newDimRaw <= 0) {
        return 0
    } else {
        return newDimRaw
    }
}

function getRectFromOppositeCorners(
    corner1,
    corner2) {
        let x = Math.max(Math.min(corner1.x, corner2.x), 0)
        let y = Math.max(Math.min(corner1.y, corner2.y), 0)
        let lowerRightX = Math.min(Math.max(corner1.x, corner2.x), 100)
        let lowerRightY = Math.min(Math.max(corner1.y, corner2.y), 100)
        return {
            x: x,
            y: y,
            width: lowerRightX - x,
            height: lowerRightY - y,
        }
    }


function setRegions(regions = [], action) {
    console.log(action)
    let region
    let newRegion
    switch (action.type) {
        case CREATE_REGION:
            region = {
    			x: action.x,
    			y: action.y,
    			width: action.width,
                height: action.height,
                index: regions.length,
    			new: true,
    			data: {},
    			isChanging: true
            }
            return [
                ...regions,
                region,
            ]
        case MOVE_REGION:
            let oldRegion = regions[action.index]
            let newX = fixDim(action.oldX, action.newClientPosX - action.oldClientPosX, oldRegion.width)
            let newY = fixDim(action.oldY, action.newClientPosY - action.oldClientPosY, oldRegion.height)
            newRegion = Object.assign(
                {},
                regions[action.index],
                {
                    x: newX,
                    y: newY,
                    width: oldRegion.width,
                    height: oldRegion.height,
                }
            )
            return [
                ...regions.slice(0, action.index),
                newRegion,
                ...regions.slice(action.index+1) 
            ]
        case RESIZE_REGION:
            region = regions[action.index]
            const oppositeCorner = {
                x: action.oppositeCornerX,
                y: action.oppositeCornerY,
            }
            const resizeCorner = {
                x: action.clientPosX,
                y: action.clientPosY,
            }
            let rect = getRectFromOppositeCorners(
                oppositeCorner,
                resizeCorner,
            )
            newRegion = Object.assign(
                {},
                region,
                {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                }
            )
            return [
                ...regions.slice(0, action.index),
                newRegion,
                ...regions.slice(action.index+1) 
            ]
        case all_actions.DELETE_REGION:
            let tailRegions = regions.slice(action.index+1).map((region) => 
                Object.assign(
                    {},
                    region,
                    {
                        'index': region.index - 1,
                    },
                )
            )
            return regions.slice(0, action.index).concat(tailRegions)
        case all_actions.SET_TRIP_DATE:
        case all_actions.SET_TRIP_NUMBER:
        case all_actions.SET_TRIP_ID:
        case all_actions.SET_KU_ID:
            return [
                ...regions.slice(0, action.index),
                updateRegion(regions[action.index], action),
                ...regions.slice(action.index+1)
            ]
        default:
            return regions
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
        case all_actions.SET_TRIP_DATE:
            return updateTripDateData(data, action.date)
        case all_actions.SET_TRIP_NUMBER:
            return updateTripNumberData(data, action.num)
        case all_actions.SET_TRIP_ID: 
            return updateTripIDData(data, action.tripId)
        case all_actions.SET_KU_ID:
            return updateKUIDData(data, action.kuId)
        default:
            return data
    }
}

function updateTripDateData(data, date) {
    return Object.assign(
        {},
        data,
        {
            'tripDate': date,
        }
    )
}

function updateTripNumberData(data, num) {
    return Object.assign(
        {},
        data,
        {
            'tripNum': num
        }
    )
}

function updateTripIDData(data, tripId) {
    return Object.assign(
        {},
        data,
        {
            'tripId': tripId,
        }
    )
}

function updateKUIDData(data, kuId) {
    return Object.assign(
        {},
        data,
        {
            'kuId': kuId,
        }
    )
}

export default combineReducers({
    regions: setRegions,
    target: setTarget,
})
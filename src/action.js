export const SET_TRIP_NUMBER = 'SET_TRIP_NUMBER'
export const SET_REGIONS = 'SET_REGIONS'

export function modifyColor(color, index) {
    return {
        type: 'MODIFY_COLOR',
        color: color,
        index: index,
    }
}

export function updateTripNumber(num, regionIndex) {
    return {
        type: SET_TRIP_NUMBER,
        index: regionIndex,
        num: num
    }
}

export function setRegions(regions) {
    return {
        type: SET_REGIONS,
        regions: regions
    }
}
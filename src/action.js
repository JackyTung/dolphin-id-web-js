export const SET_TRIP_NUMBER = 'SET_TRIP_NUMBER'
export const SET_REGIONS = 'SET_REGIONS'
export const SET_REGION_IS_CHANGING = 'SET_REGION_IS_CHANGING'

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

/**
 * Returns the action to indicate whether the region is changing or not.
 * 
 * @param {*} isChanging Boolean to indicate whether the region is changing or not.
 * @return {type} - An action indicates whether the region is changing or not.
 */
export function setRegionIsChanging(isChanging) {
    return {
        type: SET_REGION_IS_CHANGING,
        isChanging: isChanging
    }
}
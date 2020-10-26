export const SET_TRIP_DATE = 'SET_TRIP_DATE'
export const SET_TRIP_NUMBER = 'SET_TRIP_NUMBER'
export const SET_TRIP_ID = 'SET_TRIP_ID'
export const SET_KU_ID = 'SET_KU_ID'

export const SET_REGIONS = 'SET_REGIONS'
export const SET_REGION_IS_CHANGING = 'SET_REGION_IS_CHANGING'

export const CREATE_REGION = 'CREATE_REGION'
export const RESIZE_REGION = 'RESIZE_REGION'
export const MOVE_REGION = 'MOVE_REGION'
export const DELETE_REGION = 'DELETE_REGION'

export const REGION_STATE_UNCHANGED = 'REGION_STATE_UNCHANGED'
export const REGION_STATE_MOVE = 'REGION_STATE_MOVE'
export const REGION_STATE_RESIZE = 'REGION_STATE_RESIZE'

export const FILESYSTEM_SET_ROOT_FOLDER = 'FILESYSTEM_SET_ROOT_FOLDER'
export const FILESYSTEM_SEND_REQ_LIST_FOLDER = 'FILESYSTEM_SEND_REQ_LIST_FOLDER'
export const FILESYSTEM_SET_IMG_SRC = 'FILESYSTEM_SET_IMG_SRC'

const API_FILESYSTEM = 'http://localhost:5000'

export function createRegion(x, y, index) {
    return {
        type: CREATE_REGION,
        x: x,
        y: y,
        width: 10,
        height: 10,
        index: index,
    }
}

export function setRegionStateUnchanged(index) {
    return {
        type: REGION_STATE_UNCHANGED,
        index: index,
    }
}

export function setRegionStateMove(index, x, y, clientPosX, clientPosY) {
    return {
        type: REGION_STATE_MOVE,
        index: index,
        oldX: x,
        oldY: y,
        clientPosX: clientPosX,
        clientPosY: clientPosY,
    }
}

export function setRegionStateResize(
    index, 
    resizeCornerDir,
    oppositeCornerX,
    oppositeCornerY) {
    return {
        type: REGION_STATE_RESIZE,
        index: index,
        resizeCornerDir: resizeCornerDir,
        oppositeCornerX,
        oppositeCornerY,
    }
}


export function resizeRegion(
    index, 
    resizeCornerDir,
    oppositeCornerX,
    oppositeCornerY,
    clientPosX,
    clientPosY) {
    return {
        type: RESIZE_REGION,
        index: index,
        resizeCornerDir: resizeCornerDir,
        oppositeCornerX,
        oppositeCornerY,
        clientPosX: clientPosX,
        clientPosY: clientPosY,
    }
}

// TODO(alien): Use raw data in action, and leave the computation to reducer.
export function moveRegion(
    index,
    oldX,
    oldY, 
    oldClientPosX, 
    oldClientPosY, 
    newClientPosX, 
    newClientPosY) {
    return {
        type: MOVE_REGION,
        index: index,
        oldX,
        oldY,
        oldClientPosX: oldClientPosX,
        oldClientPosY: oldClientPosY,
        newClientPosX: newClientPosX,
        newClientPosY: newClientPosY,
    }
}

export function deleteRegion(index) {
    return {
        type: DELETE_REGION,
        index: index,
    }
}

export function modifyColor(color, index) {
    return {
        type: 'MODIFY_COLOR',
        color: color,
        index: index,
    }
}

export function setTripDate(date, index) {
    return {
        type: SET_TRIP_DATE,
        index: index,
        date: date,
    }
}

export function setTripNumber(num, index) {
    return {
        type: SET_TRIP_NUMBER,
        index: index,
        num: num,
    }
}

export function setTripID(tripId, index) {
    return {
        type: SET_TRIP_ID,
        index: index,
        tripId: tripId, 
    }
}

export function setKUID(kuId, index) {
    return {
        type: SET_KU_ID,
        index: index,
        kuId: kuId, 
    }
}

export function setRegions(regions) {
    return {
        type: SET_REGIONS,
        regions: regions
    }
}

export function setRootFolder(rootFolder) {
    return {
        type: FILESYSTEM_SET_ROOT_FOLDER,
        rootFolder: rootFolder,
    }
}

export function sendReqListFolder(folder, api = API_FILESYSTEM) {
    return {
        type: FILESYSTEM_SEND_REQ_LIST_FOLDER,
        folder: folder,
        api: api,
    }
}

export function setImgSrc(path, api = API_FILESYSTEM) {
    return {
        type: FILESYSTEM_SET_IMG_SRC,
        path: path,
        api: api,
    }
}
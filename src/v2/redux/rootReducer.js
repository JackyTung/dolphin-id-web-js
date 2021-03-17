import { combineReducers } from "redux"

import box from "./box/slice"
import event from "./event/slice"
import fileSystem from "./fileSystem/slice"
import image from "./image/slice"

export default combineReducers({
  image,
  fileSystem,
  event,
  box,
})

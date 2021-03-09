import { combineReducers } from "redux"

import fileSystem from "./fileSystem/slice"
import image from "./image/slice"

export default combineReducers({
  image,
  fileSystem,
})

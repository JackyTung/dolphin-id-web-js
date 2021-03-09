import { combineEpics } from "redux-observable"

import * as fileSystem from "./fileSystem/epic"
import * as image from "./image/epic"

export default combineEpics(
  ...Object.values({
    ...image,
    ...fileSystem,
  })
)

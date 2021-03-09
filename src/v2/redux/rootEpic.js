import { combineEpics } from "redux-observable"

import * as image from "./image/epic"

export default combineEpics(
  ...Object.values({
    ...image,
  })
)

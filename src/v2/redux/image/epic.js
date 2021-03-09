import { ofType } from "redux-observable"
import { empty } from "rxjs"
import { mergeMap } from "rxjs/operators"

import { imageSetPath } from "./slice"

export const imageSetPathEpic = (action$, state$) =>
  action$.pipe(
    ofType(imageSetPath.type),
    mergeMap((action) => {
      return empty()
    })
  )

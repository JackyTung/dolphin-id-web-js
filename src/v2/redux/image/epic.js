import { combineEpics, ofType } from "redux-observable"
import { empty, Observable, of } from "rxjs"
import { catchError, map, mergeMap, takeUntil } from "rxjs/operators"

import { imageSetPath } from "./slice"

export const imageSetPathEpic = (action$, state$) =>
  action$.pipe(
    ofType(imageSetPath.type),
    mergeMap((action) => {
      return empty()
    })
  )

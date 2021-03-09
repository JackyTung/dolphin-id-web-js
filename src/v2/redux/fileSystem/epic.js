import { ofType } from "redux-observable"
import { map, mergeMap } from "rxjs/operators"

import * as backend from "../../api/backend"

import { fetchFileSystemList, fetchFileSystemListSuccess } from "./slice"

export const fetchFileSystemListEpic = (action$, state$) =>
  action$.pipe(
    ofType(fetchFileSystemList.type),
    mergeMap((action) => {
      const { rootFolder } = action.payload
      return backend.getFiles({ rootFolder }).pipe(
        map((response) => {
          const {
            response: {
              contents: { files },
            },
          } = response
          return fetchFileSystemListSuccess({ fileContents: files })
        })
      )
    })
  )

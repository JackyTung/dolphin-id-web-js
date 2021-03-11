import { ofType } from "redux-observable"
import { map, mergeMap } from "rxjs/operators"
import { DEFAULT_IMG_SRC } from "v2/constant"

import * as backend from "../../api/backend"

import { fetchFileSystemList, fetchFileSystemListSuccess } from "./slice"

export const fetchFileSystemListEpic = (action$) =>
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

          const newFiles = files.map((f) => `${DEFAULT_IMG_SRC}?img_path=${f}`)

          return fetchFileSystemListSuccess({ fileContents: newFiles })
        })
      )
    })
  )

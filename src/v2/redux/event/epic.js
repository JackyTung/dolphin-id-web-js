import { ofType } from "redux-observable"
import { concat, empty, iif, merge, of } from "rxjs"
import {
  buffer,
  debounceTime,
  mergeMap,
  skip,
  take,
  takeUntil,
  takeWhile,
} from "rxjs/operators"
import { addBox, drawBox, resetSelectedId } from "v2/redux/box/slice"

import { handleMouseDown, handleMouseMove, handleMouseUp } from "./slice"

// TODO: handle LabelName
// TODO: handle Tool
export const handleMouseDownEpic = (action$) =>
  action$.pipe(
    ofType(handleMouseDown.type),
    mergeMap((action) => {
      const { event } = action.payload
      const { x, y } = event.target.getStage().getPointerPosition()
      return of(addBox({ labelName: "dolphin", x, y, width: 0, height: 0 }))
    })
  )

export const handleMouseMoveEpic = (action$, state$) =>
  action$.pipe(
    ofType(handleMouseMove.type),
    mergeMap((action) => {
      const selectedId = state$.value.box.selectedId
      const { event } = action.payload
      const { x, y } = event.target.getStage().getPointerPosition()

      console.log("x", x, "y", y)

      if (!selectedId) {
        return empty()
      }
      const currentBox = state$.value.box.boxes[selectedId]
      const { rect } = currentBox

      return of(
        drawBox({
          selectedId,
          rect: {
            x: rect.x,
            y: rect.y,
            width: x - rect.x,
            height: y - rect.y,
          },
        })
      )
    })
  )

export const handleMouseUpEpic = (action$) =>
  action$.pipe(
    ofType(handleMouseUp.type),
    mergeMap(() => {
      return of(resetSelectedId())
    })
  )

import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"

const initialState = {
  selectedId: "",
  boxes: {},
}

const slice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addBox: (state, action) => {
      const newId = nanoid()
      const { labelName, x, y, width, height } = action.payload
      state.selectedId = newId
      state.boxes[newId] = {
        id: newId,
        labelName,
        rect: {
          x,
          y,
          width,
          height,
        },
      }
    },
    drawBox: (state, action) => {
      const { selectedId, rect } = action.payload
      state.boxes[selectedId] = {
        ...state.boxes[selectedId],
        rect: {
          ...state.rect,
          ...rect,
        },
      }
    },
    resetSelectedId: (state) => {
      state.selectedId = ""
    },
  },
})

export const { addBox, drawBox, resetSelectedId } = slice.actions

export default slice.reducer

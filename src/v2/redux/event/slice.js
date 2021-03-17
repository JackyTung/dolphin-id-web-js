import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mousePosition: { x: 0, y: 0 },
}

const slice = createSlice({
  name: "image",
  initialState,
  reducers: {
    handleMouseDown: () => {},
    handleMouseMove: () => {},
    handleMouseUp: () => {},
  },
})

export const { handleMouseDown, handleMouseMove, handleMouseUp } = slice.actions

export default slice.reducer

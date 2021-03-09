import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  path: "",
  meta: "",
  tripDate: "",
  tripNumber: "",
}

const image = createSlice({
  name: "image",
  initialState,
  reducers: {
    imageSetPath: (state, action) => {
      const { path } = action.payload
      state.path = path
    },
    imageSetMeta: (state, action) => {
      const { meta } = action.payload
      state.meta = meta
    },
    imageSetTripDate: (state, action) => {
      const { date } = action.payload
      state.date = date
    },
    imageSetTripNumber: (state, action) => {
      const { number } = action.payload
      state.tripNumber = number
    },
    imageSetAll: (state, action) => {},
  },
})

export const {
  imageSetPath,
  imageSetMeta,
  imageSetTripDate,
  imageSetTripNumber,
  imageSetAll,
} = image.actions

export default image.reducer

/*

什麼時候使用?
  case all_actions.IMAGE_SET_ALL:
    return action.data
*/

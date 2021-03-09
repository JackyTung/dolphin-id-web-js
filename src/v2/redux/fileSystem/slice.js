import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  rootFolder: "",
  imgSrc: "",
  fileContents: [],
}

const fileSystem = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    setRootFolder: (state, action) => {
      const { rootFolder } = action.payload
      state.rootFolder = rootFolder
    },
  },
})

export const { setRootFolder } = fileSystem.actions

export default fileSystem.reducer

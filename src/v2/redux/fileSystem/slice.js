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
    fetchFileSystemList: (state, action) => {
      const { rootFolder } = action.payload
      state.rootFolder = rootFolder
    },
    fetchFileSystemListSuccess: (state, action) => {
      const { fileContents } = action.payload
      state.fileContents = fileContents
    },
  },
})

export const {
  setRootFolder,
  fetchFileSystemList,
  fetchFileSystemListSuccess,
} = fileSystem.actions

export default fileSystem.reducer

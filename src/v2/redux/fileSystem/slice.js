import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  rootFolder: "",
  fileContents: [],
  isLoading: false,
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
      state.isLoading = true
    },
    fetchFileSystemListSuccess: (state, action) => {
      const { fileContents } = action.payload
      state.fileContents = fileContents
      state.isLoading = false
    },
  },
})

export const {
  setRootFolder,
  fetchFileSystemList,
  fetchFileSystemListSuccess,
} = fileSystem.actions

export default fileSystem.reducer

import { createSlice } from "@reduxjs/toolkit"
import { DEFAULT_STAGE_HEIGHT, DEFAULT_STAGE_WIDTH } from "v2/constant"

/*
  labels: [label]
  label: {
    x,
    y,
    width,
    height,
    index,
    new, // ???
    data, // ???
    isChanging,

    labelType, // ex: label, box, mask
    labelName, // ex: 鯨魚種類1, 鯨魚種類2
  }
*/

// TODO: 處理影像寬高比Stage小的case
// imageSource: <img src="xxx" />
const calcAntMeta = (imgSource) => {
  let scale
  const { width: imgWidth, height: imgHeight } = imgSource
  if (imgWidth >= imgHeight) {
    scale = DEFAULT_STAGE_WIDTH / imgWidth

    return {
      imageMeta: { width: imgWidth, height: imgHeight },
      imageCanvas: { width: DEFAULT_STAGE_WIDTH, height: imgHeight * scale },
    }
  } else {
    scale = DEFAULT_STAGE_HEIGHT / imgHeight
    return {
      imageMeta: { width: imgWidth, height: imgHeight },
      imageCanvas: { width: imgWidth * scale, height: DEFAULT_STAGE_HEIGHT },
    }
  }
}

const initialState = {
  path: "",
  antMeta: {
    imageMeta: {
      width: 0,
      height: 0,
    },
    imageCanvas: {
      width: 0,
      height: 0,
    },
    layer: {
      x: 0,
      y: 0,
    },
    scale: 0,
  },
  source: null,
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
      const { source } = action.payload
      const newSource = source || state.source

      state.source = newSource
      state.antMeta = calcAntMeta(newSource)
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
    imageClearMeta: () => initialState,
  },
})

export const {
  imageSetPath,
  imageSetMeta,
  imageSetTripDate,
  imageSetTripNumber,
  imageSetAll,
  imageClearMeta,
} = image.actions

export default image.reducer

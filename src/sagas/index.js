import { all } from "redux-saga/effects"

import exportDataSaga from "./exportDataBeginSaga"
import fetchListFolderSaga from "./fetchListFolderSaga"
import predictRegionsSaga from "./predictRegionsSaga"

function* rootSaga() {
  yield all([fetchListFolderSaga(), exportDataSaga(), predictRegionsSaga()])
}

export default rootSaga

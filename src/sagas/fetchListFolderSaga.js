import { call, put, takeEvery } from "redux-saga/effects"

import * as actions from "../redux/action"

function* fetchListFolder(action) {
  const url = `${action.api}/dir?root_dir=${action.folder}`
  const contents = yield call(() =>
    fetch(url).then((response) => response.json())
  )
  yield put(actions.fetchListFolderSuccess(contents))
}

function* fetchListFolderSaga() {
  yield takeEvery(actions.FILESYSTEM_FETCH_LIST_BEGIN, fetchListFolder)
}

export default fetchListFolderSaga

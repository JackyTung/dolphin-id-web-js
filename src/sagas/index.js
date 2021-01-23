import { all } from 'redux-saga/effects';
import fetchListFolderSaga from './fetchListFolderSaga';
import exportDataSaga from './exportDataBeginSaga'

function* rootSaga() {
    yield all([
        fetchListFolderSaga(),
        exportDataSaga(),
    ]);
}

export default rootSaga;
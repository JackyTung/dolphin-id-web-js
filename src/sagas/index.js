import { all } from 'redux-saga/effects';
import fetchListFolderSaga from './fetchListFolderSaga';
import exportDataSaga from './exportDataBeginSaga'
import predictRegionsSaga from './predictRegionsSaga'

function* rootSaga() {
    yield all([
        fetchListFolderSaga(),
        exportDataSaga(),
        predictRegionsSaga(),
    ]);
}

export default rootSaga;
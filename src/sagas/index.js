import { all } from 'redux-saga/effects';
import fetchListFolderSaga from './fetchListFolderSaga';

function* rootSaga() {
    yield all([
        fetchListFolderSaga(),
    ]);
}

export default rootSaga;
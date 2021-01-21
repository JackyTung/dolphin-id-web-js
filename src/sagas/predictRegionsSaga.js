import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../action'

const projectId = 'dolphin-170615'
const modelId = 'dolphin_id_201910_20191012044136'
const baseImageUrl = 'http://localhost:5000'
const predictUrl = `https://automl.googleapis.com/v1/projects/${projectId}/locations/us-central1/models/${modelId}:predict`

function* predictRegions(action) {
    const imageUrl = `${baseImageUrl}/img?img_path=${action.imgPath}`
    console.log(imageUrl)
    const blob = yield call(
        () => fetch(imageUrl)
            .then(response => response.blob()),
    )
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    const params = genPredictParams(reader.result)
    console.log(predictUrl)
    const payload = yield call(
        () => fetch(predictUrl, params)
            .then(response => response.json()),
    );
    yield put(actions.predictRegionsSuccess(payload));  
}

function genPredictParams(base64Image) {
    return {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ya29.c.Kp0B4geMTvmOOWNehtmuKLyRgeK8r5-9xc8_3EeaCqr-XmOF-Hovv6bSe1mFp9Up9BJITRUA_TNIk8ZM9vTIyTjF1uR47EO2zDSRFSf4dBwYckxMFV6ZBRtiocZbsSORdZ4v4AeqBNfwNXbixXt4AuP59ZheOjsMgXhMMHZsqv9YZP6Q_Ut8BFwhrEzLBAgltH62CQXy0EWcJMaM0kMCEw',
            'Content-Type': 'application/json',
        },
        body: {
            "payload": {
                "image": {
                    "imageBytes": base64Image,
                },
            },
            "params": {
                "scoreThreshold": "0.5",
                "maxBoundingBoxCount": "100",
            },
        },
    }
}

function* predictRegionsSaga() {
    yield takeEvery(actions.REGIONS_PREDICT_BEGIN, predictRegions);
}
  
// export default fetchListFolderSaga;
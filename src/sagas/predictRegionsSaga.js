import { call, put, takeEvery } from "redux-saga/effects"

import * as actions from "../redux/action"
// import * as base64 from 'base-64'

const { PredictionServiceClient } = require("@google-cloud/automl").v1

const projectId = "dolphin-170615"
const location = "us-central1"
const modelId = "IOD5909958562179710976"
const baseImageUrl = "http://localhost:5000"
const predictUrl = `https://automl.googleapis.com/v1/projects/${projectId}/locations/us-central1/models/${modelId}:predict`

// function* predictRegions(action) {
//     const imageUrl = `${baseImageUrl}/img?img_path=${action.imgPath}`
//     console.log(imageUrl)
//     const blob = yield call(
//         () => fetch(imageUrl)
//             .then(response => response.blob()),
//     )
//     const reader = new FileReader()
//     reader.readAsDataURL(blob)
//     const params = genPredictParams(reader.result)
//     console.log(predictUrl)
//     const payload = yield call(
//         () => fetch(predictUrl, params)
//             .then(response => response.json()),
//     );
//     yield put(actions.predictRegionsSuccess(payload));
// }

function* predictRegions(action) {
  //     const imageUrl = `${baseImageUrl}/img?img_path=${action.imgPath}`
  const imageUrl = action.imgPath
  console.log(imageUrl)
  const result = yield call(() =>
    fetch(imageUrl, {
      mode: "cors",
    })
      .then(function (response) {
        return response.arrayBuffer()
      })
      .then(function (buffer) {
        console.log(buffer)
        var formData = new FormData()
        formData.set("content", buffer)
        formData.append("blob", new Blob(["Hello World!\n"]), "test")
        for (var value of formData.values()) {
          console.log(value)
        }
        console.log(formData)
        return fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
          },
          body: formData,
          mode: "cors",
        })
      })
      .then((response) => response.json())
  )
  console.log(result)
  //     console.log(buffer)
  //     console.log(btoa(buffer))

  //     const content = btoa(buffer)
  //     const formData = new FormData()
  //     formData.append('content', buffer)
  //
  //     const result = yield call(
  //         () => fetch('http://localhost:5000/predict', {
  //             method: 'POST',
  //             body: formData,
  //             mode: 'no-cors',
  //         }).then(response => response.json())
  //     )

  //     const client = new PredictionServiceClient();
  //     const request = {
  //       name: client.modelPath(projectId, location, modelId),
  //       payload: {
  //         image: {
  //           imageBytes: content,
  //         },
  //       },
  //       params: {
  //         score_threshold: '0.01',
  //         max_bounding_box_count: '10',
  //       },
  //     };
  //
  //     const [response] = yield call(
  //         () => client.predict(request)
  //     );
  //
  //     for (const annotationPayload of response.payload) {
  //       console.log(`Predicted class name: ${annotationPayload.displayName}`);
  //       console.log(
  //         `Predicted class score: ${annotationPayload.imageObjectDetection.score}`
  //       );
  //       console.log('Normalized vertices:');
  //       for (const vertex of annotationPayload.imageObjectDetection.boundingBox
  //         .normalizedVertices) {
  //         console.log(`\tX: ${vertex.x}, Y: ${vertex.y}`);
  //       }
  //     }
  const payload = {
    regions: result.payload.map((box) => fromGCPBox(box)),
  }
  console.log(payload)

  //     const payload = {
  //         regions: [
  //             {
  //                 x: 10,
  //                 y: 10,
  //                 width: 20,
  //                 height: 30,
  //                 labels: [
  //                     {
  //                         ku_id: 100,
  //                         prob: 0.99,
  //                     },
  //                     {
  //                         trip_id: '20200101_13',
  //                         prob: 0.01
  //                     },
  //                 ]
  //             },
  //             {
  //                 x: 50,
  //                 y: 5,
  //                 width: 10,
  //                 height: 40,
  //                 labels: [
  //                     {
  //                         trip_id: '20050403_22',
  //                         prob: 1.0,
  //                     },
  //                 ]
  //             },
  //             {
  //                 x: 30,
  //                 y: 80,
  //                 width: 50,
  //                 height: 5,
  //                 labels: [
  //                     {
  //                         ku_id: 20,
  //                         trip_id: '20100405_42',
  //                         prob: 0.7,
  //                     },
  //                     {
  //                         ku_id: 11,
  //                         trip_id: '20130405_5',
  //                         prob: 0.2,
  //                     },
  //                     {
  //                         ku_id: 44,
  //                         trip_id: '20160113_24',
  //                         prob: 0.1,
  //                     },
  //                 ]
  //             },
  //         ],
  //     }

  yield put(actions.predictRegionsSuccess(payload))
}

// {
//     annotationSpecId: 5130976564132970496,
//     imageObjectDetection: {
//         boundingBox: {
//             "normalizedVertices": [
//                 {
//                     x: 0.62515473,
//                     y: 0.36490858
//                 },
//                 {
//                     x: 0.71434844,
//                     y: 0.4854888
//                 }
//             ]
//         },
//         score: 0.27356985
//     },
//     displayName: ku_018
// },

// function _arrayBufferToBase64(buffer) {
//     var binary = '';
//     var bytes = new Uint8Array(buffer);
//     var len = bytes.byteLength;
//     for (var i = 0; i < len; i++) {
//         binary += String.fromCharCode(bytes[i]);
//     }
//     return base64.encode(binary);
// }

function fromGCPBox(box) {
  console.log(box)
  const left_upper_point =
    box.imageObjectDetection.boundingBox.normalizedVertices[0]
  const right_lower_point =
    box.imageObjectDetection.boundingBox.normalizedVertices[1]
  return {
    x: left_upper_point.x * 100.0,
    y: left_upper_point.y * 100.0,
    width: (right_lower_point.x - left_upper_point.x) * 100.0,
    height: (right_lower_point.y - left_upper_point.y) * 100.0,
    labels: [toDolphinID(box.displayName, box.imageObjectDetection.score)],
  }
}

function toDolphinID(name, score) {
  if (name.startsWith("ku")) {
    const kuId = parseInt(name.split("_")[1])
    return {
      ku_id: kuId,
      prob: score,
    }
  }

  return {
    trip_id: name,
    prob: score,
  }
}

function genPredictParams(base64Image) {
  return {
    method: "POST",
    headers: {
      Authorization:
        "Bearer ya29.c.Kp0B4geMTvmOOWNehtmuKLyRgeK8r5-9xc8_3EeaCqr-XmOF-Hovv6bSe1mFp9Up9BJITRUA_TNIk8ZM9vTIyTjF1uR47EO2zDSRFSf4dBwYckxMFV6ZBRtiocZbsSORdZ4v4AeqBNfwNXbixXt4AuP59ZheOjsMgXhMMHZsqv9YZP6Q_Ut8BFwhrEzLBAgltH62CQXy0EWcJMaM0kMCEw",
      "Content-Type": "application/json",
    },
    body: {
      payload: {
        image: {
          imageBytes: base64Image,
        },
      },
      params: {
        score_threshold: "0.1",
        max_bounding_box_count: "100",
      },
    },
  }
}

function* predictRegionsSaga() {
  yield takeEvery(actions.REGIONS_PREDICT_BEGIN, predictRegions)
}

export default predictRegionsSaga

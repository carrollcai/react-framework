import * as types from '../constants/types';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import API from '../utils/api.js';


function* getDeom(action) {
  const api = function () {
    return API.getDemo(action.payload).then(res => {
      return res.data;
    });
  }
  const res = yield call(api);

  yield take(types.WAIT_THREE_SEC);

  yield put({
    type: types.DEMO,
    payload: res
  })
}

function* rootSage() {
  yield takeEvery(types.SAGA_DEMO, getDeom);
}

export default rootSage;
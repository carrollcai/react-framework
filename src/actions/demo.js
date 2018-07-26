import * as types from '../constants/types';

const actions = {
  getDemo(id) {
    return {
      type: types.SAGA_DEMO,
      payload: id
    }
  },
  wait3s() {
    return {
      type: types.WAIT_THREE_SEC
    }
  }
};

export default actions;

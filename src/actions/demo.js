import * as types from '../constants/types';
import API from '../utils/api.js';

const actions = {
  getDemo(id) {
    return (dispatch, state) => {
      return API.getDemo(id).then(res => {
        console.log(res.data);
        dispatch({ 
          type: types.DEMO, 
          list: res.data
        });
      });
    };
  }
};

export default actions;

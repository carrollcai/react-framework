import * as types from '../constants/types';

const actions = {
  changeLanguage(val) {
    console.log(val);
    return (dispatch, state) => {
      dispatch({
        type: types.CHANGE_LANGUAGE,
        val
      });
    };
  }
};

export default actions;


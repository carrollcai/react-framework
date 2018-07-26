import * as types from '../constants/types';

const getDemoReducer = (state = [], action) => {
  switch (action.type) {
    case types.DEMO:
      console.log(action.payload.list);
      return {
        list: action.payload.list
      };
    default:
      return state
  }
};

export default getDemoReducer;
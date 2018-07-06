const getDemoReducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case 'DEMO':
      return action.list
    default:
      return state
  }
};

export default getDemoReducer;
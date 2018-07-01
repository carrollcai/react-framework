const getDemoReducer = (state = [], action) => {
  switch (action.type) {
    case 'DEMO':
    console.log(action);
      return action.list
    default:
      return state
  }
};

export default getDemoReducer;
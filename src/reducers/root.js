const initialState = {
  language: ''
}
const getRootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      console.log(action);
      return { language: action.val }
    default:
      return state
  }
};

export default getRootReducer;
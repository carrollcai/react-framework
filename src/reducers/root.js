const initialState = {
  language: 'en'
}
const getRootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return { language: action.val }
    default:
      return state
  }
};

export default getRootReducer;
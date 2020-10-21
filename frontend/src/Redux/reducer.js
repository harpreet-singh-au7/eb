export const initialState = {
  card:[]
};


const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_CARD":
      return {
        ...state,
        item: action.item,
      };
    default:
      return state;
  }
};

export default reducer;

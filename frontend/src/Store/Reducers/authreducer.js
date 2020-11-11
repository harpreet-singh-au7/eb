const initialState = {
  user: [{ name: "harpreet" }],
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CREATE_USER":
      return [
        ...state,
        {
          name: payload.name,
        },
      ];
    default:
      return state;
  }
  return state;
};

export default authReducer;

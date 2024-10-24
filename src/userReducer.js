const userReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_USER":
      return state.map((user) =>
        user.id === action.id ? { ...user, active: !user.active } : user
      );
    case "REMOVE_USER":
      return state.filter((user) => user.id !== action.id);
    case "ADD_USER":
      return [
        ...state,
        { id: state.length + 1, username: action.username, active: false },
      ];
    default:
      throw new Error("Unknown action type");
  }
};

export default userReducer;

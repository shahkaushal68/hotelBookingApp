export const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        loading: true,
        user: null,
        error: "",
      };
    case "LOGIN_SUCCESS":
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case "LOGIN_FAIL":
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

export const authInititalState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };

    case "REGISTER_START":
      return {
        user: null,
        loading: true,
        error: false,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: false,
      };
    case "REGISTER_FAIL":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;

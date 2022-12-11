export const inititalState = {
  destination: undefined,
  dates: [],
  options: {},
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        destination: action.payload.destination,
        dates: action.payload.date,
        options: action.payload.optionData,
      };
    case "RESET_SEARCH":
      return inititalState;
    default:
      return state;
  }
};

export default searchReducer;

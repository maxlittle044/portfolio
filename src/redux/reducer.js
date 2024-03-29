export const InitialState = {
  hamburgerOpen: false,
  headerHeight: 0,
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_MOBILE_MENU":
      return {
        ...state,
        hamburgerOpen: action.payload,
      };
    case "SET_HEADER_HEIGHT":
      return {
        ...state,
        headerHeight: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

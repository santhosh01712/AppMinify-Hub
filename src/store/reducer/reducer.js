//Initial Store with default data
const initialState = {
  loading: false,
  token: null,
  errorMessage: "",
  authenticated: false,
  dashBoardData: [],
  severeError: false,
};

//Reducer funtion
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ATTEMPT":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        errorMessage: "",
        loading: false,
        token: action.token,
        authenticated: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        loading: false,
        authenticated: false,
        errorMessage: action.errorMessage,
      };
    case "LOAD_DATA_START":
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };
    case "LOAD_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        dashBoardData: action.dashBoardData,
      };
    case "LOAD_DATA_FAILED":
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
        severeError: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        loading: false,
        token: null,
        errorMessage: "",
        authenticated: false,
        dashBoardData: [],
        severeError: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

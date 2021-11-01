import axios from "axios";

//This Action checks the user credentials and gets token from firebase
export const tryLogin = (username, password) => {
  return (dispatch) => {
    dispatch(loginAttempt());
    const url = "https://identitytoolkit.googleapis.com/v1/";
    const authData = {
      email: username,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(url, authData)
      .then((res) => {
        dispatch(loginSuccess(res.data.idToken));
        dispatch(loadDashboardData(res.data.idToken));
      })
      .catch((err) => {
        console.log(err.response.data.error);
        dispatch(loginFailed(err.response.data.error.message));
      });
  };
};

export const loginAttempt = () => {
  return {
    type: "LOGIN_ATTEMPT",
  };
};

export const loginSuccess = (token) => {
  return {
    type: "LOGIN_SUCCESS",
    token: token,
  };
};

export const loginFailed = (errorMessage) => {
  return {
    type: "LOGIN_FAILED",
    errorMessage: errorMessage,
  };
};

//Once there is a valid token, this action fetches the Dashboard Data
//from Firebase using the token fetched in the First Step

export const loadDashboardData = (token) => {
  return (dispatch) => {
    const url =
      "https://myproject19aug-default-rtdb.asia-southeast1.firebasedatabase.app/user.json?auth=" +
      token;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        dispatch(loadDataSuccess(res.data));
      })
      .catch((err) => {
        console.log(err.response.data.error);
        dispatch(loadDataFailed(err.response.data.error.message));
      });
  };
};

export const loadDataStart = (dashBoardData) => {
  return {
    type: "LOAD_DATA_START",
    dashBoardData: dashBoardData,
  };
};

export const loadDataSuccess = (dashBoardData) => {
  return {
    type: "LOAD_DATA_SUCCESS",
    dashBoardData: dashBoardData,
  };
};

export const loadDataFailed = (errorMessage) => {
  return {
    type: "LOAD_DATA_FAILED",
    errorMessage: errorMessage,
  };
};

export const logout = (errorMessage) => {
  return {
    type: "LOG_OUT",
  };
};

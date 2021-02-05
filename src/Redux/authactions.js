import axios from "axios";
import * as actiontypes from "./actiontypes";

export const authsuccess = (token, userId) => {
  return {
    type: actiontypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiresIn");
  return {
    type: actiontypes.LOG_OUT,
  };
};
export const authLoading = (loading) => {
  return {
    type: actiontypes.AUTH_LOADING,
    payload: loading,
  };
};
export const authloadingFailed = (errmsg) => {
  return {
    type: actiontypes.AUTH_FAILED,
    payload: errmsg,
  };
};

export const authcheck = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token) {
    dispatch(logout());
  } else {
    const expirytime = new Date(localStorage.getItem("expiresIn"));
    if (expirytime <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authsuccess(token, userId));
    }
  }
};

export const auth = (email, password, mode) => (dispatch) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
}


 const key = "AIzaSyBFGAZvZp36zD5CEgbusZVU06f4RSICTws";

  dispatch(authLoading(true));
  let url = null;
  if (mode === " SIGNUP") {
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  } else {
    url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  axios.post(url + key, authData)
    .then((response) => {
      dispatch(authLoading(false));
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);
      const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('expirationTime', expirationTime);
      dispatch(authsuccess(response.data.idToken, response.data.localId));
    })
    .catch((err) => {
      dispatch(authLoading(false));
      dispatch(authloadingFailed(err.response.data.error.message));
    });
};

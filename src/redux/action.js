import axios from "axios";

import {
  LOGIN,
  LOGIN_FAIL,
  LOG_OUT,
  // LOCAL_HOST,
  GET_COUNTRY,
  GET_STATE_BY_COUNTRY,
  GET_CITIES_BY_STATE,
  CLEAR_STATE,
  SIGN_UP,
  USER_VALID,
  GET_ALL_POST,
  FILTER_DATE_POST,
  GET_SPECIALTIES,
  POST_REGISTER,
  SIGN_UP_PROF,
  VALIDATE_PREMIUM,
  GET_CONVERSATIONS,
  GET_USER_ID,
  GET_MESSAGES,
  GET_CONTRACTS,
  GET_USER_POST_DETAIL,
  GET_USER_DETAIL,
  LOG_IN_GOOGLE,
} from "./ActionTypes";

const axiosConfig = {
  withCredentials: true,
};
//Login & Logout Actions
export function login(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`/userdblogin`, values, axiosConfig);

      const json = await resp.data;
      console.log(json);
      return dispatch({
        type: LOGIN,
        payload: json,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data,
      });
    }
  };
}

export function loginGoogle(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`/userdbloginGoogle`, values, axiosConfig);

      const json = await resp.data;
      console.log(json);
      return dispatch({
        type: LOG_IN_GOOGLE,
        payload: json,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data,
      });
    }
  };
}
export function logOut() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/userdblogout`, axiosConfig);
      const json = await resp.data;
      console.log(json);
      return dispatch({
        type: LOG_OUT,
        payload: json,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: LOG_OUT,
        payload: error,
      });
    }
  };
}

//Register Professional and User
export function signUp(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`/userdbRegistration`, values);
      const json = await resp.data;
      console.log(json);
      return dispatch({
        type: SIGN_UP,
        payload: json,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: SIGN_UP,
        payload: error.response.data,
      });
    }
  };
}

export function userValidationProcess(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/userValidationProcess/${id}`);
      const json = await resp.data;
      return dispatch({
        type: USER_VALID,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function profRegister(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`/profdbregistration`, values);
      const json = await resp.data;
      console.log(json);
      return dispatch({
        type: SIGN_UP_PROF,
        payload: json,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: SIGN_UP_PROF,
        payload: error.response.data,
      });
    }
  };
}

export function getCountry() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/GetCountries`);
      const json = await resp.data;
      return dispatch({
        type: GET_COUNTRY,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function GetStatebyCountry(country) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/GetStatesByCountry/${country}`);
      const json = await resp.data;
      return dispatch({
        type: GET_STATE_BY_COUNTRY,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function GetCitiesByState(state) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/GetCitiesByState/${state}`);
      const json = await resp.data;
      return dispatch({
        type: GET_CITIES_BY_STATE,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Posts

export function getAllPost() {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/infoCardPost`);
      // console.log(response.data)
      return dispatch({
        type: GET_ALL_POST,
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function filterDatePost(datePost) {
  //console.log("ACTIONFILTER:", continente)
  return {
    type: FILTER_DATE_POST,
    payload: datePost,
  };
}

export function getSpecialties(state) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/getspecialty`);
      const json = await resp.data;
      return dispatch({
        type: GET_SPECIALTIES,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postUser(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`/postgenerator`, values);
      const json = await resp.data;

      return dispatch({
        type: POST_REGISTER,
        payload: json,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: POST_REGISTER,
        payload: error.response.data,
      });
    }
  };
}

//Premium or not validation
export function validatePremium(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.put(`/validatePremium`, values);
      const json = await resp.data;
      console.log(json);
      return dispatch({
        type: VALIDATE_PREMIUM,
        payload: json,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: VALIDATE_PREMIUM,
        payload: error.response.data,
      });
    }
  };
}

// These actions are for the chat
export function getConversations(values) {
  return async function (dispatch) {
    const resp = await axios.get(`/conversation/${values}`);
    const json = await resp.data;
    return dispatch({
      type: GET_CONVERSATIONS,
      payload: json,
    });
  };
}

export function getUserId(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/users/${values}`);
      const json = await resp.data;
      return dispatch({
        type: GET_USER_ID,
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMessages(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/allmessage/${values}`);
      const json = await resp.data;
      return dispatch({
        type: GET_MESSAGES,
        payload: json,
      });
    } catch (err) {
      console.log("no hay current chat");
    }
  };
}

export function postMessage(values) {
  return async function (dispatch) {
    try {
      const json = await axios.post(`/message`, values);
      console.log("json del action", json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getContracts(values) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`/getContracts`);
      const json = await resp.data;
      return dispatch({
        type: GET_CONTRACTS,
        payload: json,
      });
    } catch (error) {
      console.log("no hay current chat", error);
    }
  };
}

//User Profile Actions
export function getUserDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`/userProfessionalByID/` + id);
    //console.log("DATA ID:", response)
    return dispatch({
      type: GET_USER_DETAIL,
      payload: response.data,
    });
  };
}

export function getUserPostDetail(id) {
  return async function (dispatch) {
    const response = await axios.get(`/posteosUsersByUserID/` + id);
    //console.log("DATA ID:", response)
    return dispatch({
      type: GET_USER_POST_DETAIL,
      payload: response.data,
    });
  };
}

//Clear an State
export function clear() {
  return function (dispatch) {
    return dispatch({ type: CLEAR_STATE });
  };
}

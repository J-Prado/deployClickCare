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
} from "./ActionTypes";

const axiosConfig = {
  withCredentials: true,
};

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

export function clear() {
  return function (dispatch) {
    return dispatch({ type: CLEAR_STATE });
  };
}

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
      const resp = await axios.get(`/specialty`);
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

export function postRegister(values) {
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

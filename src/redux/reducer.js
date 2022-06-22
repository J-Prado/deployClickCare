import {
  CLEAR_STATE,
  GET_CITIES_BY_STATE,
  GET_COUNTRY,
  GET_STATE_BY_COUNTRY,
  LOGIN,
  LOGIN_FAIL,
  LOG_OUT,
  SIGN_UP,
  USER_VALID,
  GET_ALL_POST,
  FILTER_DATE_POST,
  GET_SPECIALTIES,
  POST_REGISTER,
  SIGN_UP_PROF,
} from "./ActionTypes";

//Initial State Redux
const initialState = {
  userSession: {},
  userRegister: {},
  country: [],
  states: [],
  cities: [],
  valid: {},
  post: [],
  allPost: [],
  specialties: [],
  postRegister: {},
  profRegister: {},
};

//Reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      return {
        ...state,
        userSession: {},
        userRegister: {},
      };

    case LOGIN:
      return {
        ...state,
        userSession: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        userSession: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        userSession: action.payload,
      };

    case SIGN_UP:
      return {
        ...state,
        userRegister: action.payload,
      };

    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };

    case GET_STATE_BY_COUNTRY:
      return {
        ...state,
        states: action.payload,
      };

    case GET_CITIES_BY_STATE:
      return {
        ...state,
        cities: action.payload,
      };
    case USER_VALID:
      return {
        ...state,
        valid: action.payload,
      };

    case GET_ALL_POST:
      return {
        ...state,
        post: action.payload,
        allPost: action.payload,
      };
    case FILTER_DATE_POST:
      const allPost = state.allPost;
      let filterByDate = allPost.filter((e) =>
        e.date_post
          .toLowerCase()
          .includes(action.payload.toString().toLowerCase())
      );
      return {
        ...state,
        post: filterByDate,
      };

    case GET_SPECIALTIES:
      return {
        ...state,
        specialties: action.payload,
      };

    case POST_REGISTER:
      return {
        ...state,
        postRegister: action.payload,
      };

    case SIGN_UP_PROF:
      return {
        ...state,
        profRegister: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

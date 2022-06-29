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
  LOCATION,
  FECHA,
  FILTER_BY_SPEC,
  FORGET_PASSWORD,
  USER_EDITION,
  PROF_EDITION,
  GET_POST_DETAIL_AUCTION,
  GET_AUCTION_PROFESIONAL,
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
  premium: {},
  contracts: [],
  conversations: [],
  user_id: {},
  currentChatMessages: {},
  userPostDetail: [],
  userDetail: [],
  newPassword: "",
  messagesEdition: "",
  postDetailAuctions: [],
  auctionByProfesional: [],
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

    case LOG_IN_GOOGLE:
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
    case GET_AUCTION_PROFESIONAL:
      return {
        ...state,
        auctionByProfesional: action.payload,
      };

    case SIGN_UP_PROF:
      return {
        ...state,
        profRegister: action.payload,
      };

    case VALIDATE_PREMIUM:
      return {
        ...state,
        premium: action.payload,
      };

    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };

    case GET_USER_ID:
      return {
        ...state,
        user_id: action.payload,
      };

    case GET_MESSAGES:
      return {
        ...state,
        currentChatMessages: action.payload,
      };

    case GET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload,
      };
    case GET_USER_POST_DETAIL:
      return {
        ...state,
        userPostDetail: action.payload,
      };
    case GET_POST_DETAIL_AUCTION:
      return {
        ...state,
        postDetailAuctions: action.payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    //FILTER
    case LOCATION:
      let copyLocation = state.copyPost;
      // console.log(copyLocation)
      let filterLocation = [];
      if ("Tu País" === action.payload.location) {
        filterLocation = copyLocation.filter(
          (l) => l.country.name === action.payload.country
        );
        return {
          ...state,
          post: filterLocation,
        };
      }
      if ("Cerca de ti" === action.payload.location) {
        filterLocation = copyLocation.filter(
          (l) => l.city.name === action.payload.city
        ); ///===action.payload.city
        // console.log(filterLocation)
        return {
          ...state,
          post: filterLocation,
        };
      } else {
        filterLocation = copyLocation;
        return {
          ...state,
          post: filterLocation,
        };
      }

    case FECHA:
      let copiaDate = state.allPost;
      const today = new Date();
      const todayMinimo =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        "T00:00:00.000Z";
      const diasMinimo =
        today.getFullYear() +
        "-0" +
        (today.getMonth() + 1) +
        "-" +
        (today.getDate() - 7) +
        "T00:00:00.000Z";
      const mesMinimo =
        today.getFullYear() +
        "-0" +
        today.getMonth() +
        "-" +
        today.getDate() +
        "T00:00:00.000Z";
      // console.log(typeof todayMinimo)
      console.log(todayMinimo);
      let filterDate = [];
      if ("Hoy" === action.payload) {
        filterDate = copiaDate.filter((d) => d.date_post === todayMinimo);
        return {
          ...state,
          post: filterDate,
        };
      }
      if ("Esta Semana" === action.payload) {
        filterDate = copiaDate.filter((d) => d.date_post > diasMinimo);
        return {
          ...state,
          post: filterDate,
        };
      }

      if ("Este Mes" === action.payload) {
        filterDate = copiaDate.filter((d) => d.date_post > mesMinimo);
        return {
          ...state,
          post: filterDate,
        };
      } else {
        filterDate = copiaDate;
        return {
          ...state,
          post: filterDate,
        };
      }
    case FILTER_BY_SPEC:
      let copiaSpeciality = state.allPost;
      const filterSpeciality =
        action.payload === "ALL"
          ? copiaSpeciality
          : copiaSpeciality.filter((s) =>
              s.specialty.specialty.includes(action.payload)
            );
      return {
        ...state,
        post: filterSpeciality,
      };

    case FORGET_PASSWORD:
      return {
        ...state,
        newPassword: action.payload,
      };

    case USER_EDITION:
      return {
        ...state,
        messagesEdition: action.payload,
      };
    case PROF_EDITION:
      return {
        ...state,
        messagesEdition: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;

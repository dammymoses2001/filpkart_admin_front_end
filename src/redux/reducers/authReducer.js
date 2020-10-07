import { act } from 'react-dom/test-utils';
import { authConstant } from '../constant';

const intialState = {
  loading: false,
  token: null,
  authenticate: false,
  error: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
};

const LoginReducer = (state = intialState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstant.LOGIN_SUCCESS:
      return {
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        authenticate: true,
      };
    case authConstant.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case authConstant.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstant.LOGOUT_SUCCESS:
      return {
        ...intialState,
      };
    case authConstant.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default LoginReducer;

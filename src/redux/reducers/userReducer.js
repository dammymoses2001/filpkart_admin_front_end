import { userConstant } from '../constant';

const intialState = {
  loading: false,
  message: '',
  error: '',
};

const RegisterReducer = (state = intialState, action) => {
  switch (action.type) {
    case userConstant.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstant.REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case userConstant.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default RegisterReducer;

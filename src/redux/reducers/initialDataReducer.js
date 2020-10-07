import { initialData } from '../constant';

const initialState = {
  loading: false,
  categories: [],
  error: '',
};

const initialDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case initialData.GETALL_INITIALDATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case initialData.GETALL_INITIALDATA_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case initialData.GETALL_INITIALDATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'action.payload',
      };

    default:
      return state;
  }
};

export default initialDataReducer;

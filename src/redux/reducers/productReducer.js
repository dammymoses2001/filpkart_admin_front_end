import { getProduct } from '../constant';

const initialState = {
  loading: false,
  product: [],
  error: '',
};

const productReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case getProduct.GETALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case getProduct.GETALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case getProduct.GETALL_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        err: 'action.payload',
      };

    default:
      return state;
  }
};

export default productReducer;

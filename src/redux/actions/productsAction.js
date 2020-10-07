import { Product } from '../constant';
import axiosInstance from '../helper/axios';

const addProductRequest = () => {
  return {
    type: Product.ADD_PRODUCT_REQUEST,
  };
};

const addProductSuccess = (payload) => {
  return {
    type: Product.ADD_PRODUCT_SUCCESS,
    payload,
  };
};

const addProductFailure = (payload) => {
  return {
    type: Product.ADD_PRODUCT_FAILURE,
    payload,
  };
};

export const productAction = (form) => {
  console.log(form);
  return (dispatch) => {
    axiosInstance
      .post('/api/product/create', form)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

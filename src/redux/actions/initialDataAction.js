import { initialData, getProduct } from '../constant';
import axiosInstance from '../helper/axios';

// const initialDataRequest = () => {
//   return {
//     type: initialData.GETALL_INITIALDATA_REQUEST,
//   };
// };

// // const getAllProductRequest = () => {
// //   return {
// //     type: getProduct.GETALL_PRODUCT_REQUEST,
// //   };
// // };

// const initialDataSuccess = (payload) => {
//   return {
//     type: initialData.GETALL_INITIALDATA_SUCCESS,
//     payload,
//   };
// };

// const initialDataFailure = (payload) => {
//   return {
//     type: initialData.GETALL_INITIALDATA_FAILURE,
//     payload,
//   };
// };

const getAllProductSuccess = (payload) => {
  return {
    type: getProduct.GETALL_PRODUCT_SUCCESS,
    payload,
  };
};

export const initialDataAction = () => {
  return (dispatch) => {
    //dispatch(initialDataRequest());
    axiosInstance
      .post('/api/initialdata')
      .then((response) => {
        console.log(response.data.products);
        dispatch(getAllProductSuccess(response.data.products));
        //initialDataSuccess('response.data');
        // getAllProductSuccess(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

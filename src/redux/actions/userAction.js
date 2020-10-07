import axios from '../helper/axios';
// import axios from 'axios';
import { userConstant } from '../constant';

const RegisterRequest = () => {
  return {
    type: userConstant.REGISTER_REQUEST,
  };
};

const RegisterSuccess = (payload) => {
  return {
    type: userConstant.REGISTER_SUCCESS,
    payload,
  };
};

const RegisterFailure = (payload) => {
  return {
    type: userConstant.REGISTER_FAILURE,
    payload,
  };
};

export const RegisterAction = (user) => {
  return async (dispatch) => {
    console.log(user);
    dispatch(RegisterRequest());
    axios
      .post('api/admin/signup', {
        ...user,
      })
      .then((response) => {
        if (response.data) {
          // const { token, user } = response.data;
          // localStorage.setItem('token', token);
          // localStorage.setItem('user', JSON.stringify(user));
          console.log(response.data);
          dispatch(RegisterSuccess(response.data.message));
        }
      })
      .catch((err) => {
        dispatch(
          RegisterFailure(err.response.data.message || err.response.data.error)
        );
        console.log(err.response.data);
      });
  };
};

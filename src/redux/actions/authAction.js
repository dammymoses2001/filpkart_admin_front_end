import axios from '../helper/axios';
import axiosNew from 'axios';
import { authConstant } from '../constant';

const LoginRequest = () => {
  return {
    type: authConstant.LOGIN_REQUEST,
  };
};
const LoginSuccess = (payload) => {
  return {
    type: authConstant.LOGIN_SUCCESS,
    payload,
  };
};
const LoginFailure = (payload) => {
  return {
    type: authConstant.LOGIN_FAILURE,
    payload,
  };
};

export const loginAction = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch(LoginRequest());
    axios
      .post('api/admin/signin', {
        ...user,
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(LoginSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(LoginFailure(err.response.data));
        console.log(err.response.data);
      });
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = { user, token };
      // console.log(res);
      dispatch(LoginSuccess(res));
    } else {
      dispatch(LoginFailure('user failed to login'));
    }
  };
};

const LogoutRequest = () => {
  return {
    type: authConstant.LOGOUT_REQUEST,
  };
};
const LogoutSuccess = (payload) => {
  return {
    type: authConstant.LOGOUT_SUCCESS,
    payload,
  };
};
const LogoutFailure = (payload) => {
  return {
    type: authConstant.LOGOUT_FAILURE,
    payload,
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch(LogoutRequest());
    // const token = localStorage.getItem('token');
    // axiosNew
    //   .post(
    //     `http://localhost:3000/api/admin/signout`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         // Authorization: 'Bearer' + ' ' + token,
    //       },
    //     }
    //   )
    axios
      .post('/api/admin/signout')
      .then((response) => {
        //console.log(response.data);
        localStorage.clear();
        dispatch(LogoutSuccess(response.data.message));
      })
      .catch((err) => {
        dispatch(LogoutFailure('oops Something went wrong'));
        console.log(err);
      });
  };
};

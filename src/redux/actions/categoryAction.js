import { category } from '../constant';
import axiosInstance from '../helper/axios';

const categoryRequest = () => {
  return {
    type: category.CATEGORY_REQUEST,
  };
};

const categorySuccess = (payload) => {
  return {
    type: category.CATEGORY_SUCCESS,
    payload,
  };
};

const categoryFailure = (payload) => {
  return {
    type: category.CATEGORY_FAILURE,
    payload,
  };
};

export const categoryAction = () => {
  return (dispatch) => {
    dispatch(categoryRequest());
    axiosInstance
      .get('/api/category/getCategories')
      .then((response) => {
        console.log(response.data.data);
        dispatch(categorySuccess(response.data.data));
      })
      .catch((err) => {
        dispatch(categoryFailure(err.data));
        console.log(err.data);
      });
  };
};

//Creat new Category

const addCategoryRequest = () => {
  return {
    type: category.ADD_CATEGORY_REQUEST,
  };
};

const addCategorySuccess = (payload) => {
  return {
    type: category.ADD_CATEGORY_SUCCESS,
    payload,
  };
};

const addCategoryFailure = (payload) => {
  return {
    type: category.ADD_CATEGORY_FAILURE,
    payload,
  };
};

export const addcategoryAction = (form) => {
  return (dispatch) => {
    dispatch(addCategoryRequest());
    axiosInstance
      .post('/api/category/create', form)
      .then((response) => {
        console.log(response.data.data);
        dispatch(addCategorySuccess(response.data.data));
      })
      .catch((err) => {
        dispatch(addCategoryFailure(err.data));
        console.log(err);
      });
  };
};

export const updatecategoryAction = (form) => {
  return async (dispatch) => {
    // dispatch(addCategoryRequest());
    const res = await axiosInstance.post('/api/category/update', form);
    if (res.status === 201) {
      if (res.data) {
        return true;
      }
    }
    if (res.status === 400) {
      if (res.data) {
        console.log(res.data);
        // return true;
      }
    }
  };
};
// export default categoryAction;

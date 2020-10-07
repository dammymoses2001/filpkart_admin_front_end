import { combineReducers } from 'redux';
import LoginReducer from '../reducers/authReducer';
import RegisterReducer from '../reducers/userReducer';
import OrderReducer from '../reducers/orderReducer';
import ProductReducer from '../reducers/productReducer';
import CategoryReducer from '../reducers/categoryReducer';
import initialDataReducer from '../reducers/initialDataReducer';
const rootReducer = combineReducers({
  user: LoginReducer,
  register: RegisterReducer,
  order: OrderReducer,
  product: ProductReducer,
  category: CategoryReducer,
});

export default rootReducer;

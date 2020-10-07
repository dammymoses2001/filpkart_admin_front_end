import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import PrivateRoute from './HOC/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import {
  isUserLoggedIn,
  categoryAction,
  initialDataAction,
} from './redux/actions/';
import Products from './components/Products';
import Orders from './components/Orders';
import Category from './components/Category';
// import Test from './Test';

function App() {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //console.log(auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      dispatch(categoryAction());
      dispatch(initialDataAction());
    }
  }, []);

  return (
    <div className='App'>
      {/* <Route exact path='/test' component={Test} /> */}
      <PrivateRoute exact path='/' component={Home} />
      <PrivateRoute exact path='/products' component={Products} />
      <PrivateRoute exact path='/orders' component={Orders} />
      <PrivateRoute exact path='/category' component={Category} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </div>
  );
}

export default App;

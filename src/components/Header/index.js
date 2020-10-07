import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { signOut } from '../../redux/actions/authAction';

function Header({ signOut, user }) {
  //console.log(user);

  const LogOut = () => {
    signOut();
  };
  const renderLoggInNavLink = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <span
            className='nav-link'
            style={{ cursor: 'pointer' }}
            onClick={LogOut}
          >
            Logout
          </span>
        </li>
      </Nav>
    );
  };

  const renderLoggOutNavLink = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <NavLink to='login' className='nav-link'>
            Login
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='register' className='nav-link'>
            Register
          </NavLink>
        </li>
      </Nav>
    );
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed='top'
        expand='md'
        bg='dark'
        variant='dark'
        style={{ zIndex: 1 }}
      >
        <Container fluid>
          <Link to='/' className='navbar-brand'>
            Admin Dashboard
          </Link>
          {/* <Navbar.Brand href='#home'>Admin Dashboard</Navbar.Brand> */}
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'></Nav>
            {user.authenticate ? renderLoggInNavLink() : renderLoggOutNavLink()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

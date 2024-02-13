import React, { useState, useEffect } from 'react';
//import Link from react router dom
import { Outlet, Link, useNavigate } from "react-router-dom";

import Api from "./api";

//import routes
import Routes from './routes';

function Navbar() {


  //state user
  const [user, setUser] = useState({});

  //define history
  const navigate = useNavigate();

  //token
  const token = localStorage.getItem("token");

  //function "fetchData"
  const fetchData = async () => {
    try {
      if (token) {
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await Api.get('/api/user');
        setUser(response.data);
      } else {
        navigate('/'); // Redirect to login if token is not available
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/'); // Redirect to login if unauthorized
      } else {
        console.error('Error fetching user data:', error);
      }
    }
  };

  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      navigate('/');
    }
    //call function "fetchData"
    fetchData();
  }, []);

  //function logout
  const logoutHanlder = async () => {
    //set axios header dengan type Authorization + Bearer token
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch Rest API
    await Api.post('/api/logout')
      .then(() => {
        //remove token from localStorage
        localStorage.removeItem("token");
        //redirect halaman login
        navigate('/');
      });
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {user.roles === 'admin' && (
                  <li className="nav-item">
                    <Link to="/manage/paket" className="nav-link active" aria-current="page">Paket</Link>
                  </li>
                )}
                {user.roles === 'admin' && (
                  <li className="nav-item">
                    <Link to="/manage/sales" className="nav-link" aria-current="page">Sales</Link>
                  </li>
                )}

                {user.roles === 'admin' && (
                  <li className="nav-item">
                    <Link to="/manage/rekap/customer" className="nav-link" aria-current="page">Rekap Customer</Link>
                  </li>
                )}
                
                {user.roles === 'sales' && (
                  <li className="nav-item">
                    <Link to="/manage/customer" className="nav-link active" aria-current="page">Customer</Link>
                  </li>
                )}

              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
                <li className="nav-item">
                  <button onClick={logoutHanlder} className="btn btn-md btn-primary rounded-sm shadow border-0">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar

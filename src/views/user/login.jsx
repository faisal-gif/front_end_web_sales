import React, { useState, useEffect } from 'react';
//import hook useHitory from react router dom
import { useNavigate } from 'react-router-dom';
import Api from '../../api';


function login() {
  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState([]);

  //define history
  const navigate = useNavigate();

  //hook useEffect
  useEffect(() => {

    //check token
    if (localStorage.getItem('token')) {

      //redirect page dashboard
      navigate('/manage');
    }
  }, []);

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append('email', email);
    formData.append('password', password);

    //send data to server
    await Api.post('/api/login', formData)
      .then((response) => {

        //set token on localStorage
        localStorage.setItem('token', response.data.token);

        //redirect to dashboard
        navigate('/manage');
      })
      .catch((error) => {
        console.log(error);
        //assign error to state "validation"
        setValidation(error.response.data);

      })
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <h4 className="fw-bold pt-4 px-3">HALAMAN LOGIN</h4>
            <hr />
            {
              validation.message && (
                <div className="alert alert-danger mt-2">
                  {validation.message}
                </div>
              )
            }
            <div className="card-body">
              <form onSubmit={loginHandler}>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                  {
                    validation?.email && (
                      <div className="alert alert-danger mt-2">
                        {validation?.email[0]}
                      </div>
                    )
                  }
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Password</label>
                  <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  {
                    validation?.password && (
                      <div className="alert alert-danger mt-2">
                        {validation?.password[0]}
                      </div>
                    )
                  }
                </div>

                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login
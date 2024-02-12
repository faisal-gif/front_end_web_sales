//import useState
import { useState } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

function createSales() {
  //define state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  //state validation
  const [validation, setValidation] = useState([]);

  //useNavigate
  const navigate = useNavigate();

  //method store post
  const storeSales = async (e) => {
    e.preventDefault();

    //init FormData
    const formData = new FormData();

    //append data
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);

    //send data with API
    await api.post('/api/sales', formData)
      .then(() => {

        //redirect to posts index
        navigate('/manage/sales');

      })
      .catch(error => {

        //set errors response to state "errors"
        setValidation(error.response.data);
      })
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <h4 className="fw-bold pt-4 px-3">Tambah Sales</h4>
            <hr />
            {
              validation.message && (
                <div className="alert alert-danger mt-2">
                  {validation.message}
                </div>
              )
            }


            <div className="card-body">
              <form onSubmit={storeSales}>

                <div className="mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                  {
                    validation?.name && (
                      <div className="alert alert-danger mt-2">
                        {validation?.name[0]}
                      </div>
                    )
                  }
                </div>

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
                <div className="mb-3">
                  <label className="form-label fw-bold">Password Confirmation</label>
                  <input type="password" className="form-control" onChange={(e) => setPassword_confirmation(e.target.value)} placeholder="Password" />
                  {
                    validation?.password_confirmation && (
                      <div className="alert alert-danger mt-2">
                        {validation?.password_confirmation[0]}
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

export default createSales
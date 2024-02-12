//import useState
import { useState } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

function createPaket() {

    //define state
    const [nama, setNama] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [harga, setHarga] = useState('');

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //method store post
    const storePaket = async (e) => {
        e.preventDefault();

        //init FormData
        const formData = new FormData();

        //append data
        formData.append('nama', nama);
        formData.append('keterangan', keterangan);
        formData.append('harga', harga);

        //send data with API
        await api.post('/api/paket', formData)
            .then(() => {

                //redirect to posts index
                navigate('/manage/paket');

            })
            .catch(error => {

                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePaket}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Paket</label>
                                    <input type="text" className="form-control" onChange={(e) => setNama(e.target.value)} placeholder="Nama Paket" />
                                    {
                                        errors.nama && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.nama[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Keterangan</label>
                                    <textarea className="form-control" onChange={(e) => setKeterangan(e.target.value)} rows="5" placeholder="Keterangan Paket"></textarea>
                                    {
                                        errors.keterangan && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.keterangan[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Harga</label>
                                    <input type="number" className="form-control" onChange={(e) => setHarga(e.target.value)} placeholder="Harga Paket" />
                                    {
                                        errors.harga && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.harga[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default createPaket
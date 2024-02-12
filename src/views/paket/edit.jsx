//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from '../../api';

export default function PostEdit() {

    //define state
    const [nama, setNama] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [harga, setHarga] = useState('');

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    //method fetchDetailPost
    const fetchDetailPaket = async () => {

        //fetch data
        await api.get(`/api/paket/${id}`)
            .then(response => {

                //assign to state
                setNama(response.data.data.nama);
                setKeterangan(response.data.data.keterangan);
                setHarga(response.data.data.harga);
            })
    }

    //hook useEffect
    useEffect(() => {

        //call method "fetchDetailPost"
        fetchDetailPaket();

    }, []);


    //method update post
    const updatePaket = async (e) => {
        e.preventDefault();

        //init FormData
        const formData = new FormData();

        //append data
        formData.append('nama', nama);
        formData.append('keterangan', keterangan);
        formData.append('harga', harga);
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/paket/${id}`, formData)
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
                            <form onSubmit={updatePaket}>



                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Paket</label>
                                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Paket" />
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
                                    <textarea className="form-control" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} rows="5" placeholder="Keterangan Paket"></textarea>
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
                                    <input type="number" className="form-control" value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="Harga Paket" />
                                    {
                                        errors.harga && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.harga[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
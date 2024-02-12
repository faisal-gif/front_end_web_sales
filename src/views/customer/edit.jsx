//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from '../../api';

export default function PostEdit() {

    const [paket_option, setPaketOption] = useState([]);

    const fetchDataPaketOption = async () => {

        await api.get('/api/paket')
            .then(response => {
                setPaketOption(response.data.data);
            })
    }

    useEffect(() => {
        fetchDataPaketOption();
    }, []);

    //define state
    const [ktp, setKtp] = useState('');
    const [rumah, setRumah] = useState('');
    const [nama, setNama] = useState('');
    const [nomor_telepon, setNomorTlp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [paket, setPaket] = useState('');


    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();


    //destruct ID
    const { id } = useParams();

    //method fetchDetailPost
    const fetchDetailCustomer = async () => {

        //fetch data
        await api.get(`/api/customer/${id}`)
            .then(response => {
                //assign to state
                setNama(response.data.data.nama);
                setNomorTlp(response.data.data.nomor_telepon);
                setAlamat(response.data.data.alamat);
                setPaket(response.data.data.paket_id);
            })
    }

    //hook useEffect
    useEffect(() => {

        //call method "fetchDetailPost"
        fetchDetailCustomer();

    }, []);

    //method handle file change
    const handleFileKtp = (e) => {
        setKtp(e.target.files[0]);
    }

    //method handle file change
    const handleFileRumah = (e) => {
        setRumah(e.target.files[0]);
    }

    //method update post
    const updateCustomer = async (e) => {
        e.preventDefault();

        //init FormData
        const formData = new FormData();

        //append data
        formData.append('foto_ktp', ktp);
        formData.append('foto_rumah', rumah);
        formData.append('nama', nama);
        formData.append('alamat', alamat);
        formData.append('nomor_telepon', nomor_telepon);
        formData.append('paket', paket);
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/customer/${id}`, formData)
            .then(() => {

                //redirect to posts index
                navigate('/customer');

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
                            <form onSubmit={updateCustomer}>


                                <div className="mb-3">
                                    <label className="form-label fw-bold">Foto KTP</label>
                                    <input type="file" onChange={handleFileKtp} className="form-control" />
                                    {
                                        errors.foto_ktp && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.foto_ktp[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Foto Rumah</label>
                                    <input type="file" onChange={handleFileRumah} className="form-control" />
                                    {
                                        errors.foto_rumah && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.foto_rumah[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Customer</label>
                                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Customer" />
                                    {
                                        errors.nama && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.nama[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nomor Telepon</label>
                                    <input type="text" className="form-control" value={nomor_telepon} onChange={(e) => setNomorTlp(e.target.value)} placeholder="Nomor Telepon" />
                                    {
                                        errors.nomor_telepon && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.nomor_telepon[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Alamat</label>
                                    <textarea className="form-control" value={alamat} onChange={(e) => setAlamat(e.target.value)} rows="5" placeholder="Alamat"></textarea>
                                    {
                                        errors.alamat && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.alamat[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Paket</label>
                                    <select className="form-select" onChange={(e) => setPaket(e.target.value)} value={paket}>
                                        <option value="">Pilih Paket</option>
                                        {
                                            paket_option.length > 0
                                                ? paket_option.map((paket_option, index) => (
                                                    <option value={paket_option.id} key={paket_option.id}>{paket_option.nama}</option>
                                                ))

                                                : <option value="">Data Paket Kosong</option>
                                        }
                                    </select>

                                    {errors.paket && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.paket[0]}
                                        </div>
                                    )}

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
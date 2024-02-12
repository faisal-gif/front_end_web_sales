//import useState
import { useState,useEffect } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

function createCustomer() {


    const [user, setUser] = useState({});

    //token
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/api/user');
        setUser(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);


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

    //method handle file change
    const handleFileKtp = (e) => {
        setKtp(e.target.files[0]);
    }

    //method handle file change
    const handleFileRumah = (e) => {
        setRumah(e.target.files[0]);
    }

    //method store post
    const storeCustomer = async (e) => {
        e.preventDefault();

        //init FormData
        const formData = new FormData();

        //append data
        formData.append('user_id', user.id);
        formData.append('foto_ktp', ktp);
        formData.append('foto_rumah', rumah);
        formData.append('nama', nama);
        formData.append('alamat', alamat);
        formData.append('nomor_telepon', nomor_telepon);
        formData.append('paket', paket);

        //send data with API
        await api.post('/api/customer', formData)
            .then(() => {

                //redirect to posts index
                navigate('/manage/customer');

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
                            <form onSubmit={storeCustomer}>
                                
                            <div className="mb-3">
                                    <label className="form-label fw-bold">Foto KTP</label>
                                    <input type="file" onChange={handleFileKtp} className="form-control"/>
                                    {
                                        errors.foto_ktp && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.foto_rumah[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Foto Rumah</label>
                                    <input type="file" onChange={handleFileRumah} className="form-control"/>
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
                                    <input type="text" className="form-control" onChange={(e) => setNama(e.target.value)} placeholder="Nama Customer" />
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
                                    <input type="text" className="form-control" onChange={(e) => setNomorTlp(e.target.value)} placeholder="Nomor Telepon" />
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
                                    <textarea className="form-control" onChange={(e) => setAlamat(e.target.value)} rows="5" placeholder="Alamat"></textarea>
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


                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Simpan</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default createCustomer
import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

function Paket() {

    const [paket, setPaket] = useState([]);

    const fetchDataPaket = async () => {

        await api.get('/api/paket')
            .then(response => {
                setPaket(response.data.data);
            })

    }

    useEffect(() => {

        fetchDataPaket();

    }, []);


     
      const deletePaket = async (id) => {
        
        await api.delete(`/api/paket/${id}`)
            .then(() => {
                
                fetchDataPaket();

            })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                <Link to="/manage/paket/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">Tambah</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Keterangan</th>
                                        <th scope="col">Harga</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paket.length > 0
                                            ? paket.map((paket, index) => (
                                                <tr key={index}>
                                                    <td >{paket.nama}</td>
                                                    <td>{paket.keterangan}</td>
                                                    <td>{paket.harga}</td>
                                                    <td className="text-center">
                                                        <Link to={`/manage/paket/edit/${paket.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deletePaket(paket.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))

                                            : <tr>
                                                <td colSpan="4" className="text-center">
                                                    <div className="mb-0">
                                                        Data Belum Tersedia!
                                                    </div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paket
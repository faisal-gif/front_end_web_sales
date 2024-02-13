import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

function RekapCustomer() {

    const [customer, setCustomer] = useState([]);

    const fetchDataCustomer = async () => {

        await api.get('/api/rekap/customer')
            .then(response => {
                setCustomer(response.data.data);
            })

    }

    useEffect(() => {

        fetchDataCustomer();

    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                      <Link to="/manage/rekapPdf" className="btn btn-md btn-danger rounded shadow border-0 mb-3">PDF</Link>
              <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Sales</th>
                                        <th scope="col" >Nama Customer</th>
                                        <th scope="col" >Paket</th>
                                        <th scope="col" >Harga</th>
                                        <th scope="col" >Alamat</th>
                                        <th scope="col" >Nomor Telepon</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customer.length > 0
                                            ? customer.map((customer, index) => (
                                                <tr key={index}>
                                                    <td >{customer.sales}</td>
                                                    <td>{customer.nama}</td>
                                                    <td>{customer.nama_paket}</td>
                                                    <td>{customer.harga_paket}</td>
                                                    <td>{customer.alamat}</td>
                                                    <td>{customer.nomor_telepon}</td>
                                                </tr>
                                            ))

                                            : <tr>
                                                <td colSpan="6" className="text-center">
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

export default RekapCustomer
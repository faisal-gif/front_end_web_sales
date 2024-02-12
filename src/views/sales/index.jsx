import React from 'react'
import Api from '../../api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sales() {

    const [sales, setSales] = useState([]);

    const fetchDataSales = async () => {

        await Api.get('/api/sales')
            .then(response => {
                setSales(response.data.data);
            })
    }

    useEffect(() => {

        fetchDataSales();

    }, []);


    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/manage/sales/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">Tambah</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Password</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sales.length > 0
                                            ? sales.map((sales, index) => (
                                                <tr key={index}>
                                                    <td >{sales.name}</td>
                                                    <td>{sales.email}</td>
                                                    <td>*********</td>
                                                    <td className="text-center">
                                                        <Link to={`/manage/sales/edit/${sales.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
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

export default Sales
import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

function Customer() {
    
    const [customer, setCustomer] = useState([]);

    const fetchDataCustomer = async () => {

        await api.get('/api/customer')
            .then(response => {
                setCustomer(response.data.data);
            })

    }

    useEffect(() => {

        fetchDataCustomer();

    }, []);

    const deleteCustomer = async (id) => {
        
        await api.delete(`/api/customer/${id}`)
            .then(() => {
                
                fetchDataCustomer();

            })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                <Link to="/manage/customer/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">Tambah</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Nama</th>
                                        <th scope="col" style={{ 'width': '40%' }}>Alamat</th>
                                        <th scope="col" style={{ 'width': '20%' }}>Nomor Telepon</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customer.length > 0
                                            ? customer.map((customer, index) => (
                                                <tr key={index}>
                                                    <td >{customer.nama}</td>
                                                    <td>{customer.alamat}</td>
                                                    <td>{customer.nomor_telepon}</td>
                                                    <td className="text-center">
                                                        <Link to={`/manage/customer/edit/${customer.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deleteCustomer(customer.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
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

export default Customer
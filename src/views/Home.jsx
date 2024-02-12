import React, { useState, useEffect } from 'react';
//import Link from react router dom
import { Outlet, Link, useNavigate } from "react-router-dom";

import Api from '../api';;

function home() {

    const [user, setUser] = useState({});

    //token
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await Api.get('/api/user');
        setUser(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Selamat Datang {user.name}</h1>

            </div>
        </div>
    )
}

export default home
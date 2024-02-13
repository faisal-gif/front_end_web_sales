//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from "../views/Home.jsx";

//import view Paket
import PaketIndex from '../views/paket/index.jsx';
import PaketCreate from '../views/paket/create.jsx';
import PaketEdit from '../views/paket/edit.jsx';

//import view Customer
import CustomerIndex from '../views/customer/index.jsx';
import CustomerCreate from '../views/customer/create.jsx';
import CustomerEdit from '../views/customer/edit.jsx';
import RekapCustomer from "../views/customer/rekap.jsx";
import RekapCustomerPDf from '../pdf/rekapCustomerPDF.jsx';


//import view User
import SalesIndex from "../views/sales/index.jsx";
import SalesCreate from "../views/sales/create.jsx";;
import MyDocument from "../pdf/rekapCustomerPDF.jsx";

//import view User
import LoginForm from '../views/user/login.jsx';
import Navbar from "../Navbar.jsx";


function RoutesIndex() {
    return (
        <Routes>


            {/* route "/user" */}
            <Route path="/" element={<LoginForm />} />

            <Route path="/manage" element={<Navbar />}>
                <Route index path="" element={<Home />} />

                {/* route "/paket" */}
                <Route path="paket" element={<PaketIndex />} />
                <Route path="paket/create" element={<PaketCreate />} />
                <Route path="paket/edit/:id" element={<PaketEdit />} />

                {/* route "/customer" */}
                <Route path="customer" element={<CustomerIndex />} />
                <Route path="customer/create" element={<CustomerCreate />} />
                <Route path="customer/edit/:id" element={<CustomerEdit />} />
                <Route path="rekapPdf" element={<MyDocument />} />


                {/* route "/sales" */}
                <Route path="sales" element={<SalesIndex />} />
                <Route path="sales/create" element={<SalesCreate />} />

                {/* route "/rekap" */}
                <Route path="rekap/customer" element={<RekapCustomer />} />
                <Route path="rekap/customer/pdf" element={<RekapCustomerPDf />} />
            </Route>
        </Routes>
    )
}

export default RoutesIndex
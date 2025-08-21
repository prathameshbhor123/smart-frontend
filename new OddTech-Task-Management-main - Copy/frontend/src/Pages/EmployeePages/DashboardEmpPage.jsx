import React from 'react'
import DashboardEmp from '../../Components/Employee/DashboardEmp'
import Navbar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'

const DashboardEmpPage = () => {
    return (
        <div>
            <Navbar />
            <DashboardEmp />
            <Footer />
            
        </div>
    )
}

export default DashboardEmpPage

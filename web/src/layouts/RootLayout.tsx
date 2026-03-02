import React from 'react'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
    return (
        <>
            <Navbar />
                <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout

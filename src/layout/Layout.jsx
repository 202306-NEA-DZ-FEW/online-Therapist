import * as React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }) {
    // Put Header or Footer around the children element
    // Example
    return (
        <>
            <Navbar />
            <ToastContainer position='top-center' />
            {children}
            <Footer />
        </>
    );

    // return <>{children}</>;
}

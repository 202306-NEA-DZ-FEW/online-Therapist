import * as React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { AppWrapper } from "@/context/context";

export default function Layout({ children }) {
    // Put Header or Footer around the children element
    // Example
    return (
        <>
            <AppWrapper>
                <Navbar />
                {children}
                <Footer />
            </AppWrapper>
        </>
    );

    // return <>{children}</>;
}

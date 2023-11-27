import { motion } from "framer-motion";
import * as React from "react";
import { Slide, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import ChatCard from "@/components/Cards/ChatCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
            >
                <ToastContainer
                    position='top-center'
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    transition={Slide}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    toastClassName='font-medium md:text-lg p-3 space-x-2 w-full'
                />
                {children}
            </motion.div>
            <ChatCard />
            <Footer />
        </>
    );
}

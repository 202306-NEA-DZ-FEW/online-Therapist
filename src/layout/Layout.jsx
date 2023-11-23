import * as React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";
import ChatCard from "@/components/Cards/ChatCard";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <ToastContainer position='top-center' />
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.25 }}
            >
                {children}
            </motion.div>
            <ChatCard />
            <Footer />
        </>
    );
}

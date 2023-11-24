import { motion } from "framer-motion";
import { useRouter } from "next/router";
import * as React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import ChatCard from "@/components/Cards/ChatCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Layout({ children }) {
    const router = useRouter();
    const language = router.locale;
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
                    rtl={language == "ar" && true}
                    position={language == "ar" ? "top-right" : "top-left"}
                    toastClassName='font-semibold md:text-xl p-3 space-x-2 w-full'
                />
                {children}
            </motion.div>
            <ChatCard />
            <Footer />
        </>
    );
}

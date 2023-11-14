import * as React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { motion } from "framer-motion";

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

            {children}
      </motion.div>
            <Footer />
        </>
    );
}

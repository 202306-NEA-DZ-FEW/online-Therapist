import React from "react";

import TicketCard from "@/components/Cards/TicketCard";

import AreYouCouncelor from "./AreYouCouncelor";

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

const TicketsSection = () => {
    const { t } = useTranslation("common");
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        try {
            const response = await fetch("/api/getproducts");
            const data = await response.json();
            setPrices(data);
        } catch (error) {
            console.log("Error fetching prices:", error);
        }
    };

    return (
        <div className='lg:mx-20 md:mx-auto mx-auto p-16'>
            <h2 className='font-atkinson font-bold block text-DarkTeal text-center text-2xl md:text-2xl lg:text-2xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words'>
             {t("tickets.heading1")}
            </h2>
            <p className=' uppercase font-atkinson font-bold text-center text-2xl md:text-2xl lg:text-3xl text-black mt-2'>
            {t("tickets.heading2")}
            </p>
            <div className='grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10 '>
                {prices &&
                    prices.map((price) => (
                        <TicketCard price={price} key={price.id} />
                    ))}
                {/* <TicketCard numberOfTickets={5} price={10} />
                <TicketCard numberOfTickets={25} price={40} />
                <TicketCard numberOfTickets={50} price={70} /> */}
            </div>
            <AreYouCouncelor />
        </div>
    );
};

export default TicketsSection;

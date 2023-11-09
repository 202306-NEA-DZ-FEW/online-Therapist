import React from "react";

import TicketCard from "@/components/Cards/TicketCard";

import AreYouCouncelor from "./AreYouCouncelor";

import { useState, useEffect } from "react"

const TicketsSection = () => {
  
    const [prices, setPrices] = useState([]);

    useEffect(() => {
      fetchPrices();
    }, []);
    
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/getproducts');
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.log('Error fetching prices:', error);
      }
    };
    
    return (
        <div className='container mx-auto p-10'>
            <h2 className='font-normal block text-3xl md:text-4xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words'>
                purchase tickets
            </h2>
            <p className='uppercase text-lg md:text-xl text-black/70 mt-2'>
                purchase tickets that can be used to book appointments!
            </p>
            <div className='grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10 '>
            {prices && prices.map((price) => (
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

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/layout/Layout";
import PaymentCard from "@/components/Cards/PaymentCard";
import Button from "@/components/Button";
import { useState } from "react";
import Thankyou from "@/components/Thankyou/Thankyou";

export default function BuyTickect() {
    const [displayThanks, setDisplayThanks] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleConfirm = () => {
        if (selectedCard) {
            // If a card is selected, render the thank you page
            setDisplayThanks(true);
        } else alert("Please select a card");
    };

    const cards = [
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
        },
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
        },
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
        },
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
        },
    ];
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 3500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Layout>
            {displayThanks ? (
                <Thankyou text1='You purchase has been submitted, you should receive an email with the receipt soon.' />
            ) : (
                // Render the card selection section
                <div className='h-screen m-16 space-y-16'>
                    <div className='ml-10 space-y-4'>
                        <h1 className='font-atkinson text-4xl '>SELECT CARD</h1>
                        <p className='font-atkinson text-xl'>
                            Please select the card you want to buy the tickets
                            with
                        </p>
                    </div>

                    <Slider {...settings} className='p-1 m-1 md:p-5 md:m-5'>
                        {cards.map((card, index) => (
                            <PaymentCard
                                key={index}
                                name={card.name}
                                number={card.number}
                                expDate={card.expDate}
                                selected={selectedCard === card}
                                onClick={() => handleCardClick(card)}
                            />
                        ))}
                    </Slider>

                    <div className='flex flex-col space-y-12 justify-center items-center'>
                        <p className='font-atkinson text-3xl'>
                            Click confirm to use the selected card to purchase 5
                            tickets for 10$
                        </p>
                        <Button
                            transition={true}
                            color='teal'
                            buttonSize='lg'
                            buttonText='CONFIRM'
                            clickFunction={handleConfirm}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
}

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/layout/Layout";
import PaymentCard from "@/components/Cards/PaymentCard";
import Button from "@/components/Button";

export default function BuyTickect() {
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
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
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
        <div  className="h-screen m-16 space-y-16">
            <div className="ml-10 space-y-4">
            <h1 className='font-atkinson text-4xl '>
            SELECT CARD
            </h1>
            <p className="font-atkinson text-xl">Please select the card you want to buy the tickets with</p>
            </div>

            <Slider {...settings} className='p-1 m-1 md:p-5 md:m-5'>
                {cards.map((card, index) => (
                    <PaymentCard
                        key={index}
                        name={card.name}
                        number={card.number}
                        expDate={card.expDate}
                    />
                ))}
            </Slider>

            <div className="flex flex-col space-y-12 justify-center items-center">
            <p className="font-atkinson text-3xl">Click confirm to use the selected card to purchase 5 tickets for 10$</p>
            <Button transition = {false}
    color = "darkteal"
    buttonSize = "lg"
    buttonText="CONFIRM"
    className=""/>
            </div>
        </div>
    </Layout>
  )
}

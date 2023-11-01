import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/layout/Layout";
import PaymentCard from "@/components/Cards/PaymentCard";
import Button from "@/components/elements/Button";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PaymentMethods() {
    const { t } = useTranslation("common");
    const router = useRouter();
    const language = router.locale;

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    const [cards, setCards] = useState([
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
            CardType: "mastercard",
        },
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
            CardType: "visa",
        },
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
            CardType: "mastercard",
        },
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
            CardType: "visa",
        },
        {
            name: "John Doe",
            expDate: "10/24",
            number: "**** **** **** 4242",
            CardType: "visa",
        },
    ]);

    // Function to delete a card
    const handleDeleteCard = (index) => {
        const updatedCards = [...cards];
        updatedCards.splice(index, 1);
        setCards(updatedCards);
    };

    const settings = {
        dots: true,
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
                    dots: true,
                },
            },
        ],
    };
    return (
        <Layout>
            <div className='h-screen m-16 space-y-16'>
                <div className='ml-10 lg:rtl:mr-24 space-y-4'>
                    <h1 className='font-atkinson text-4xl uppercase'>
                        {t("paymentMethods.title")}
                    </h1>
                    <p className='font-atkinson text-xl'>
                        {t("paymentMethods.paragraph")}
                    </p>
                </div>

                <Slider {...settings} className='p-1 m-1 md:p-5 md:m-5'>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className='relative w-[270px] h-[190px] md:w-[280px] md:h-[190px] lg:w-[380px] lg:h-[230px] rounded-2xl flex content-center items-center justify-center'
                        >
                            <PaymentCard
                                name={card.name}
                                number={card.number}
                                expDate={card.expDate}
                                CardType={card.CardType}
                            />
                            <button
                                className='absolute top-[190px] left-[280px] rounded p-1 text-white bg-Teal'
                                onClick={() => handleDeleteCard(index)}
                            >
                                Delete Card
                            </button>
                        </div>
                    ))}
                </Slider>
                <div className='text-center'>
                    <Link href='/'>
                        <Button
                            transition={true}
                            color='teal'
                            buttonSize='xl'
                            buttonText={t("paymentMethods.addButton")}
                        />
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

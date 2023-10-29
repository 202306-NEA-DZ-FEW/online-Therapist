import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/layout/Layout";
import PaymentCard from "@/components/Cards/PaymentCard";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Thankyou from "@/components/Thankyou/Thankyou";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function BuyTickect() {
    const [displayThanks, setDisplayThanks] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const { t } = useTranslation("common");
    const router = useRouter();
    const language = router.locale;

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleConfirm = () => {
        if (selectedCard) {
            // If a card is selected, render the thank you page
            setDisplayThanks(true);
        } else alert(t("buyticket.alertText"));
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
                    dots: true,
                },
            },
        ],
    };
    return (
        <Layout>
            {displayThanks ? (
                <Thankyou text1={t("buyticket.thankstext")} />
            ) : (
                // Render the card selection section
                <div className='h-screen m-16 space-y-16'>
                    <div className='ml-10 lg:rtl:mr-24 space-y-4'>
                        <h1 className='font-atkinson text-4xl '>
                            {t("buyticket.title")}
                        </h1>
                        <p className='font-atkinson text-xl'>
                            {t("buyticket.paragraph1")}
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
                            {t("buyticket.paragraph2")}
                        </p>
                        <Button
                            transition={true}
                            color='teal'
                            buttonSize='xl'
                            buttonText={t("buyticket.button")}
                            clickFunction={handleConfirm}
                        />
                    </div>
                </div>
            )}
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

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
import { db } from "@/util/firebase";
import { UserAuth } from "@/context/AuthContext";
import { doc, deleteDoc } from "firebase/firestore";

export default function PaymentMethods() {
    const { cards, setCards } = UserAuth();
    const { t } = useTranslation("common");
    const router = useRouter();
    const language = router.locale;

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    // Function to delete a card
    const deleteCard = async (cardId) => {
        try {
            await deleteDoc(doc(db, "cards", cardId));
            console.log("Card deleted successfully!");
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    const handleDeleteCard = async (index) => {
        try {
            const cardId = cards[index].id;

            // Delete from Firestore
            await deleteCard(cardId);

            // Remove from React state
            const updatedCards = [...cards];
            updatedCards.splice(index, 1);
            setCards(updatedCards);
        } catch (error) {
            console.error("Error handling card deletion:", error);
        }
    };

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: Math.min(3, cards.length),
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
                    slidesToShow: Math.min(2, cards.length),
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
            <div className='h-[vh] m-16 space-y-16'>
                <div className='ml-10 lg:rtl:mr-24 space-y-4'>
                    <h1 className='font-atkinson text-4xl uppercase'>
                        {t("paymentMethods.title")}
                    </h1>
                    <p className='font-atkinson text-xl'>
                        {t("paymentMethods.paragraph")}
                    </p>
                </div>

                {cards.length > 0 ? ( // Check if there are saved cards
                    <Slider
                        {...settings}
                        className='p-1 m-1 md:p-5 md:m-5 lg:m-16 lg:p-5'
                    >
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className='relative pl-6 md:pl-10 lg:pl-5 w-[270px] h-[190px] md:w-[280px] md:h-[190px] lg:w-[370px] lg:h-[220px] rounded-2xl flex content-center items-center justify-center'
                            >
                                <PaymentCard
                                    name={card.nameOnCard}
                                    number={`**** **** **** ${card.cardNumber.slice(
                                        -4,
                                    )}`}
                                    expDate={card.expiryDate}
                                    // CardType={card.CardType}
                                />
                                <button
                                    className='absolute top-[155px] left-[180px] md:top-[155px] md:left-[210px]  lg:top-[185px] lg:left-[280px] hover:bg-white hover:text-black hover:border-1 font-atkinson hover:border-Teal rounded p-1 px-2 text-white bg-Teal'
                                    onClick={() => handleDeleteCard(index)}
                                >
                                    {t("paymentMethods.deleteButton")}
                                </button>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className='flex justify-center w-1/2 p-4 m-auto rounded-xl border-2 h-44 items-center'>
                        <p className='font-atkinson text-xl items-center text-center'>
                            {" "}
                            {t("paymentMethods.noCardsMessage")}
                        </p>
                    </div>
                )}

                <div className='text-center'>
                    <Link href='/addnewcard'>
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

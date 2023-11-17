import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/layout/Layout";
import PaymentCard from "@/components/Cards/PaymentCard";
import Button from "@/components/elements/Button";
import { useEffect, useState } from "react";
import Thankyou from "@/components/Thankyou/Thankyou";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

export default function BuyTickect() {
    const { cards } = UserAuth();
    const router = useRouter();
    const { priceId } = router.query;
    const [displayThanks, setDisplayThanks] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const { t } = useTranslation("common");
    const language = router.locale;
    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    const [ticketDetails, setTicketDetails] = useState(null);

    useEffect(() => {
        if (priceId) {
            // Fetch ticket details from the API route
            fetch(`/api/getsingleproduct/${priceId}`)
                .then((response) => response.json())
                .then((data) => setTicketDetails(data))
                .catch((error) =>
                    console.error("Error fetching tickets details:", error)
                );
        }
    }, [priceId]);

    if (!ticketDetails) {
        // render a loading indicator while the data is being fetched
        return (
            <div className=' flex h-screen'>
                <div
                    className='animate-spin m-auto inline-block w-16 h-16 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500'
                    role='status'
                    aria-label='loading'
                >
                    <span className=' sr-only'>Loading...</span>
                </div>
            </div>
        );
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleConfirm = () => {
        if (selectedCard) {
            // If a card is selected, render the thank you page
            setDisplayThanks(true);
        } else alert(t("buyticket.alertText"));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId }),
            });
            if (response.ok) {
                const data = await response.json();

                // Redirect to the Stripe Checkout URL
                window.location.href = data.session.url;
            } else {
                console.error("Invalid response from the server:", response);
            }
        } catch (error) {
            console.error("Error creating Stripe session:", error);
        }
    };

    const settings = {
        dots: false,
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
            {displayThanks ? (
                <Thankyou text1={t("buyticket.thankstext")} />
            ) : (
                // Render the card selection section
                <div className='h-vh m-16 space-y-16'>
                    <div className='ml-10 lg:rtl:mr-24 space-y-4'>
                        <h1 className='font-atkinson text-4xl '>
                            {t("buyticket.title")}
                        </h1>
                        <p className='font-atkinson text-xl'>
                            {t("buyticket.paragraph1")}
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
                                    className=' pl-6 md:pl-10 lg:pl-5 w-[270px] h-[190px] md:w-[280px] md:h-[190px] lg:w-[370px] lg:h-[220px] rounded-2xl flex content-center items-center justify-center'
                                >
                                    <PaymentCard
                                        name={card.nameOnCard}
                                        number={`**** **** **** ${card.cardNumber.slice(
                                            -4
                                        )}`}
                                        expDate={card.expiryDate}
                                        // CardType={card.CardType}
                                        selected={selectedCard === card}
                                        onClick={() => handleCardClick(card)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className='flex justify-center w-1/2 p-4 m-auto rounded-xl border-2 h-44 items-center'>
                           
                            <p className='font-atkinson text-xl items-center text-center'>
                                {" "}
                                 {t("buyticket.noCardsMessage")} <br />
                                <Link
                                    href='/addnewcard/'
                                    className='py-2 my-4 px-3 inline-flex items-center gap-x-1 text-lg font-medium rounded-full border border-dashed border-Teal bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                >
                                    <FaPlus />
                                    {t("paymentMethods.addButton")}
                                </Link>
                            </p>
                        </div>
                    )}
                    <div className='flex flex-col space-y-12 justify-center items-center'>
                        <p className='font-atkinson text-3xl'>
                            {t("buyticket.paragraph2")}{" "}
                            <span>{ticketDetails.nickname}</span>{" "}
                            {t("buyticket.tikets")}{" "}
                            <span>
                                {" "}
                                {ticketDetails.unit_amount / 100}{" "}
                                {t("buyticket.dollar")}
                            </span>
                        </p>
                        <Button
                            transition={false}
                            color='teal'
                            buttonSize='xl'
                            buttonText={t("buyticket.button")}
                            clickFunction={handleConfirm}
                        />
                        <p className='font-atkinson text-3xl'>
                            Or click checkout to use Stripe payment
                        </p>
                        <Button
                            transition={false}
                            color='teal'
                            buttonSize='xl'
                            buttonText='CHECKOUT'
                            clickFunction={handleCheckout}
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

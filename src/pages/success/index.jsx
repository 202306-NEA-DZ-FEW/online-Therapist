import React, { useEffect, useState } from "react";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import Button from "@/components/elements/Button";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/util/firebase";

export default function Success() {
    const { t } = useTranslation("common");
    const { user } = UserAuth();
    const router = useRouter();
    const priceId = router.query.price_id;
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

    const handleConfirm = async () => {
        try {
            // Create a reference to the user's document in Firestore
            const userDocRef = doc(collection(db, "tickets"), user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                // If the document exists, update it
                const existingTickets = userDocSnapshot.data().tickets || {};

                // Check if the user has bought this ticket before
                if (priceId in existingTickets) {
                    existingTickets[priceId].quantity += Number(
                        ticketDetails.nickname
                    );
                } else {
                    existingTickets[priceId] = {
                        quantity: Number(ticketDetails.nickname),
                    };
                }

                // Update the document with the modified ticket information
                await updateDoc(userDocRef, {
                    tickets: existingTickets,
                });
            } else {
                await setDoc(userDocRef, {
                    tickets: {
                        [priceId]: {
                            quantity: Number(ticketDetails.nickname),
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error updating user document:", error);
        }
    };

    return (
        <Layout>
            <div className='flex flex-col items-center justify-center font-atkinson space-y-6 lg:flex lg:flex-col lg:justify-start lg:items-start lg:m-16 h-screen'>
                <h1 className='text-4xl font-bold'>
                    {t("signupthank.thankyou")}
                </h1>
                <p className='text-xl mx-6 text-center lg:text-start lg:mx-0'>
                    {t("buyticket.thankstext")}
                </p>
                <Link href='/'>
                    <Button
                        transition={true}
                        buttonSize='lg'
                        buttonText={t("signupthank.button")}
                        clickFunction={handleConfirm}
                    />
                </Link>
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

// export async function handler(req, res) {
// const router = useRouter();
// const { sessionId } = router.query.session_id;
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const session = await stripe.checkout.sessions.listLineItems(
//         sessionId,
//       { limit: 5 },

//     );
//     sessionData = res.json(session.data);
//     return sessionData
// }

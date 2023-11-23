import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { UserAuth } from "@/context/AuthContext";
import { db } from "@/util/firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import TicketsSection from "@/components/Home/TicketsSection";

const patientProfile = () => {
    const { user } = UserAuth();
    const { t } = useTranslation("common");
    const [totalTickets, setTotalTickets] = useState(0);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const userDocRef = doc(collection(db, "users"), user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    const userTickets = userData.tickets || {};

                    // Convert the tickets object into an array
                    const ticketArray = Object.keys(userTickets).map(
                        (ticketId) => ({
                            id: ticketId,
                            quantity: userTickets[ticketId].quantity,
                        })
                    );

                    // Calculate the total quantity
                    const totalQuantity = ticketArray.reduce(
                        (total, ticket) => total + ticket.quantity,
                        0
                    );
                    setTotalTickets(totalQuantity);
                }
            } catch (error) {
                console.error("Error fetching user tickets:", error);
            }
        };

        if (user) {
            fetchTickets();
        }
    }, [user]);

    return (
        <div>
            <h2>total Ticket Quantity</h2>
            <p>{totalTickets}</p>
            <Link href={<TicketsSection />}>buy</Link>
        </div>
    );
};

export default patientProfile;

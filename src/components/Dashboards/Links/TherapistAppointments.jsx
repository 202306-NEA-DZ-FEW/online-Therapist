// ReadyAppointments.js

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";

const TherapistAppointments = ({ therapistId }) => {
    const [readyAppointments, setReadyAppointments] = useState([]);

    const fetchReadyAppointments = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const q = query(
                    collection(db, "appointments"),
                    where("therapistId", "==", user.uid),
                    where("appointmentStatus", "==", "ready")
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const readyAppointmentsData = querySnapshot.docs.map(
                        (doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        })
                    );
                    setReadyAppointments(readyAppointmentsData);
                } else {
                    alert("No booked appointments!");
                }
            }
        });
    };

    useEffect(() => {
        fetchReadyAppointments();
    }, [therapistId]);

    return (
        <div>
            <h2>Appointments List</h2>
            <ul>
                {readyAppointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className='bg-white rounded-xl shadow-xl p-4 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                    >
                        {/* Display appointment details as needed */}
                        <img
                            src={appointment.photoURL}
                            alt={`Photo of ${appointment.userFirstName} ${appointment.userLastName}`}
                            className='w-full h-auto mb-4 rounded-lg'
                        />
                        <p>{`Name: ${appointment.userFirstName} ${appointment.userLastName}`}</p>
                        <p>{`Counseling Type: ${appointment.counselingType}`}</p>
                        <p>
                            {`Session Date: ${appointment.appointmentDate} ${appointment.appointmentTime} ${appointment.appointmentTimeZone}`}{" "}
                        </p>
                        {/* Add other appointment details */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TherapistAppointments;

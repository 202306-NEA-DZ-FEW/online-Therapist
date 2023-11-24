import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
} from "firebase/firestore";
import { auth, db } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
// import { UserAuth } from "@/context/AuthContext";

const PatientAppointments = () => {
    // const { user } = UserAuth();
    const [readyAppointments, setReadyAppointments] = useState([]);

    const fetchReadyAppointments = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch confirmed appointments with status "ready" for the current user
                const appointmentsQuery = query(
                    collection(db, "appointments"),
                    where("uid", "==", user.uid),
                    where("appointmentStatus", "==", "ready")
                );
                const appointmentsSnapshot = await getDocs(appointmentsQuery);

                if (!appointmentsSnapshot.empty) {
                    const readyAppointmentsData = [];

                    for (const appointmentDoc of appointmentsSnapshot.docs) {
                        const appointment = appointmentDoc.data();

                        // Fetch therapist details using therapistId
                        const therapistDoc = await getDoc(
                            doc(db, "therapists", appointment.therapistId)
                        );
                        const therapist = therapistDoc.data();

                        readyAppointmentsData.push({
                            id: appointmentDoc.id,
                            therapistFullName: therapist.fullname,
                            therapistPhotoURL: therapist.photoURL, // Added therapist's photoURL

                            ...appointment,
                        });
                    }

                    setReadyAppointments(readyAppointmentsData);
                } else {
                    alert("You have confirmed appointments!");
                }
            }
        });
    };

    useEffect(() => {
        fetchReadyAppointments();
    }, []);

    return (
        <div>
            <h2>Appointments List</h2>
            <ul>
                {readyAppointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className='bg-white rounded-xl shadow-xl p-4 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                    >
                        <img
                            src={appointment.therapistPhotoURL}
                            alt={`Photo of ${appointment.therapistFullName}`}
                            className='w-full h-auto mb-4 rounded-lg'
                        />
                        <p>{`Therapist: ${appointment.therapistFullName}`}</p>

                        {/* <p>{`Name: ${appointment.userFirstName} ${appointment.userLastName}`}</p> */}
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

export default PatientAppointments;

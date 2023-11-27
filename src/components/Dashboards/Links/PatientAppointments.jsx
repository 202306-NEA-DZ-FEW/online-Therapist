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
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

const PatientAppointments = () => {
    const [readyAppointments, setReadyAppointments] = useState([]);
    const { t } = useTranslation("booking");

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
                    toast.info(t("appointments.info."), {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
        });
    };

    useEffect(() => {
        fetchReadyAppointments();
    }, []);

    return (
        <div className=''>
            <div className='font-atkinson p-2 '>
                <h1 className='text-2xl md:text-4xl font-bold bg-Teal p-4 md:p-6  w-full text-white uppercase rounded-lg tracking-wider	'>
                    Appointments List
                </h1>
            </div>
            <ul className='flex flex-wrap gap-8 m-4'>
                {readyAppointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className='flex flex-col gap-y-8 justify-center items-center bg-white rounded-xl shadow-xl p-4  w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                    >
                        <img
                            src={appointment.therapistPhotoURL}
                            alt={`Photo of ${appointment.therapistFullName}`}
                            className='w-24 h-24 lg:w-24 lg:h-24 object-fit border-4 border-Teal rounded-full'
                        />
                        <div className='font-atkinson flex flex-col gap-y-2'>
                            <p>
                                <span className='text-Teal'>Therapist :</span>
                                {` ${appointment.therapistFullName}`}
                            </p>

                            <p>
                                <span className='text-Teal'>
                                    Counseling Type :
                                </span>
                                {` ${appointment.counselingType}`}
                            </p>
                            <p>
                                <span className='text-Teal'>
                                    Session Date :
                                </span>
                                {` ${appointment.appointmentDate}`}
                            </p>
                            <p>
                                <span className='text-Teal'>Time : </span>
                                {` ${appointment.appointmentTime} ${appointment.appointmentTimeZone}`}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        // <div>
        //     <h2>Appointments List</h2>
        //     <ul>
        //         {readyAppointments.map((appointment) => (
        //             <li
        //                 key={appointment.id}
        //                 className='bg-white rounded-xl shadow-xl p-4 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
        //             >
        //                 <img
        //                     src={appointment.therapistPhotoURL}
        //                     alt={`Photo of ${appointment.therapistFullName}`}
        //                     className='w-full h-auto mb-4 rounded-lg'
        //                 />
        //                 <p>{`Therapist: ${appointment.therapistFullName}`}</p>

        //                 {/* <p>{`Name: ${appointment.userFirstName} ${appointment.userLastName}`}</p> */}
        //                 <p>{`Counseling Type: ${appointment.counselingType}`}</p>
        //                 <p>
        //                     {`Session Date: ${appointment.appointmentDate} ${appointment.appointmentTime} ${appointment.appointmentTimeZone}`}{" "}
        //                 </p>
        //                 {/* Add other appointment details */}
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default PatientAppointments;

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

const TherapistAppointments = ({ therapistId }) => {
    const [readyAppointments, setReadyAppointments] = useState([]);
    const { t } = useTranslation(["booking", "dashboard"]);

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
                    toast.info(t("booking:appointments.info"), {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }
        });
    };

    useEffect(() => {
        fetchReadyAppointments();
    }, [therapistId]);

    return (
        <div className='font-atkinson p-2 '>
            <h1 className='text-2xl md:text-4xl font-bold bg-Teal p-4 md:p-6  w-full text-white uppercase rounded-lg tracking-wider	'>
                {t("dashboard:patientAppointments.heading")}
            </h1>
            <ul className='flex flex-wrap gap-8 m-4'>
                {readyAppointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className='flex flex-col gap-y-8 justify-center items-center bg-white rounded-xl shadow-xl p-4  w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                    >
                        <img
                            src={appointment.userPhotoURL}
                            alt={`${t("dashboard:patientAppointments.photo")} ${
                                appointment.userFirstName
                            } ${appointment.userLastName}`}
                            className='w-24 h-24 lg:w-24 lg:h-24 object-fit border-Teal border-4 rounded-full'
                        />
                        <div className='font-atkinson flex flex-col gap-y-2 '>
                            <p>
                                <span className='text-Teal'>
                                    {t(
                                        "dashboard:therapistAppointments.patient"
                                    )}
                                </span>
                                {` ${appointment.userFirstName} ${appointment.userLastName}`}
                            </p>
                            <p>
                                <span className='text-Teal'>
                                    {t(
                                        "dashboard:therapistAppointments.status"
                                    )}
                                </span>
                                {`  ${appointment.maritalStatus}`}
                            </p>
                            <p>
                                <span className='text-Teal'>
                                    {t(
                                        "dashboard:patientAppointments.counseling"
                                    )}
                                </span>
                                {` ${appointment.counselingType}`}
                            </p>
                            <p>
                                <span className='text-Teal'>
                                    {t("dashboard:patientAppointments.date")}
                                </span>{" "}
                                {`${appointment.appointmentDate}`}
                            </p>
                            <p>
                                <span className='text-Teal'>
                                    {t("dashboard:patientAppointments.time")}
                                </span>{" "}
                                {` ${appointment.appointmentTime} ${appointment.appointmentTimeZone}`}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TherapistAppointments;

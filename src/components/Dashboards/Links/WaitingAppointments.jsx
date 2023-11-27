import Button from "@/components/elements/Button";
import { UserAuth } from "@/context/AuthContext";
import { auth, db } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import timeZones from "@/util/timeZones";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

const WaitingAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { user } = UserAuth();
    // Track selected appointment date and time for each therapist
    const [selectedDateTimes, setSelectedDateTimes] = useState({});
    const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
    const { t } = useTranslation("booking");

    const fetchWaitingAppointments = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const q = query(
                    collection(db, "appointments"),
                    where("therapistId", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const appointmentsData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setAppointments(appointmentsData);
                } else {
                    toast.info(
                        t("therapistDashboard.waitingAppointments.info"),
                        {
                            position: toast.POSITION.TOP_CENTER,
                        }
                    );
                }
            }
        });
    };

    const handleConfirmAppointment = async (appointmentId) => {
        try {
            // Update the appointment status to 'ready' in Firestore
            await updateDoc(doc(db, "appointments", appointmentId), {
                appointmentStatus: "ready",
            });
            // Update local state to reflect the change
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === appointmentId
                        ? { ...appointment, appointmentStatus: "ready" }
                        : appointment
                )
            );

            // Update the approved field in the therapist document
            const therapistId = auth.currentUser.uid;
            const therapistRef = doc(db, "therapists", therapistId);
            await updateDoc(therapistRef, { approved: true });
        } catch (error) {
            toast.error(
                `t("therapistDashboard.waitingAppointments.error1"),
                ${error.message}`,
                { position: toast.POSITION.TOP_CENTER }
            );
        }
    };

    const handleSetNewSessionDate = async (appointmentId) => {
        try {
            const selectedDateTime = selectedDateTimes[appointmentId];

            // Check if the appointment date and time are set
            if (!selectedDateTime) {
                toast.warning(
                    t("therapistDashboard.waitingAppointments.warning"),
                    { position: toast.POSITION.TOP_CENTER }
                );
                return;
            }

            const formattedDateTime =
                moment(selectedDateTime).tz(selectedTimeZone);

            // Check if formattedDateTime is a valid date
            if (!formattedDateTime.isValid()) {
                toast.error(
                    t("therapistDashboard.waitingAppointments.error2"),
                    {
                        position: toast.POSITION.TOP_CENTER,
                    }
                );
                return;
            }

            const newDate = formattedDateTime.format("YYYY-MM-DD");
            const newTime = formattedDateTime.format("HH:mm:ss");
            const newTimeZone = selectedTimeZone;

            // Update the appointment date, time, and status in Firestore
            await updateDoc(doc(db, "appointments", appointmentId), {
                appointmentDate: newDate,
                appointmentTime: newTime,
                appointmentTimeZone: newTimeZone,
                appointmentStatus: "in progress",
            });

            // Update local state to reflect the change
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === appointmentId
                        ? {
                              ...appointment,
                              appointmentDate: newDate,
                              appointmentTime: newTime,
                              appointmentTimeZone: newTimeZone,
                              appointmentStatus: "in progress",
                          }
                        : appointment
                )
            );
        } catch (error) {
            toast.error(
                `t("therapistDashboard.waitingAppointments.error3"),
                ${error.message}`,
                { position: toast.POSITION.TOP_CENTER }
            );
        }
    };

    useEffect(() => {
        if (user) {
            fetchWaitingAppointments(user.uid);
        }
    }, [user]);

    return (
        <div className='font-atkinson p-2'>
            <h1 className='text-2xl md:text-4xl font-bold bg-Teal p-4 md:p-6  w-full text-white uppercase rounded-lg tracking-wider	'>
                Waiting Appointments
            </h1>

            {/* Display the list of waiting appointments */}
            <ul className='flex flex-wrap gap-8 lg:m-4'>
                {appointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className='flex flex-col gap-y-6 lg:flex lg:flex-row lg:gap-x-10 bg-white rounded-xl shadow-xl p-2 lg:p-4 m-0 lg:m-4 '
                    >
                        <div className='flex flex-col justify-center items-center gap-y-2'>
                            <img
                                src={appointment.userPhotoURL}
                                alt={`Photo of ${appointment.userFirstName} ${appointment.userLastName}`}
                                className='w-full h-auto mb-4 rounded-lg'
                            />
                            <p>{`Name: ${appointment.userFirstName} ${appointment.userLastName}`}</p>
                            <p>{`Marital Status: ${appointment.maritalStatus}`}</p>
                            <p>{`Counseling Type: ${appointment.counselingType}`}</p>
                            <p>{`First Session: ${appointment.firstSession}`}</p>
                            <p>{`Counselor Qualities: ${appointment.counselorQualities}`}</p>
                            <p>{`Issues: ${appointment.issues}`}</p>
                            <p>{`Specification: ${appointment.specification}`}</p>
                            <p>
                                {`Session Date: ${appointment.appointmentDate} ${appointment.appointmentTime} ${appointment.appointmentTimeZone}`}{" "}
                            </p>
                            <label className='text-Gray font-atkinson'>
                                Set New Session Date:
                            </label>
                            <DatePicker
                                selected={selectedDateTimes[appointment.id]}
                                onChange={(date) =>
                                    setSelectedDateTimes((prev) => ({
                                        ...prev,
                                        [appointment.id]: date,
                                    }))
                                }
                                showTimeSelect
                                timeIntervals={15}
                                dateFormat='yyyy-MM-dd HH:mm:ss'
                                timeFormat='HH:mm:ss'
                                timeCaption='Time'
                                placeholderText='Select new date and time'
                            />
                            {/* Inside the map function in WaitingAppointments component */}
                            <label className='text-Gray font-atkinson'>
                                Time Zone:
                            </label>
                            <select
                                value={selectedTimeZone}
                                onChange={(event) =>
                                    setSelectedTimeZone(event.target.value)
                                }
                            >
                                {/* Map over your time zones and create options */}
                                {timeZones.map((zone) => (
                                    <option key={zone} value={zone}>
                                        {zone}
                                    </option>
                                ))}
                            </select>
                            <div className='pt-3'>
                                <button
                                    onClick={() =>
                                        handleConfirmAppointment(appointment.id)
                                    }
                                >
                                    <Button
                                        buttonText={
                                            appointment.appointmentStatus ===
                                            "ready"
                                                ? "Confirmed"
                                                : "Confirm"
                                        }
                                        buttonSize='fit'
                                        transition={false}
                                    />
                                </button>
                                <button
                                    onClick={() =>
                                        handleSetNewSessionDate(appointment.id)
                                    }
                                >
                                    <Button
                                        buttonText='Set New Date'
                                        buttonSize='fit'
                                        transition={false}
                                    />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WaitingAppointments;

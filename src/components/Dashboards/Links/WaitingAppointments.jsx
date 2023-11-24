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

const WaitingAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { user, loading, setLoading } = UserAuth();
    // Track selected appointment date and time for each therapist
    const [selectedDateTimes, setSelectedDateTimes] = useState({});
    const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");

    const fetchWaitingAppointments = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const q = query(
                    collection(db, "appointments"),
                    where("therapistId", "==", user.uid)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const appointmentsData = querySnapshot.docs.map(
                        // (doc) => doc.data()
                        (doc) => ({ id: doc.id, ...doc.data() })
                    );
                    setAppointments(appointmentsData);
                } else {
                    alert("No appointments booked with you found!");
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
            console.error("Error confirming appointment:", error);
        }
    };

    const handleSetNewSessionDate = async (appointmentId) => {
        try {
            const selectedDateTime = selectedDateTimes[appointmentId];

            // Check if the appointment date and time are set
            if (!selectedDateTime) {
                alert("Please set the appointment date and time.");
                return;
            }

            const formattedDateTime =
                moment(selectedDateTime).tz(selectedTimeZone);

            // Check if formattedDateTime is a valid date
            if (!formattedDateTime.isValid()) {
                console.error("Invalid date and time");
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
                appointmentStatus: "in progress", // Change to the appropriate status
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
            console.error("Error setting new session date:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchWaitingAppointments(user.uid);
        }
    }, [user]);

    return (
        <div className='p-4'>
            <p>Welcome therapist</p>

            {/* Display the list of waiting appointments */}
            <ul>
                {appointments.map((appointment) => (
                    <li
                        key={appointment.id}
                        className='bg-white rounded-xl shadow-xl p-4 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                    >
                        <img
                            src={appointment.photoURL}
                            alt={`Photo of ${appointment.userFirstName} ${appointment.userLastName}`}
                            className='w-full h-auto mb-4 rounded-lg'
                        />
                        <p>{`Name: ${appointment.userFirstName} ${appointment.userLastName}`}</p>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WaitingAppointments;

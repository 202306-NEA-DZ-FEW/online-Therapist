import Button from "@/components/elements/Button";
import { UserAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
import { auth, db } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Therapists = () => {
    const [appointments, setAppointments] = useState([]);
    const { user } = UserAuth();
    const [patientsList, setPatientsList] = useState([]);

    // const [bookingStatus, setBookingStatus] = useState({}); // Track booking status

    const handleWaitingAppointments = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const q = query(
                    collection(db, "appointments"),
                    where("therapistId", "==", user.uid),
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const appointmentsData = querySnapshot.docs.map(
                        // (doc) => doc.data()
                        (doc) => ({ id: doc.id, ...doc.data() }),
                    );
                    setAppointments(appointmentsData);
                } else {
                    alert("No appointments booked with you found!");
                }
            }
        });
    };
    // const handleWaitingAppointments = async () => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             try {
    //                 // Fetch user information from the 'users' collection
    //                 const userQuery = query(
    //                     collection(db, "users"),
    //                     where("uid", "==", user.uid)
    //                 );
    //                 const userSnapshot = await getDocs(userQuery);

    //                 if (!userSnapshot.empty) {
    //                     const userData = userSnapshot.docs[0].data();
    //                     const { firstName, lastName } = userData;

    //                     // Fetch appointments for the therapist
    //                     const appointmentQuery = query(
    //                         collection(db, "appointments"),
    //                         where("therapistId", "==", user.uid)
    //                     );
    //                     const appointmentSnapshot = await getDocs(appointmentQuery);

    //                     if (!appointmentSnapshot.empty) {
    //                         const appointmentsData = appointmentSnapshot.docs.map((doc) => ({
    //                             id: doc.id,
    //                             ...doc.data(),
    //                             firstName,
    //                             lastName,
    //                         }));
    //                         setAppointments(appointmentsData);
    //                     } else {
    //                         alert("No appointments booked with you found!");
    //                     }
    //                 } else {
    //                     alert("User information not found!");
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching appointments:", error);
    //             }
    //         }
    //     });
    // };

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
                        : appointment,
                ),
            );

            // Update the approved field in the therapist document
            const therapistId = auth.currentUser.uid;
            const therapistRef = doc(db, "therapists", therapistId);
            await updateDoc(therapistRef, { approved: true });
        } catch (error) {
            console.error("Error confirming appointment:", error);
        }
    };

    const fetchAppointmentsData = async (uid) => {
        const q = query(
            collection(db, "appointments"),
            where("therapistId", "==", uid),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const appointmentsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAppointments(appointmentsData);
        } else {
            alert("No appointments booked with you found!");
        }
    };

    // ...

    useEffect(() => {
        if (user) {
            fetchAppointmentsData(user.uid);
        }
    }, [user]);

    // const handleConfirmAppointment = async (appointmentId) => {
    //     // Update the appointment status to 'ready'
    //     const appointmentRef = doc(db, "appointments", appointmentId);
    //     await updateDoc(appointmentRef, { appointmentStatus: "ready" });

    //     // Update the state to reflect the change
    //     setAppointments((prevAppointments) =>
    //         prevAppointments.map((appointment) =>
    //             appointment.id === appointmentId
    //                // ? { ...appointment, appointmentStatus: "ready" }
    //                 : appointment
    //         )
    //     );
    // };

    // const handleDeclineAppointment = async ({appointmentId, user}) => {
    //     // Update the appointment status to 'waiting'
    //     const appointmentRef = doc(db, "appointments", appointmentId);
    //     await updateDoc(appointmentRef, {
    //         appointmentStatus: "waiting",
    //         approvalStatus: `${user.uid}Declined`,
    //     });

    //     // Update the state to reflect the change
    //     setAppointments((prevAppointments) =>
    //         prevAppointments.map((appointment) =>
    //             appointment.id === appointmentId
    //  //                 ? {
    //                       ...appointment,
    //                       appointmentStatus: "waiting",
    //                       approvalStatus: `${user.uid}Declined`,
    //                   }
    //                 : appointment
    //         )
    //     );
    // };

    const fetchPatientsList = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const q = query(
                        collection(db, "appointments"),
                        where("therapistId", "==", user.uid),
                        where("appointmentStatus", "==", "ready"),
                    );
                    const patientSnapshot = await getDocs(q);

                    if (!patientSnapshot.empty) {
                        const patientsData = await Promise.all(
                            patientSnapshot.docs.map(async (doc) => {
                                const userData = await getDoc(doc.ref).then(
                                    (snapshot) => snapshot.data(),
                                );
                                return { id: doc.id, ...userData };
                            }),
                        );
                        setPatientsList(patientsData);
                    } else {
                        alert("No patient found in your list!");
                    }
                } catch (error) {
                    console.error("Error fetching patient list:", error);
                }
            }
        });
    };

    const handlePatientsList = () => {
        fetchPatientsList();
    };

    return (
        <Layout>
            <div className='p-4'>
                <p>Welcome therapist</p>
                <button onClick={handleWaitingAppointments}>
                    <Button
                        buttonText='waiting appointments'
                        buttonSize='fit'
                        transition={false}
                    />
                </button>

                {/* Display the list of waiting appointments */}
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <p>{`Name: ${appointment.userFirstName} ${appointment.userLastName}`}</p>
                            <p>{`Counseling Type: ${appointment.counselingType}`}</p>
                            <p>{`First Session: ${appointment.firstSession}`}</p>
                            <p>{`Counselor Qualities: ${appointment.counselorQualities}`}</p>
                            <p>{`Issues: ${appointment.issues}`}</p>
                            <p>{`Specification: ${appointment.specification}`}</p>
                            <div className='flex space-x-2'>
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
                                {/* <button
                                // onClick={() =>
                                //     handleDeclineAppointment(appointment.id)
                                // }
                                >
                                    <Button
                                        buttonText={
                                            appointment.appointmentStatus ===
                                            "in progress"
                                                ? "Decline"
                                                : "Declined"
                                        }
                                        buttonSize='fit'
                                        transition={false}
                                    />
                                </button>
                                 */}
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <button onClick={handlePatientsList}>
                        <Button
                            buttonText='Patients list'
                            buttonSize='fit'
                            transition={false}
                        />
                    </button>

                    {/* Display the list of patients */}
                    <ul>
                        {patientsList.map((patient) => (
                            <li key={patient.id}>
                                <img
                                    src={patient.photoURL}
                                    alt={`Photo of ${patient.userFirstName} ${patient.userLastName}`}
                                />
                                <p>{`Name: ${patient.firstName} ${patient.lastName}`}</p>
                                {/* Add other patient information as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default Therapists;

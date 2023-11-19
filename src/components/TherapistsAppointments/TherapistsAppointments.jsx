import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "@/util/firebase"; // Replace this path with your Firebase configuration
import { UserAuth } from "@/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import Button from "../elements/Button";

const TherapistsAppointments = () => {
    const [therapists, setTherapists] = useState([]);
    const { user } = UserAuth();
    const [bookingStatus, setBookingStatus] = useState({}); // Track booking status
    const [activeBooking, setActiveBooking] = useState(false); // Track if user has an active booking

    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             // const snapshot = await getDoc(doc(db, "appointments", user.uid))
    //             // console.log(snapshot.data())

    //             const docRef = doc(db, "appointments", user.uid);
    //             const docSnapshot = await getDoc(docRef);
    //             if (docSnapshot.exists()) {
    //                 const { counselingType, counselorQualities } =
    //                     docSnapshot.data();
    //                 console.log("Counseling Type:", counselingType);
    //                 console.log("Counselor Qualities:", counselorQualities);
    //                 // Further processing or handling of these specific fields
    //             } else {
    //                 console.log("No appointment data found for the user.");
    //             }
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //   const fetchTherapists = async () => {
    //     try {
    //       const therapistsRef = collection(db, 'therapists');
    //       const therapistsSnapshot = await getDocs(therapistsRef);

    //       therapistsSnapshot.forEach((doc) => {
    //         const { username, age, gender, specialty } = doc.data();
    //         console.log('Therapist - Username:', username);
    //         console.log('Therapist - Age:', age);
    //         console.log('Therapist - Gender:', gender);
    //         console.log('Therapist - Specialty:', specialty);
    //         // Handle or store this information as required
    //       });
    //     } catch (error) {
    //       console.error('Error fetching therapists:', error);
    //     }
    //   };

    //   fetchTherapists();
    // }, []);

    // Your existing code
    // ...

    const fetchTherapistsData = async (uid) => {
        const docRef = doc(db, "appointments", uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const { counselingType, counselorQualities } = docSnapshot.data();

            const filteredTherapists = [];
            const therapistsRef = collection(db, "therapists");
            const therapistsSnapshot = await getDocs(therapistsRef);

            therapistsSnapshot.forEach((doc) => {
                const therapist = doc.data();
                // Apply your filtering logic here
                if (
                    (counselingType === "Teen Counseling (for my child)" &&
                        therapist.specialty === "Teen Counseling") ||
                    (counselingType === "Couple Counseling" &&
                        therapist.specialty === "Couple Counseling") ||
                    (counselingType === "Individual Counseling" &&
                        therapist.specialty === "individual counseling")
                ) {
                    if (
                        (counselorQualities.includes(
                            "I Prefer A Female Counselor"
                        ) &&
                            therapist.gender === "female") ||
                        (counselorQualities.includes(
                            "I Prefer A Male Counselor"
                        ) &&
                            therapist.gender === "male")
                    ) {
                        if (
                            (counselorQualities.includes(
                                "I Prefer An Older Counselor (45+)"
                            ) &&
                                therapist.age >= "45") ||
                            (counselorQualities.includes(
                                "I Prefer An Young Counselor (45-)"
                            ) &&
                                therapist.age < "45")
                        )
                            if (therapist.availability === "on") {
                                filteredTherapists.push({
                                    id: doc.id,
                                    ...therapist,
                                });
                            }
                    }
                }
            });

            setTherapists(filteredTherapists);

            const initialBookingStatus = filteredTherapists.reduce(
                (acc, therapist) => {
                    acc[therapist.id] =
                        therapist.id === docSnapshot.data().therapistId &&
                        docSnapshot.data().appointmentStatus === "in progress";
                    return acc;
                },
                {}
            );

            setBookingStatus(initialBookingStatus);

            if (
                docSnapshot.data().therapistId &&
                docSnapshot.data().appointmentStatus === "in progress"
            ) {
                setActiveBooking(true);
            }
        } else {
            console.log("No appointment data found for the user.");
        }
    };

    useEffect(() => {
        // Fetch data when the component mounts
        if (user) {
            fetchTherapistsData(user.uid);
        }
    }, [user]);

    useEffect(() => {
        // Fetch data when the user logs in
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                fetchTherapistsData(authUser.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             const docRef = doc(db, "appointments", user.uid);
    //             const docSnapshot = await getDoc(docRef);
    //             if (docSnapshot.exists()) {
    //                 const { counselingType, counselorQualities } =
    //                     docSnapshot.data();

    //                 const filteredTherapists = [];
    //                 const therapistsRef = collection(db, "therapists");
    //                 const therapistsSnapshot = await getDocs(therapistsRef);

    //                 therapistsSnapshot.forEach((doc) => {
    //                     const therapist = doc.data();
    //                     if (
    //                         (counselingType ===
    //                             "Teen Counseling (for my child)" &&
    //                             therapist.specialty === "Teen Counseling") ||
    //                         (counselingType === "Couple Counseling" &&
    //                             therapist.specialty === "Couple Counseling") ||
    //                         (counselingType === "Individual Counseling" &&
    //                             therapist.specialty === "individual counseling")
    //                     ) {
    //                         if (
    //                             (counselorQualities.includes(
    //                                 "I Prefer A Female Counselor"
    //                             ) &&
    //                                 therapist.gender === "female") ||
    //                             (counselorQualities.includes(
    //                                 "I Prefer A Male Counselor"
    //                             ) &&
    //                                 therapist.gender === "male")
    //                         ) {
    //                             if (
    //                                 (counselorQualities.includes(
    //                                     "I Prefer An Older Counselor (45+)"
    //                                 ) &&
    //                                     therapist.age >= "45") ||
    //                                 (counselorQualities.includes(
    //                                     "I Prefer An Young Counselor (45-)"
    //                                 ) &&
    //                                     therapist.age < "45")
    //                             )
    //                                 if (therapist.availability === "on") {
    //                                     filteredTherapists.push({
    //                                         id: doc.id,
    //                                         ...therapist,
    //                                     });
    //                                 }
    //                         }
    //                     }
    //                 });

    //                 console.log("Filtered Therapists:", filteredTherapists);
    //                 // Use or display the filtered therapists data as required
    //                 setTherapists(filteredTherapists);

    //                 // const initialBookingStatus = filteredTherapists.reduce(
    //                 //     (acc, therapist) => {
    //                 //         acc[therapist.id] = false;
    //                 //         return acc;
    //                 //     },
    //                 //     {}
    //                 // );
    //                 const initialBookingStatus = filteredTherapists.reduce(
    //                     (acc, therapist) => {
    //                         // Check if the therapist is already booked by the user
    //                         acc[therapist.id] =
    //                             therapist.id ===
    //                                 docSnapshot.data().therapistId &&
    //                             docSnapshot.data().appointmentStatus ===
    //                                 "in progress";
    //                         return acc;
    //                     },
    //                     {}
    //                 );

    //                 setBookingStatus(initialBookingStatus);

    //                 // Check if user has an active booking
    //                 if (
    //                     docSnapshot.data().therapistId &&
    //                     docSnapshot.data().appointmentStatus === "in progress"
    //                 ) {
    //                     setActiveBooking(true);
    //                 }
    //             } else {
    //                 console.log("No appointment data found for the user.");
    //             }

    //             //     };

    //             //     if (user) {
    //             //         fetchData();
    //             //     }
    //             // }, [user]);
    //         }
    //     });
    // }, [user]);

    const handleSubmitAppointment = async (therapist) => {
        try {
            if (!bookingStatus[therapist.id] && !activeBooking) {
                await updateDoc(doc(db, "appointments", user.uid), {
                    therapistId: therapist.id,
                    appointmentStatus: "in progress",
                });
                alert("Appointment booked successfully.");
                setBookingStatus((prevStatus) => ({
                    ...prevStatus,
                    [therapist.id]: true,
                }));
                setActiveBooking(true);
            } else if (bookingStatus[therapist.id] && activeBooking) {
                // Cancel appointment
                await updateDoc(doc(db, "appointments", user.uid), {
                    therapistId: "",
                    appointmentStatus: "waiting",
                });
                alert("Appointment canceled successfully.");
                setBookingStatus((prevStatus) => ({
                    ...prevStatus,
                    [therapist.id]: false,
                }));
                setActiveBooking(false);
            }
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error: Appointment could not be updated!");
        }
    };

    // Render the filtered therapists for the user to choose from
    return (
        <div className='p-10'>
            <h2 className='text-5xl font-young'>Filtered Therapists</h2>
            <ul className='flex flex-col'>
                {therapists.map((therapist) => (
                    <li key={therapist.id} className='flex-col-1 p-4 '>
                        <img
                            className='w-16 h-16 my-2'
                            src={`${therapist.photoURL}`}
                        />
                        <p>
                            <span className='text-Gray font-atkinson'>
                                Name:{" "}
                            </span>
                            {`${therapist.fullname}`}
                        </p>
                        <p>
                            <span className='text-Gray font-atkinson'>
                                Approved:{" "}
                            </span>
                            {`${therapist.approved}`}
                        </p>

                        <details>
                            <summary className='text-DarkTeal text-lg font-atkinson hover:bg-GreenLight w-20 rounded-lg'>
                                Details
                            </summary>
                            <p>
                                <span className='text-Gray font-atkinson'>
                                    Bio:{" "}
                                </span>
                                {`${therapist.bio}`}
                            </p>
                            {/* <ul>
                                <li>{`Age: ${therapist.age}`}</li>
                                <li>{`Gender: ${therapist.gender}`}</li>
                                <li>{`Specialty: ${therapist.specialty}`}</li>
                            </ul> */}
                        </details>
                        <div className='flex space-x-4 pt-3'>
                            <button
                                onClick={() =>
                                    handleSubmitAppointment(therapist)
                                }
                            >
                                <Button
                                    buttonText={
                                        bookingStatus[therapist.id]
                                            ? "unbook"
                                            : "book"
                                    }
                                    buttonSize='sm'
                                    transition={false}
                                />
                            </button>
                            <button>
                                <Button
                                    buttonText='Calendar'
                                    buttonSize='md'
                                    transition={false}
                                    disabled={!therapist.approved}
                                />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TherapistsAppointments;

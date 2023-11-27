import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Button from "@/components/elements/Button";

import { UserAuth } from "@/context/AuthContext";
import { auth, db } from "@/util/firebase"; // Replace this path with your Firebase configuration
import timeZones from "@/util/timeZones"; // Import a list of time zones, replace with your own
import { useTranslation } from "next-i18next";

const TherapistsMatches = () => {
    const { t } = useTranslation("dashboard");

    const [therapists, setTherapists] = useState([]);
    const { user } = UserAuth();
    // const { language } = user;
    // const { t } = useTranslation(["booking", "therapists"], { lng: language });

    const [bookingStatus, setBookingStatus] = useState({}); // Track booking status
    const [activeBooking, setActiveBooking] = useState(false); // Track if user has an active booking
    // Track selected appointment date and time for each therapist
    const [selectedDateTimes, setSelectedDateTimes] = useState({});
    const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");

    const fetchTherapistsData = async (uid) => {
        const docRef = doc(db, "appointments", uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const { counselingType, counselorQualities } = docSnapshot.data();

            const filteredTherapists = [];
            const therapistsRef = collection(db, "therapists");
            const therapistsSnapshot = await getDocs(therapistsRef);

            // // Log all therapists here
            // const allTherapists = therapistsSnapshot.docs.map((doc) =>
            //     doc.data()
            // );
            // console.log("All Therapists:", allTherapists);

            therapistsSnapshot.forEach((doc) => {
                const therapist = doc.data();
                // Apply your filtering logic here
                // if (
                //     (counselingType === "Teen Counseling (for my child)" &&
                //         therapist.specialty === "Teen Counseling") ||
                //     (counselingType === "Couple Counseling" &&
                //         therapist.specialty === "Couple Counseling") ||
                //     (counselingType === "Individual Counseling" &&
                //         therapist.specialty === "Individual Counseling")
                // ) {
                //     if (
                //         (counselorQualities.includes(
                //             "I Prefer A Female Counselor"
                //         ) &&
                //             therapist.gender === "female") ||
                //         (counselorQualities.includes(
                //             "I Prefer A Male Counselor"
                //         ) &&
                //             therapist.gender === "male")
                //     ) {
                //         if (
                //             (counselorQualities.includes(
                //                 "I Prefer An Older Counselor (45+)"
                //             ) &&
                //                 therapist.age >= "45") ||
                //             (counselorQualities.includes(
                //                 "I Prefer A Young Counselor (45-)"
                //             ) &&
                //                 therapist.age < "45")
                //         )

                // if (
                //     (counselingType === "Teen Counseling (for my child)" &&
                //         therapist.specialty === "Teen Counseling") ||
                //     (counselingType === "استشارات المراهقين (لطفلي)" &&
                //         therapist.specialty === "Teen Counseling") ||
                //     (counselingType === "Teen Counseling (for my child)" &&
                //         therapist.specialty === "مشورة للمراهقين") ||
                //     (counselingType === "استشارات المراهقين (لطفلي)" &&
                //         therapist.specialty === "مشورة للمراهقين") ||
                //     (counselingType === "Couple Counseling" &&
                //         therapist.specialty === "Couple Counseling") ||
                //     (counselingType === "الاستشارة الزوجية" &&
                //         therapist.specialty === "Couple Counseling") ||
                //     (counselingType === "Couple Counseling" &&
                //         therapist.specialty === "مشورة للأزواج") ||
                //     (counselingType === "الاستشارة الزوجية" &&
                //         therapist.specialty === "مشورة للأزواج") ||
                //     (counselingType === "Individual Counseling" &&
                //         therapist.specialty === "Individual Counseling") ||
                //     (counselingType === "الاستشارة الفردية" &&
                //         therapist.specialty === "Individual Counseling") ||
                //     (counselingType === "Individual Counseling" &&
                //         therapist.specialty === "مشورة للأفراد") ||
                //     (counselingType === "الاستشارة الفردية" &&
                //         therapist.specialty === "مشورة للأفراد")
                // ) {
                //     if (
                //         (counselorQualities.includes(
                //             "I Prefer A Female Counselor" ||
                //                 "أفضّل مستشارة أنثى"
                //         ) &&
                //             therapist.gender === ("female" || "أنثى")) ||
                //         (counselorQualities.includes(
                //             "I Prefer A Male Counselor" ||
                //                 "أنا أفضّل مستشار ذكر"
                //         ) &&
                //             therapist.gender === ("male" || "ذكر"))
                //     ) {
                //         if (
                //             (counselorQualities.includes(
                //                 "I Prefer An Older Counselor (45+)" ||
                //                     "أفضّل المستشار الأكبر سنًا (45+)"
                //             ) &&
                //                 therapist.age >= "45") ||
                //             (counselorQualities.includes(
                //                 "I Prefer A Young Counselor (45-)" ||
                //                     "أفضّل مستشارًا شابًا (45-)"
                //             ) &&
                //                 therapist.age < "45")
                //         )
                if (
                    (counselingType === "Teen Counseling (for my child)" &&
                        therapist.specialty === "Teen Counseling") ||
                    (counselingType === "استشارات المراهقين (لطفلي)" &&
                        therapist.specialty === "Teen Counseling") ||
                    (counselingType === "Teen Counseling (for my child)" &&
                        therapist.specialty === "مشورة للمراهقين") ||
                    (counselingType === "استشارات المراهقين (لطفلي)" &&
                        therapist.specialty === "مشورة للمراهقين") ||
                    (counselingType === "Couple Counseling" &&
                        therapist.specialty === "Couple Counseling") ||
                    (counselingType === "الاستشارة الزوجية" &&
                        therapist.specialty === "Couple Counseling") ||
                    (counselingType === "Couple Counseling" &&
                        therapist.specialty === "مشورة للأزواج") ||
                    (counselingType === "الاستشارة الزوجية" &&
                        therapist.specialty === "مشورة للأزواج") ||
                    (counselingType === "Individual Counseling" &&
                        therapist.specialty === "Individual Counseling") ||
                    (counselingType === "الاستشارة الفردية" &&
                        therapist.specialty === "Individual Counseling") ||
                    (counselingType === "Individual Counseling" &&
                        therapist.specialty === "مشورة للأفراد") ||
                    (counselingType === "الاستشارة الفردية" &&
                        therapist.specialty === "مشورة للأفراد")
                ) {
                    if (
                        (counselorQualities.includes(
                            "I Prefer A Female Counselor"
                        ) &&
                            therapist.gender === "female") ||
                        (counselorQualities.includes("أفضّل مستشارة أنثى") &&
                            therapist.gender === "female") ||
                        (counselorQualities.includes(
                            "I Prefer A Female Counselor"
                        ) &&
                            therapist.gender === "أنثى") ||
                        (counselorQualities.includes("أفضّل مستشارة أنثى") &&
                            therapist.gender === "أنثى") ||
                        (counselorQualities.includes(
                            "I Prefer A Male Counselor"
                        ) &&
                            therapist.gender === "male") ||
                        (counselorQualities.includes("أنا أفضّل مستشار ذكر") &&
                            therapist.gender === "male") ||
                        (counselorQualities.includes(
                            "I Prefer A Male Counselor"
                        ) &&
                            therapist.gender === "ذكر") ||
                        (counselorQualities.includes("أنا أفضّل مستشار ذكر") &&
                            therapist.gender === "ذكر")
                    ) {
                        if (
                            (counselorQualities.includes(
                                "I Prefer An Older Counselor (45+)"
                            ) &&
                                therapist.age >= "45") ||
                            (counselorQualities.includes(
                                "أفضّل المستشار الأكبر سنًا (45+)"
                            ) &&
                                therapist.age >= "45") ||
                            (counselorQualities.includes(
                                "I Prefer A Young Counselor (45-)"
                            ) &&
                                therapist.age < "45") ||
                            (counselorQualities.includes(
                                "أفضّل مستشارًا شابًا (45-)"
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
            // console.log("Filtered Therapists:", filteredTherapists);

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
    //     // Fetch data when the user logs in
    //     const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    //         if (authUser) {
    //             fetchTherapistsData(authUser.uid);
    //             // Load values from local storage
    //             const storedDateTimes = localStorage.getItem("selectedDateTimes");
    //             const storedTimeZone = localStorage.getItem("selectedTimeZone");
    //             if (storedDateTimes) {
    //                 setSelectedDateTimes(JSON.parse(storedDateTimes));
    //             }
    //             if (storedTimeZone) {
    //                 setSelectedTimeZone(storedTimeZone);
    //             }
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    // const handleDateTimeChange = (event) => {
    //     setAppointmentDateTime(event.target.value);
    // }
    // const saveToLocalStorage = () => {
    //     localStorage.setItem(
    //         "selectedDateTimes",
    //         JSON.stringify(selectedDateTimes)
    //     );
    //     localStorage.setItem("selectedTimeZone", selectedTimeZone);
    // };

    const handleDateTimeChange = (therapistId, date) => {
        setSelectedDateTimes((prevDateTimes) => ({
            ...prevDateTimes,
            [therapistId]: date,
        }));
        // saveToLocalStorage();
    };

    const handleTimeZoneChange = (event) => {
        setSelectedTimeZone(event.target.value);
        // saveToLocalStorage();
    };

    const handleSubmitAppointment = async (therapist) => {
        try {
            const selectedDateTime = selectedDateTimes[therapist.id];

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

            const date = formattedDateTime.format("YYYY-MM-DD");
            const time = formattedDateTime.format("HH:mm:ss");
            const timeZone = selectedTimeZone;

            if (!bookingStatus[therapist.id] && !activeBooking) {
                await updateDoc(doc(db, "appointments", user.uid), {
                    therapistId: therapist.id,
                    appointmentStatus: "in progress",
                    appointmentDate: date, // Update the appointment date
                    appointmentTime: time, // Update the appointment time
                    appointmentTimeZone: timeZone, // Update the appointment time zone
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
                    appointmentDate: null, // Clear the appointment date
                    appointmentTime: null, // Clear the appointment time
                    appointmentTimeZone: null, // Clear the appointment time zone
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
            // alert("Error: Appointment could not be updated!");
            console.log(
                `Error: Appointment could not be updated!\n${error.message}`
            );
        }
    };
    console.log("Therapists Array:", therapists);

    // Render the filtered therapists for the user to choose from

    return (
        <div className='font-atkinson p-2'>
            <h1 className='text-2xl md:text-4xl font-bold bg-Teal p-4 md:p-6  w-full text-white uppercase rounded-lg tracking-wider	'>
                {t("therapists.heading")}
            </h1>

            <ul className='flex flex-col gap-y-8 lg:m-4'>
                {therapists.map((therapist) => (
                    <li
                        key={therapist.id}
                        className='flex flex-col gap-y-6 lg:flex lg:flex-row lg:gap-x-10 bg-white rounded-xl shadow-xl p-2 lg:p-4 m-0 lg:m-4 '
                    >
                        <div className='flex flex-col justify-center items-center gap-y-2'>
                            <img
                                className='w-24 h-24 lg:w-24 lg:h-24 object-fit border-Teal border-4 rounded-full'
                                src={`${therapist.photoURL}`}
                            />

                            <p>{`${therapist.fullname}`}</p>
                            <p>{` ${therapist.specialty}`}</p>
                            {/* <p>
                            <span className='text-Gray font-atkinson'>
                                Approved:{" "}
                            </span>
                            {`${therapist.approved}`}
                        </p> */}
                        </div>

                        <div className='w-[250px] lg:w-96 pt-4 '>
                            <p className='text-gray-500'>
                                {t("therapists.details")}
                            </p>
                            <p>
                                <span className='text-Gray font-atkinson'></span>
                                {`${therapist.bio}`}
                            </p>
                        </div>

                        <div className='lg:flex lg:flex-col lg:gap-y-8 flex flex-col jutsify-center items-center gap-y-8'>
                            <div className='flex flex-col gap-y-2'>
                                <label className='text-Gray font-atkinson'>
                                    {t("therapists.Date")}
                                </label>
                                <DatePicker
                                    className='p-1 border w-48 rounded-md border-Teal'
                                    selected={selectedDateTimes[therapist.id]}
                                    onChange={(date) =>
                                        handleDateTimeChange(therapist.id, date)
                                    }
                                    showTimeSelect
                                    timeFormat='HH:mm'
                                    timeIntervals={15}
                                    dateFormat='MM-dd-yyyy HH:mm'
                                    placeholderText={t(
                                        "therapists.placeholder"
                                    )}
                                />
                                <label className='text-Gray font-atkinson'>
                                    {t("therapists.Zone")}
                                </label>
                                <select
                                    className='p-1 border w-48 rounded-md border-Teal'
                                    value={selectedTimeZone}
                                    onChange={handleTimeZoneChange}
                                >
                                    {timeZones.map((zone) => (
                                        <option key={zone} value={zone}>
                                            {zone}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={() =>
                                    handleSubmitAppointment(therapist)
                                }
                            >
                                <Button
                                    buttonText={
                                        bookingStatus[therapist.id]
                                            ? t("therapists.Unbook")
                                            : t("therapists.Book")
                                    }
                                    buttonSize='lg'
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

export default TherapistsMatches;

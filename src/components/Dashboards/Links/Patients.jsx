import { auth, db } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PatientsList = () => {
    const [patientsList, setPatientsList] = useState([]);
    const { t } = useTranslation(["booking", "dashboard"]);

    const fetchPatientsList = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const q = query(
                        collection(db, "appointments"),
                        where("therapistId", "==", user.uid),
                        where("appointmentStatus", "==", "ready")
                    );
                    const patientSnapshot = await getDocs(q);

                    if (!patientSnapshot.empty) {
                        const patientsData = await Promise.all(
                            patientSnapshot.docs.map(async (doc) => {
                                const userData = await getDoc(doc.ref).then(
                                    (snapshot) => snapshot.data()
                                );
                                return { id: doc.id, ...userData };
                            })
                        );
                        setPatientsList(patientsData);
                    } else {
                        toast.info(
                            t("booking:therapistDashboard.patientsList.info"),
                            {
                                position: toast.POSITION.TOP_CENTER,
                            }
                        );
                    }
                } catch (error) {
                    toast.info(
                        t("booking:therapistDashboard.patientsList.error"),
                        {
                            position: toast.POSITION.TOP_CENTER,
                        }
                    );
                }
            }
        });
    };
    useEffect(() => {
        fetchPatientsList();
    }, []);
    return (
        <div className="font-atkinson p-2'">
            <h1 className='text-2xl md:text-4xl font-bold bg-Teal p-4 md:p-6  w-full text-white uppercase rounded-lg tracking-wider	'>
                {t("dashboard:patients.patient")}
            </h1>

            <div className='flex flex-wrap'>
                {patientsList.map((patient) => (
                    <div
                        key={patient.id}
                        className='flex flex-row justify-center items-center space-x-2 bg-white rounded-xl shadow-xl p-4 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                    >
                        <img
                            src={patient.userPhotoURL}
                            alt={`${t("dashboard:patientAppointments.photo")} ${patient.userFirstName} ${patient.userLastName}`}
                            className='w-24 h-24 lg:w-24 lg:h-24 object-fit border-Teal border-4 rounded-full'
                        />
                        <p>{`${t("dashboard:patients.name")} ${
                            patient.userFirstName
                        } ${patient.userLastName}`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientsList;

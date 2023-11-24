import { auth, db } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const PatientsList = () => {
    const [patientsList, setPatientsList] = useState([]);

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
                        alert("No patient found in your list!");
                    }
                } catch (error) {
                    console.error("Error fetching patient list:", error);
                }
            }
        });
    };
    useEffect(() => {
        fetchPatientsList();
    }, []);
    return (
        <div>
            <h1>patients list</h1>
            <div className='flex flex-wrap'>
                {patientsList.map((patient) => (
                    <div
                        key={patient.id}
                        className='bg-white rounded-xl shadow-xl p-4 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
                    >
                        <img
                            src={patient.photoURL}
                            alt={`Photo of ${patient.userFirstName} ${patient.userLastName}`}
                            className='w-full h-auto mb-4 rounded-lg'
                        />
                        <p>{`Name: ${patient.firstName} ${patient.lastName}`}</p>
                        {/* Add other patient information as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientsList;

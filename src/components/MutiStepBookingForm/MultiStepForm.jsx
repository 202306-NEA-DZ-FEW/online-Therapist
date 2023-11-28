import React, { useEffect, useState } from "react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import BookingStep4 from "./BookingStep4";
import BookingStep5 from "./BookingStep5";
import BookingStep6 from "./BookingStep6";
import BookingStep7 from "./BookingStep7";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/util/firebase";
import { UserAuth } from "@/context/AuthContext";
import BookingStepFinal from "./BookingStepFinal";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";

const steps = ["1", "2", "3", "4", "5", "6", "7"];
const initialFormData = {
    counselingType: "",
    maritalStatus: "",
    firstSession: "",
    counselorQualities: "",
    issues: "",
    specification: "",
    agreeToTerms: false,
};

const MultiStepForm = ({ showStepNumber }) => {
    const [step, setStep] = useState("1");
    const [formData, setFormData] = useState(initialFormData);
    const { user } = UserAuth();
    const { t } = useTranslation("booking");

    // Handler of next step
    const handleNextStep = () => {
        if (step === "1") setStep("2");
        else if (step === "2") setStep("3");
        else if (step === "3") setStep("4");
        else if (step === "4") setStep("5");
        else if (step === "5") setStep("6");
        else if (step === "6") setStep("7");
    };

    const handlePrevStep = () => {
        if (step === "7") setStep("6");
        else if (step === "6") setStep("5");
        else if (step === "5") setStep("4");
        else if (step === "4") setStep("3");
        else if (step === "3") setStep("2");
        else if (step === "2") setStep("1");
    };

    // Update the formData
    const handleChangeInput = (e) => {
        const { name, value, checked, type } = e.target;
        if (type === "checkbox") {
            let updatedCheckboxData = formData[name] || []; // Get the existing data or start with an empty array
            if (checked) {
                updatedCheckboxData = [...updatedCheckboxData, value]; // Add the new value to the array
            } else {
                updatedCheckboxData = updatedCheckboxData.filter(
                    (item) => item !== value
                ); // Remove the unchecked value
            }
            setFormData({
                ...formData,
                [name]: updatedCheckboxData,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmitFormData = async () => {
        if (!formData.agreeToTerms) {
            toast.warning(t("multiStepForm.warning1"), {
                position: toast.POSITION.TOP_CENTER,
            });
        } else {
            try {
                // Fetch user data
                const userRef = doc(db, "users", user.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const { firstname, lastname, photoURL } =
                        userSnapshot.data();

                    // Create the "appointments" document with user data
                    await setDoc(doc(db, "appointments", user.uid), {
                        uid: user.uid,
                        counselingType: formData.counselingType,
                        maritalStatus: formData.maritalStatus,
                        firstSession: formData.firstSession,
                        counselorQualities: formData.counselorQualities,
                        issues: formData.issues,
                        specification: formData.specification,
                        therapistId: "",
                        appointmentStatus: "waiting",
                        agreeToTerms: false,
                        userFirstName: firstname,
                        userLastName: lastname,
                        userPhotoURL: photoURL,
                    });
                    toast.success(t("multiStepForm.success"), {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setStep("Final");
                } else {
                    toast.warning(t("multiStepForm.warning2"), {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            } catch (error) {
                toast.error(t("multiStepForm.error"), {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    // Section for render stepNumbers
    const renderTopStepNumbers = () => {
        if (!showStepNumber || step === "Final") {
            return null;
        }
        return (
            <section className='mt-2 mb-4 flex justify-center items-center rtl:space-x-reverse lg:space-x-10 space-x-4'>
                {steps.map((item) => (
                    <div
                        key={item}
                        className={`lg:w-8 lg:h-8 w-6 h-6 flex justify-center items-center border-2 hover:bg-GreenLight border-Gray rounded-full cursor-pointer ${
                            item === step ? "bg-Green" : ""
                        }`}
                        onClick={() => setStep(item)}
                    >
                        {item}
                    </div>
                ))}
            </section>
        );
    };

    return (
        <div className='lg:w-2/3 w-96 lg:px-14 lg:py-8 px-4 py-4 mx-auto rounded-lg border-2 border-dotted shadow-2xl border-sky-300'>
            {renderTopStepNumbers()}

            {/* // Render the steps */}
            {step === "1" ? (
                <BookingStep1
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handleNextStep={handleNextStep}
                />
            ) : null}
            {step === "2" ? (
                <BookingStep2
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                />
            ) : null}

            {step === "3" ? (
                <BookingStep3
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                />
            ) : null}

            {step === "4" ? (
                <BookingStep4
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                />
            ) : null}

            {step === "5" ? (
                <BookingStep5
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                />
            ) : null}
            {step === "6" ? (
                <BookingStep6
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                />
            ) : null}
            {step === "7" ? (
                <BookingStep7
                    formData={formData}
                    handleChangeInput={handleChangeInput}
                    handlePrevStep={handlePrevStep}
                    handleSubmitFormData={handleSubmitFormData}
                />
            ) : null}
            {step === "Final" ? <BookingStepFinal /> : null}
        </div>
    );
};

export default MultiStepForm;

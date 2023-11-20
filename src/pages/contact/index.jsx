import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Layout from "@/layout/Layout";
import Button from "@/components/elements/Button";
import { auth } from "@/util/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "@/util/firebase";
import Input from "@/components/elements/Input";
import { UserAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Thankyou from "@/components/Thankyou/Thankyou";

function Contact() {
    const { user, isSignUpSuccessful, setIsSignUpSuccessful } = UserAuth();
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation("common");

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        details: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        try {
            setLoading(true);
            // Save user contact information in Firestore
            const userCollection = collection(db, "contacts");
            await setDoc(doc(userCollection), {
                type: selectedOption,
                name: formData.name,
                email: formData.email,
                details: formData.details,
            });

            setIsSignUpSuccessful(true);
        } catch (error) {
            console.error("Error in contact:", error);
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required("First Name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Email is invalid"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <Layout>
            {isSignUpSuccessful ? ( // Conditionally render the thank you page
                <Thankyou text1={t("contactThankYou.description")} />
            ) : (
                <main className='mx-8 mt-5 lg:mx-24 lg:mt-10 font-atkinson'>
                    <div className='mb-10'>
                        <h1 className='text-4xl lg:text-5xl font-medium pb-4 bg-LightBeige lg:bg-inherit text-center p-3 lg:text-left lg:p-0 rounded-lg rtl:lg:text-right'>
                            {t("contact.title")}
                        </h1>
                        <p className='text-xl lg:text-2xl text-center lg:text-left rtl:lg:text-right text-gray-500'>
                            {t("contact.callToAction")}
                        </p>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        <div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className='flex flex-col gap-3'
                            >
                                <h4 className='text-xl lg:text-2xl font-medium'>
                                    {t("contact.type")}
                                </h4>
                                <label className='lg:text-lg'>
                                    <input
                                        type='radio'
                                        value='question about the service.'
                                        checked={
                                            selectedOption ===
                                            "question about the service."
                                        }
                                        onChange={handleRadioChange}
                                        className='mx-2 accent-DarkTeal'
                                    />
                                    {t("contact.radioOne")}
                                </label>
                                <label className='lg:text-lg'>
                                    <input
                                        type='radio'
                                        value='client Support'
                                        checked={
                                            selectedOption === "client Support"
                                        }
                                        onChange={handleRadioChange}
                                        className='mx-2 accent-DarkTeal'
                                    />
                                    {t("contact.radioTwo")}
                                </label>
                                <label className='lg:text-lg'>
                                    <input
                                        type='radio'
                                        value='counselor interested in joining'
                                        checked={
                                            selectedOption ===
                                            "counselor interested in joining"
                                        }
                                        onChange={handleRadioChange}
                                        className='mx-2 accent-DarkTeal'
                                    />
                                    {t("contact.radioThree")}
                                </label>
                                <label className='lg:text-lg'>
                                    <input
                                        type='radio'
                                        value='registered counselor support'
                                        checked={
                                            selectedOption ===
                                            "registered counselor support"
                                        }
                                        onChange={handleRadioChange}
                                        className='mx-2 accent-DarkTeal'
                                    />
                                    {t("contact.radioFour")}
                                </label>
                                <label className='lg:text-lg'>
                                    <input
                                        type='radio'
                                        value='business-related inquiry'
                                        checked={
                                            selectedOption ===
                                            "business-related inquiry"
                                        }
                                        onChange={handleRadioChange}
                                        className='mx-2 accent-DarkTeal'
                                    />
                                    {t("contact.radioFive")}
                                </label>
                                <label className='lg:text-lg'>
                                    <input
                                        type='radio'
                                        value='organization Interest'
                                        checked={
                                            selectedOption ===
                                            "organization Interest"
                                        }
                                        onChange={handleRadioChange}
                                        className='mx-2 accent-DarkTeal'
                                    />
                                    {t("contact.radioSix")}
                                </label>
                                <label className='lg:text-lg'>
                                    <input
                                        type='radio'
                                        value='billing question'
                                        checked={
                                            selectedOption ===
                                            "billing question"
                                        }
                                        onChange={handleRadioChange}
                                        className='mx-2 accent-DarkTeal'
                                    />
                                    {t("contact.radioSeven")}
                                </label>

                                <div className='grid lg:grid-cols-2 pt-8 gap-5'>
                                    <div>
                                        <Input
                                            width='full'
                                            type='text'
                                            label={t("contact.name")}
                                            placeholder={t(
                                                "contact.namePlaceholder"
                                            )}
                                            name='name'
                                            errorMessage={errors.name?.message}
                                            register={{
                                                ...register("name"),
                                            }}
                                            value={formData.name}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            width='full'
                                            type='text'
                                            label={t("contact.email")}
                                            placeholder={t(
                                                "contact.emailPlaceholder"
                                            )}
                                            name='email'
                                            errorMessage={errors.email?.message}
                                            register={{
                                                ...register("email"),
                                            }}
                                            value={formData.email}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className='lg:pt-3'>
                                    <label
                                        htmlFor='details'
                                        className='font-medium grid-span-2'
                                    >
                                        {t("contact.details")}
                                    </label>
                                    <textarea
                                        type='text'
                                        className='w-full border border-gray-300 h-12 w-96 pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal h-24'
                                        placeholder='Enter your details here...'
                                        value={formData.details}
                                        onChange={onChange}
                                        id='details'
                                        name='details'
                                        rows='10'
                                    />
                                </div>
                                <button
                                    className='mb-16 mt-4'
                                    type='submit'
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Button
                                            buttonText={t("contact.submit")}
                                            buttonSize='lg'
                                            disabled
                                        />
                                    ) : (
                                        <Button
                                            buttonText={t("contact.submit")}
                                            buttonSize='lg'
                                        />
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className='hidden lg:block'>
                            <Image
                                className='rounded-xl h-4/6 xl:h-5/6 w-fit mx-auto object-cover'
                                width={2000}
                                height={2000}
                                src='/Images/ContactUs.png'
                                alt=''
                            />
                        </div>
                    </div>
                </main>
            )}
        </Layout>
    );
}

export default Contact;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

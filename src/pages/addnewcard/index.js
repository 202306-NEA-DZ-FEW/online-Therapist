import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import validator from "validator";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { collection, addDoc } from "@firebase/firestore";
import { db, auth } from "@/util/firebase";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Layout from "@/layout/Layout";
import Select from "react-select";
import Image from "next/image";
import Thankyou from "@/components/Thankyou/Thankyou";

function AddNewCard() {
    let isValid = false;
    const [isCardAdded, setIsCardAdded] = useState(false);
    const [inputValues, setInputValues] = useState({
        cardNumber: "",
        expiryDate: "",
        CVC: "",
        nameOnCard: "",
        country: "",
        zip: "",
        city: "",
        address: "",
    });

    const options = useMemo(() => countryList().getData(), []);

    const { t } = useTranslation("addnewcard");

    const customStyles = {
        control: (base) => ({
            ...base,
            height: 48,
            minHeight: 48,
        }),
    };

    const submitHandler = async (e) => {
        try {
            setIsCardAdded(true);
            const cardCollection = collection(db, "cards");
            await addDoc(cardCollection, {
                cardNumber: inputValues.cardNumber,
                expiryDate: inputValues.expiryDate,
                CVC: inputValues.CVC,
                nameOnCard: inputValues.nameOnCard,
                country: inputValues.country,
                zip: inputValues.zip,
                city: inputValues.city,
                address: inputValues.address,
                uid: auth.lastNotifiedUid,
            });
        } catch (error) {
            console.error("Error adding card", error);
        }
    };

    const handleChange = (e) => {
        function formatText(text) {
            const sanitizedText = text.replace(/[^0-9/]/g, "");
            const parts = sanitizedText.split("/");

            if (parts.length > 2) {
                if (parts[1] == undefined) {
                    return parts[0] + "/";
                } else {
                    return parts[0] + "/" + parts[1];
                }
            }

            if (parts[0] && parts[0].length > 2) {
                if (parts[1] == undefined) {
                    return parts[0].substring(0, 2) + "/";
                } else {
                    return parts[0].substring(0, 2) + "/" + parts[1];
                }
            }

            if (parts[1] && parts[1].length > 2) {
                return parts[0] + "/" + parts[1].substring(0, 2);
            }

            return sanitizedText;
        }
        if (e.target) {
            const { name, value } = e.target;
            if (name === "expiryDate") {
                const formattedText = formatText(value);
                setInputValues({
                    ...inputValues,
                    expiryDate: formattedText,
                });
            } else {
                setInputValues({
                    ...inputValues,
                    [name]: value,
                });
            }
        } else {
            setInputValues({
                ...inputValues,
                ["country"]: e,
            });
        }
    };

    const validateCreditCard = async (value) => {
        const formatText = (text) => {
            let formattedText = text.replace(/ /g, "");
            if (formattedText.length > 4) {
                formattedText = formattedText.replace(/(.{4})/g, "$1 ");
            }
            return formattedText;
        };

        const formattedValue = formatText(value);

        setInputValues({
            ...inputValues,
            cardNumber: formattedValue.slice(0, 19),
        });

        if (validator.isCreditCard(value)) {
            isValid = true;
        } else {
            isValid = false;
        }

        return isValid;
    };

    const validationSchema = yup.object().shape({
        cardNumber: yup
            .string()
            .required(t("cardNumRequired"))
            .test("isValid", t("invalidCard"), validateCreditCard),
        expiryDate: yup
            .string()
            .required(t("expiryDate"))
            .length(5, t("fullExpiry")),
        CVC: yup
            .string(t("validCVC"))
            .required(t("CVCRequired"))
            .min(3, t("validCVC"))
            .max(4, t("validCVC")),
        nameOnCard: yup.string().required(t("enterName")),
        zip: yup.string().required(t("enterZIP")),
        city: yup.string().required(t("enterCity")),
        address: yup.string().required(t("enterAddress")),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <Layout>
            {isCardAdded ? (
                <Thankyou
                    text1={t("addCardThankYou.text1")}
                    text2={t("addCardThankYou.text2")}
                />
            ) : (
                <main>
                    <div className='mx-8 my-5 lg:mx-20 lg:my-10'>
                        <h1 className='text-4xl md:text-5xl pb-4 bg-LightBeige md:bg-inherit text-center p-3 md:text-left md:p-0 md:pb-2 rounded-lg md:rtl:text-right'>
                            {t("header")}
                        </h1>
                        <p className='text-xl md:text-2xl text-center mb-14 mt-2 md:mt-0 md:text-left md:rtl:text-right text-Gray'>
                            {t("info")}
                        </p>
                    </div>
                    <div className='grid grid-cols-1 xl:grid-cols-3 mx-8 my-5 lg:mx-20 lg:my-10'>
                        <form
                            onSubmit={handleSubmit(submitHandler)}
                            className='grid col-span-2 grid-cols-1 md:grid-cols-2 gap-y-10'
                        >
                            <div className='mx-auto flex flex-col w-full gap-10'>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <Input
                                        onChange={(e) =>
                                            validateCreditCard(e.target.value)
                                        }
                                        value={inputValues.cardNumber}
                                        register={{ ...register("cardNumber") }}
                                        label={t("cardNum")}
                                        errorMessage={
                                            errors.cardNumber?.message
                                        }
                                        placeholder={t("cardNumInput")}
                                        name='cardNumber'
                                    />
                                </div>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <Input
                                        label={t("date")}
                                        value={inputValues.expiryDate}
                                        register={{ ...register("expiryDate") }}
                                        errorMessage={
                                            errors.expiryDate?.message
                                        }
                                        placeholder={t("expiryDateInput")}
                                        name='expiryDate'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <Input
                                        label={t("CVC")}
                                        value={inputValues.CVC}
                                        register={{ ...register("CVC") }}
                                        errorMessage={errors.CVC?.message}
                                        placeholder={t("CVCInput")}
                                        name='CVC'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <Input
                                        label={t("name")}
                                        value={inputValues.nameOnCard}
                                        register={{ ...register("nameOnCard") }}
                                        errorMessage={
                                            errors.nameOnCard?.message
                                        }
                                        placeholder={t("nameInput")}
                                        name='nameOnCard'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='mx-auto flex flex-col w-full gap-10'>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <label className='block text-md font-medium leading-6 text-gray-900'>
                                        {t("country")}
                                    </label>
                                    <Select
                                        placeholder={t("countrySelect")}
                                        options={options}
                                        value={inputValues.country}
                                        register={{ ...register("country") }}
                                        name='country'
                                        onChange={handleChange}
                                        styles={customStyles}
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: "#159DA2",
                                            },
                                        })}
                                    />
                                    {/* <p className='text-sm text-red-500 mt-1 animate-pulse '>
                                        {inputValues.country
                                            ? ""
                                            : t("enterCountry")}
                                    </p> */}
                                </div>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <Input
                                        label={t("zip")}
                                        value={inputValues.zip}
                                        register={{ ...register("zip") }}
                                        errorMessage={errors.zip?.message}
                                        placeholder={t("ZIPInput")}
                                        name='zip'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <Input
                                        label={t("city")}
                                        value={inputValues.city}
                                        register={{ ...register("city") }}
                                        errorMessage={errors.city?.message}
                                        placeholder={t("cityInput")}
                                        name='city'
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mx-10 sm:mx-auto sm:w-96 md:w-64 lg:w-80 2xl:w-96 h-20'>
                                    <Input
                                        label={t("address")}
                                        value={inputValues.address}
                                        register={{ ...register("address") }}
                                        errorMessage={errors.address?.message}
                                        placeholder={t("cityInput")}
                                        name='address'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='flex justify-center mt-16 md:mt-0 md:justify-start md:pl-24 my-5 h-20'
                            >
                                <Button
                                    buttonText={t("addCard")}
                                    buttonSize='lg'
                                />
                            </button>
                        </form>
                        <div className='flex-col items-center justify-evenly py-3 gap-5 hidden xl:flex'>
                            <Image
                                className='w-fit mx-auto object-cover'
                                width={300}
                                height={300}
                                src='/Images/MasterCard.png'
                                alt=''
                            />
                            <Image
                                className='w-fit mx-auto object-cover'
                                width={300}
                                height={300}
                                src='/Images/VisaCard.png'
                                alt=''
                            />
                        </div>
                    </div>
                    <></>
                </main>
            )}
        </Layout>
    );
}

export default AddNewCard;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "addnewcard"])),
            // Will be passed to the page component as props
        },
    };
}

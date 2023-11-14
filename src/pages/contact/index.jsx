import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Layout from "@/layout/Layout";
import Button from "@/components/elements/Button";

function Contact() {
    const [selectedOption, setSelectedOption] = useState(null);

    const { t } = useTranslation("common");

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Layout>
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
                        <form className='flex flex-col gap-3'>
                            <h4 className='text-xl lg:text-2xl font-medium'>
                                {t("contact.type")}
                            </h4>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='question'
                                    checked={selectedOption === "question"}
                                    onChange={handleRadioChange}
                                    className='mx-2 accent-DarkTeal'
                                />
                                {t("contact.radioOne")}
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='clientSupport'
                                    checked={selectedOption === "clientSupport"}
                                    onChange={handleRadioChange}
                                    className='mx-2 accent-DarkTeal'
                                />
                                {t("contact.radioTwo")}
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='counselorInterested'
                                    checked={
                                        selectedOption === "counselorInterested"
                                    }
                                    onChange={handleRadioChange}
                                    className='mx-2 accent-DarkTeal'
                                />
                                {t("contact.radioThree")}
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='counselorSupport'
                                    checked={
                                        selectedOption === "counselorSupport"
                                    }
                                    onChange={handleRadioChange}
                                    className='mx-2 accent-DarkTeal'
                                />
                                {t("contact.radioFour")}
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='businessInquiry'
                                    checked={
                                        selectedOption === "businessInquiry"
                                    }
                                    onChange={handleRadioChange}
                                    className='mx-2 accent-DarkTeal'
                                />
                                {t("contact.radioFive")}
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='organizationInterest'
                                    checked={
                                        selectedOption ===
                                        "organizationInterest"
                                    }
                                    onChange={handleRadioChange}
                                    className='mx-2 accent-DarkTeal'
                                />
                                {t("contact.radioSix")}
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='billingQuestion'
                                    checked={
                                        selectedOption === "billingQuestion"
                                    }
                                    onChange={handleRadioChange}
                                    className='mx-2 accent-DarkTeal'
                                />
                                {t("contact.radioSeven")}
                            </label>

                            <div className='grid lg:grid-cols-2 pt-8 gap-5'>
                                <div>
                                    <label className='font-medium'>
                                        {t("contact.name")}
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        type='text'
                                        placeholder={t(
                                            "contact.namePlaceholder"
                                        )}
                                    />
                                </div>
                                <div>
                                    <label className='font-medium'>
                                        {t("contact.email")}
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        type='email'
                                        placeholder={t(
                                            "contact.emailPlaceholder"
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='lg:pt-3'>
                                <label className='font-medium grid-span-2'>
                                    {t("contact.details")}
                                </label>
                                <textarea
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none h-24'
                                    placeholder={t(
                                        "contact.detailsPlaceholder"
                                    )}
                                />
                            </div>

                            <Link
                                href='/contactThankYou'
                                className='mx-auto mb-16'
                            >
                                <Button
                                    buttonText={t("contact.submit")}
                                    buttonSize='lg'
                                />
                            </Link>
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

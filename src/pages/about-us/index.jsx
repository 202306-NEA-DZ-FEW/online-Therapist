// pages/About.jsx
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Layout from "@/layout/Layout";
import Image from "next/image";

export default function About() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <div className='max-w-screen-lg mx-auto p-4'>
                {/* First Section */}
                <section className='my-4 lg:my-8 flex flex-col md:flex-row items-center justify-center lg:justify-between bg-gray-100 p-8 rounded-lg border border-gray-300 transition duration-500 ease-in-out transform lg:hover:scale-105'>
                    <div className='w-full md:w-1/2 lg:w-5/12 mx-auto md:order-2 mb-4 md:mb-0'>
                        <Image
                            src='/Images/photo1.jpeg'
                            alt='Inner Space Therapy 1'
                            width={800}
                            height={600}
                            className='rounded-md shadow-md'
                        />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-5/12 mx-auto md:order-1 text-center md:text-left'>
                        <h1 className='rtl:text-right text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-Teal'>
                            {t("titre11")}
                        </h1>
                        <p className='rtl:text-right text-lg text-gray-700 mb-4'>
                            {t("about1")}
                        </p>
                    </div>
                </section>

                {/* Second Section */}
                <section className='my-4 lg:my-8 flex flex-col md:flex-row items-center justify-center lg:justify-between bg-blue-100 p-6 rounded-md border border-blue-500 hover:border-blue-700 transition duration-300 ease-in-out transform lg:hover:scale-105'>
                    <div className='w-full md:w-1/2 lg:w-5/12 mx-auto md:order-1 mb-4 md:mb-0'>
                        <Image
                            src='/Images/photo2.jpeg'
                            alt='Inner Space Therapy 2'
                            width={800}
                            height={600}
                            className='rounded-md shadow-md'
                        />
                    </div>
                    <div className='w-full md:w-1/2 lg:w-5/12 mx-auto md:order-2 text-center md:text-left'>
                        <h1 className='rtl:text-right text-4xl font-extrabold text-Teal mb-2'>
                            {t("titre21")}
                        </h1>
                        <p className='rtl:text-right text-lg text-gray-600 mb-4'>
                            {t("about2")}
                        </p>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

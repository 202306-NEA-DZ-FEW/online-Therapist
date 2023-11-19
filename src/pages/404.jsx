// pages/404.jsx
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "@/layout/Layout";
import React, { useEffect } from "react";

export default function NotFoundPage() {
    const router = useRouter();
    const language = router.locale;
    const { t } = useTranslation("common");

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);
    return (
        <Layout>
            <div className='container mx-auto h-screen flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8'>
                <div className='order-2 lg:order-1 text-center lg:text-left mb-8 lg:mb-0'>
                    <h1 className='rtl:text-right text-5xl font-bold mb-4'>
                        {t("404.titre")}
                    </h1>
                    <p className='rtl:text-right text-lg text-gray-600 text-2xl'>
                        {t("404.text")}
                    </p>
                </div>
                <div className='order-1 lg:order-2 lg:ml-8'>
                    <Image
                        src='/Images/404.svg'
                        alt='404 Image'
                        width={850}
                        height={550}
                    />
                </div>
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

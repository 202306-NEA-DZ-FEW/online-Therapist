import Layout from "@/layout/Layout";
import Link from "next/link";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Button from "@/components/elements/Button";

function ContactThankYou() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <main className='mx-8 mt-5 lg:mx-20 lg:mt-10 h-[60vh] font-atkinson'>
                <h1 className='text-4xl lg:text-5xl font-medium pb-4 bg-LightBeige lg:bg-inherit text-center p-3 lg:text-left lg:p-0 rounded-lg rtl:lg:text-right'>
                    {t("contactThankYou.title")}
                </h1>
                <p className='text-xl lg:text-2xl text-center lg:text-left text-gray-500 my-5 rtl:lg:text-right'>
                    {t("contactThankYou.description")}
                </p>
                <Link href='/' className='mx-auto'>
                    <Button
                        buttonText={t("contactThankYou.button")}
                        buttonSize='lg'
                    />
                </Link>
            </main>
        </Layout>
    );
}

export default ContactThankYou;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

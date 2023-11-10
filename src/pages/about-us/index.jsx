import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Layout from "@/layout/Layout";
import Image from "next/image";

export default function About() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <div className='w-full lg:w-full bg-white flex justify-center items-center h-screen'>
                <div className='w-full max-w-screen-lg p-4'>
                    <section className='w-full relative my-4 lg:my-0'>
                        <h1 className='rtl:text-right text-3xl font-bold sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl'>
                            {t("titre11")}
                        </h1>
                        <p className='text-description'>{t("about1")}</p>
                    </section>
                    <section className='w-full bg-[#ace2e4] relative my-4 lg:my-0'>
                        <Image
                            className='w-full lg:w-[400px] lg:h-[246px] max-w-full mx-auto sm:max-w-xs md:max-w-sm lg:max-w-lg'
                            alt='Rectangle'
                            src='https://c.animaapp.com/l6bgJnV5/img/rectangle.svg'
                            width={500}
                            height={500}
                        />
                        <div className='w-full'>
                            <h1 className='text-3xl font-bold sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl'>
                                {t("titre21")}
                            </h1>

                            <p className='text-description'>{t("about2")}</p>
                        </div>
                    </section>
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

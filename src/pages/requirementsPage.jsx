import React from "react";
import Layout from "@/layout/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/components/elements/Buttons/Button";

function RequirementsPage() {
    const { t } = useTranslation("common");

    const router = useRouter();
    const language = router.locale;

    useEffect(() => {
        document.body.dir = language === "ar" ? "rtl" : "ltr";
    }, [language]);

    return (
        <>
            <Layout>
                <div className='flex flex-col-reverse sm:flex-row'>
                    <div className='w-full sm:w-2/3 p-5 sm:p-10'>
                        <h1 className='text-2xl font-bold text-Teal pb-5 text-center  sm:text-center'>
                            {t("requirement.principaleTitle")}
                        </h1>
                        <h3 className='text-lg font-semibold text-Teal p-1'>
                            {t("requirement.title1")}
                        </h3>
                        <p
                            className={`pb-3 ${
                                language === "ar" ? "text-right" : ""
                            }`}
                        >
                            {t("requirement.paragraph1")}
                        </p>
                        <h3 className='text-lg font-semibold text-Teal p-1'>
                            {t("requirement.title2")}
                        </h3>
                        <p
                            className={`pb-3 ${
                                language === "ar" ? "text-right" : ""
                            }`}
                        >
                            {t("requirement.paragraph2")}
                        </p>
                        <h3 className='text-lg font-semibold text-Teal p-1'>
                            {t("requirement.title3")}
                        </h3>
                        <p
                            className={`pb-3 ${
                                language === "ar" ? "text-right" : ""
                            }`}
                        >
                            {t("requirement.paragraph3")}
                        </p>
                    </div>
                    <div className='w-full sm:w-1/3 p-5 sm:p-10 text-center sm:text-left'>
                        <Image
                            src='/images/therapist1.png'
                            alt='therapist illustration'
                            width={600}
                            height={300}
                        />
                    </div>
                </div>

                <div className={`pl-10 ${language === "ar" ? "pr-10" : ""}`}>
                    <h1 className='text-2xl font-bold text-Teal pb-5'>
                        {t("requirement.principaleTitle2")}
                    </h1>
                    <ul
                        className={`list-disc ${
                            language === "ar" ? "text-right" : ""
                        }`}
                    >
                        <li> {t("requirement.li1")}</li>
                        <li>{t("requirement.li2")}</li>
                        <li> {t("requirement.li3")}</li>
                        <li> {t("requirement.li4")}</li>
                        <li> {t("requirement.li5")}</li>
                    </ul>
                </div>

                <div className='p-10'>
                    <Link href='/therapists/signup'>
                        <Button
                            buttonText={t("requirement.getStarted")}
                            buttonSize='lg'
                        />
                    </Link>
                </div>
            </Layout>
        </>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

export default RequirementsPage;

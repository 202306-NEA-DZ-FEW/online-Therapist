import OpenPos from "@/components/OpenPos";
import Layout from "@/layout/Layout";
import { useRef } from "react";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Button from "@/components/elements/Buttons/Button";

function Careers() {
    const openPositions = useRef(null);
    const { t } = useTranslation("common");

    const handleClick = () => {
        openPositions.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Layout className='font-atkinson'>
            <div className='mx-8 my-5 lg:mx-20 lg:my-10'>
                <h1 className='text-4xl lg:text-5xl pb-4 bg-LightBeige lg:bg-inherit text-center p-3 lg:text-left lg:p-0 rounded-lg lg:rtl:text-right'>
                    {t("careers.mainTitle")}
                </h1>
                <p className='text-xl lg:text-2xl text-center mb-14 lg:text-left lg:rtl:text-right text-Gray'>
                    {t("careers.motto")}
                </p>
                <p className='text-lg lg:text-xl mb-14'>
                    {t("careers.description")}
                </p>
                <p className='text-lg lg:text-xl mb-4'>
                    {t("careers.callToAction")}
                </p>
                <Button
                    buttonText={t("careers.buttonText")}
                    buttonSize='lg'
                    transition={false}
                    clickFunction={handleClick}
                />
            </div>
            <div className='bg-LightOrange px-8 mt-5 py-4 lg:px-20 lg:mt-10 '>
                <h1 className='text-4xl lg:text-5xl font-normal pb-4 text-center p-3 lg:text-left lg:rtl:text-right lg:p-0 rounded-lg text-Gray mb-5'>
                    {t("careers.subTitle")}
                </h1>
                <p className='text-xl lg:text-2xl text-left rtl:text-right text-Gray'>
                    {t("careers.subDescription")}
                </p>
            </div>
            <div className='mx-8 my-5 lg:mx-20 lg:my-10'>
                <h1 className='text-4xl lg:text-5xl pb-4 bg-LightBeige lg:bg-inherit text-center p-3 lg:text-left lg:p-0 rounded-lg mb-2 lg:rtl:text-right'>
                    {t("careers.positions")}
                </h1>
                <p className='text-xl lg:text-2xl text-Gray'>
                    {t("careers.sendEmail")}
                </p>
            </div>
            <div
                ref={openPositions}
                className='mx-8 my-5 lg:mx-20 lg:my-10 bg-LightBeige px-4 pt-4 rounded-lg max-h-screen overflow-auto'
            >
                <OpenPos
                    title='Senior Software Developer | Backend | Remote in Algeria'
                    description='Inner Space is looking for a Senior Software Developer to join our Application Developement team.'
                    type='Engineering'
                    typeInfo='Application Development'
                />
                <OpenPos
                    title='Senior Software Developer | Rapid Prototyping | Remote in'
                    description='Inner Space is looking for a Senior Software Developer to join our Rapid Prototyping Team (RPT). This team is responsible for working closely with product managers to take ideas for new features and quickly validate their technical and business feasibility'
                    type='Engineering'
                    typeInfo='Rapid Prototyping'
                />
                <OpenPos
                    title='Senior Product Analyst | Remote in Algeria'
                    description='Inner Space is looking for a Product Analyst to define our suite of product metrics.'
                    type='Engineering'
                    typeInfo='Business Intelligence'
                />
                <OpenPos
                    title='Business Intelligence Manager | Remote in Algeria'
                    description='Inner Space  is hiring a Manager of Business Intelligence to lead our analytics and data warehousing efforts in a new phase of development.'
                    type='Engineering'
                    typeInfo='Business Intelligence'
                />
            </div>
        </Layout>
    );
}

export default Careers;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

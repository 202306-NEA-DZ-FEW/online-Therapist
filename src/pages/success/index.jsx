import Thankyou from "@/components/Thankyou/Thankyou";
import React from "react";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Success() {
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Thankyou text1={t("buyticket.thankstext")} />
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

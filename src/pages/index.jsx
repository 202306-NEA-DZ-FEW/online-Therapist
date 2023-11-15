// import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import HomePageWrapper from "@/components/Home/HomePageWrapper";

import Layout from "@/layout/Layout";

export default function HomePage() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <HomePageWrapper />
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "homepage"])),
            // Will be passed to the page component as props
        },
    };
}

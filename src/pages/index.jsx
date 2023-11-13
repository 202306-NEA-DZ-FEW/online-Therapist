// import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";

import HomePageWrapper from "@/components/Home/HomePageWrapper";

import Layout from "@/layout/Layout";
import Link from "next/link";

export default function HomePage() {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <div>
                <Link href='#' locale='en' className='hover:text-Teal'>
                    English
                </Link>
                <Link href='#' locale='ar' className='hover:text-Teal'>
                    العربية
                </Link>
            </div>
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

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
            <div className='space-y-2 z-50 '>
                                            <Link
                                                href='#'
                                                locale='en'
                                                className='hover:text-Teal'
                                            >
                                                <li className='w-full hover:bg-gray-50'>
                                                    English
                                                </li>
                                            </Link>
                                            <Link
                                                href='#'
                                                locale='ar'
                                                className='hover:text-Teal'
                                            >
                                                <li className='w-full hover:bg-gray-50'>
                                                    العربية
                                                </li>
                                            </Link>
                                        </div>
            <HomePageWrapper />
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

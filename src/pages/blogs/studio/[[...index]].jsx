import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextStudio } from "next-sanity/studio";
import { metadata } from "next-sanity/studio/metadata";

import config from "../../../../sanity.config";
export default function StudioPage() {
    const { t } = useTranslation("common");
    return (
        <>
            <Head>
                {Object.entries(metadata).map(([key, value]) => (
                    <meta key={key} name={key} content={value} />
                ))}
            </Head>
            <NextStudio config={config} />
        </>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { groq } from "next-sanity";
import * as React from "react";

import HomePageWrapper from "@/components/Home/HomePageWrapper";

import Layout from "@/layout/Layout";

import { client } from "../../sanity/lib/client";

export default function HomePage({ posts }) {
    const { t } = useTranslation("common");

    return (
        <Layout>
            <HomePageWrapper posts={posts} />
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    const query = groq`*[_type == "post" && language == $locale]{
                    ...,
                    author->,
                    categories[]->
                    | order(created_At desc)}[0..9]`;
    const posts = await client.fetch(query, { locale: locale });
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "homepage"])),
            posts,
        },
    };
}

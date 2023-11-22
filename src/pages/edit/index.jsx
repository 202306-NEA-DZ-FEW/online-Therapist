import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import Thankyou from "@/components/Thankyou/Thankyou";

import Layout from "@/layout/Layout";

const User = ({ t }) => {
    return (
        <Layout>
            <Thankyou text1={t("users:text2")} />
        </Layout>
    );
};
export default withTranslation("users")(User);
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "users"])),
            // Will be passed to the page component as props.
        },
    };
}

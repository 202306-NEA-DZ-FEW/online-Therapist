import { UserAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
// import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const patientProfile = () => {
    // const { t } = useTranslation("common");
    const { user } = UserAuth();

    return (
        <Layout>
            <div className='text-4xl text-center'>
                <div>
                    {user ? (
                        <div>Welcome, {user.displayName}</div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>{" "}
            </div>
        </Layout>
    );
};

export default patientProfile;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

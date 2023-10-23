import { useAppcontext } from "@/context/context";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Profile() {
    const { user } = useAppcontext();

    return (
        <Layout>
            <h1 className='text-center font-atkinson font-bold text-3xl md:pt-12'>
                profile
            </h1>
            <h3 className='text-center'>
                {user ? (
                    <>
                        <p>Name: {user.displayName}</p>
                        <p>Email: {user.email}</p>
                    </>
                ) : (
                    "Please sign in"
                )}
            </h3>
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

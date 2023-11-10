import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

import Input from "@/components/Input";

import { useAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
const Profile = ({ t }) => {
    const [edit, setEdit] = useState(false);
    const { user } = useAuth();

    return (
        <Layout>
            <div className='container mx-auto font-atkinson '>
                {(user.isTherapist && (
                    <div className='grid grid-cols-1 lg:grid-cols-2 py-20 gap-y-10'>
                        <div className='justify-self-center lg:justify-self-start'>
                            Photo component
                        </div>

                        <div className='w-full'>
                            <form className='w-full  justify-self-center lg:justify-self-end'>
                                <legend class='text-4xl mx-2 font-medium uppercase'>
                                    {t("therapist profile")}
                                </legend>
                                <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                    <Input
                                        label='Your Name'
                                        styles='md:ml-24 rtl:md:mr-24'
                                        isDisabled={!edit}
                                        placeholder='test'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                )) || <div></div>}
            </div>
        </Layout>
    );
};

export default withTranslation("therapists")(Profile);

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "therapists"])),
            // Will be passed to the page component as props.
        },
    };
}

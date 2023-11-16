import { useState } from "react";
import {
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import { auth } from "@/util/firebase";
import Layout from "@/layout/Layout";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function ChangePassword() {
    const router = useRouter();
    const language = router.locale;
    const { t } = useTranslation("password");

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(
            user.email,
            oldPassword
        );

        try {
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);
            toast.success(
                {
                    content: t("button"),
                },
                {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    newestOnTop: false,
                    closeOnClick: true,
                    rtl: false,
                    pauseOnFocusLoss: true,
                    draggable: true,
                    pauseOnHover: true,
                }
            );
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout>
            <div className='max-w-md mx-auto p-4'>
                {error && (
                    <p className='bg-red-500 text-white p-2 mb-4'>{error}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='old-password'>{t("input1")}</label>
                        <Input
                            type='password'
                            id='old-password'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className='w-full border p-2'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='new-password'>{t("input2")}</label>
                        <Input
                            type='password'
                            id='new-password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='w-full border p-2'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit'>
                            <Button
                                transition={false}
                                buttonText={t("button")}
                            />
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </Layout>
    );
}
export default ChangePassword;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["password"])),
        },
    };
}

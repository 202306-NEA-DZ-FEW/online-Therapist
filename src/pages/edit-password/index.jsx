import React, { useEffect, useState } from "react";
import {
    getAuth,
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
import { DotLoader } from "react-spinners";

function ChangePassword() {
    const router = useRouter();
    const language = router.locale;
    const { t } = useTranslation("common");

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [changed, setChanged] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const user = auth.currentUser;
        console.log("Current User:", user);
        if (!oldPassword) {
            setError(t("password.oldPasswordRequired"));
            return;
        }

        if (!newPassword) {
            setError(t("password.newPasswordRequired"));
            return;
        }

        if (!user) {
            toast.error(t("password.authError"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
            });
            setLoading(false);

            return;
        }

        const credential = EmailAuthProvider.credential(
            user.email,
            oldPassword
        );

        try {
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword, oldPassword);
            setChanged(true);
            setLoading(false);

            // Show success message
            toast.success(t("password.message"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                onClose: () => {
                    // Redirect to the home page after the toast is closed
                    router.push("/");
                },
            });
        } catch (error) {
            let message = "";

            // let message = t('password.defaultError', { errorMessage: error.message });

            if (error.code !== "auth/internal-error") {
                message = t("password.wrongPasswordError");
            }

            // Show error toast
            toast.error(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
            });
        }
    };

    return (
        <Layout>
            <div className='max-w-md mx-auto p-4'>
                {error && (
                    <p className='bg-red-500 text-white p-2 mb-4'>{error}</p>
                )}
                <form
                    className='p-6 bg-gray-100 rounded-lg shadow-md'
                    onSubmit={handleSubmit}
                >
                    <div className='mb-4'>
                        <label htmlFor='old-password'>
                            {t("password.input1")}
                        </label>

                        <Input
                            type='password'
                            id='old-password'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className='w-full border p-2'
                        />
                    </div>
                    <div className='mb-4'>

                        <label htmlFor='new-password'>
                            {t("password.input2")}
                        </label>
                        <Input
                            type='password'
                            id='new-password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='w-full border p-2'
                        />
                    </div>
                    <div className='flex justify-center'>

                        {loading && (
                            <div className='text-center'>
                                <DotLoader
                                    loading={loading}
                                    color='blue-500'
                                    size={32}
                                    className='mx-auto'
                                />
                            </div>
                        )}

                        <button
                            type='submit'
                            //disabled={loading}
                            onClick={handleSubmit}
                        >
                            <Button
                                transition={false}
                                buttonText={
                                    loading
                                        ? t("password.Loading")
                                        : t("password.button")
                                }
                            />
                        </button>

                        {/*  <button type='submit'>
                            <Button
                                transition={false}
                                buttonText={t("password.button")}
                            />
                        </button> */}
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
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

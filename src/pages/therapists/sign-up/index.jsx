import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";

import Layout from "@/layout/Layout";
import { auth, db } from "@/util/firebase";
import Thankyou from "@/components/Thankyou/Thankyou";

const TherapistSignUp = ({ t }) => {
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        city: "",
        licenseNumber: "",
        password: "",
        confirPassword: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validationSchema = yup.object().shape({
        username: yup.string().required(t("therapists:formErrors.username")),
        email: yup.string().required(t("therapists:formErrors.email")),
        licenseNumber: yup
            .string()
            .required(t("therapists:formErrors.license")),
        city: yup.string().required(t("therapists:formErrors.city")),

        password: yup
            .string()
            .required(t("therapists:formErrors.password"))
            .min(8, t("therapists:formErrors.passwordMin")),
        confirPassword: yup
            .string()
            .required(t("therapists:formErrors.password"))
            .oneOf(
                [yup.ref("password")],
                t("therapists:formErrors.passwordMatch")
            ),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            if (userCredential) {
                console.log("Success UID: ", userCredential.user.uid);
            }
            await setDoc(
                doc(
                    db,
                    process.env.NEXT_PUBLIC_THERAPIST_COLLECTION,
                    userCredential.user.uid
                ),
                {
                    uid: userCredential.user.uid,
                    username: formData.username,
                    email: formData.email,
                    licenseNumber: formData.licenseNumber,
                    city: formData.city,
                    approved: false,
                }
            );
        } catch (error) {
            console.error("Error signing up:", error);
        } finally {
            setSignupSuccess(true);
        }
    };
    const { register, handleSubmit, formState } = useForm(formOptions);

    const { errors } = formState;
    return (
        <Layout>
            {signupSuccess ? (
                <Thankyou
                    text1='Thank you for your interest in working with Healing, we have recieved your application.'
                    text2='You will receive an email guiding you for the next steps soon after your information is reviewed.'
                />
            ) : (
                <div className='container mx-auto my-10 flex flex-col md:flex-row '>
                    <div className='p-8 shadow-lg lg:p-4 rounded w-full'>
                        <form
                            className='space-y-4 lg:space-y-4'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h2 className='font-normal block text-3xl md:text-4xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words text-black/80 mx-5 mb-10'>
                                {/* create an account */}

                                {t("therapists:heading")}
                            </h2>
                            <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row lg:space-x-2 lg:m-2 '>
                                <Input
                                    width='full'
                                    type='text'
                                    placeholder={t(
                                        "therapists:placeholder.username"
                                    )}
                                    name='username'
                                    errorMessage={errors.username?.message}
                                    register={{ ...register("username") }}
                                    value={formData.username}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row lg:space-x-2 lg:m-2'>
                                <Input
                                    width='full'
                                    type='email'
                                    placeholder={t(
                                        "therapists:placeholder.email"
                                    )}
                                    name='email'
                                    errorMessage={errors.email?.message}
                                    register={{ ...register("email") }}
                                    value={formData.email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row lg:space-x-2 lg:m-2'>
                                <Input
                                    width='full'
                                    type='text'
                                    placeholder={t(
                                        "therapists:placeholder.city"
                                    )}
                                    name='city'
                                    errorMessage={errors.city?.message}
                                    register={{ ...register("city") }}
                                    value={formData.city}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row lg:space-x-2 lg:m-2'>
                                <Input
                                    width='full'
                                    type='text'
                                    placeholder={t(
                                        "therapists:placeholder.license"
                                    )}
                                    name='licenseNumber'
                                    errorMessage={errors.licenseNumber?.message}
                                    register={{ ...register("licenseNumber") }}
                                    value={formData.licenseNumber}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row  lg:space-x-2 lg:m-2'>
                                <Input
                                    width='full'
                                    type='password'
                                    placeholder={t(
                                        "therapists:placeholder.password"
                                    )}
                                    name='password'
                                    errorMessage={errors.password?.message}
                                    register={{ ...register("password") }}
                                    value={formData.password}
                                    onChange={onChange}
                                />
                                <Input
                                    width='full'
                                    type='password'
                                    placeholder={t(
                                        "therapists:placeholder.passwordConfirm"
                                    )}
                                    name='confirPassword'
                                    errorMessage={
                                        errors.confirPassword?.message
                                    }
                                    register={{ ...register("confirPassword") }}
                                    value={formData.confirPassword}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='flex items-start justify-start space-x-4 py-4 lg:space-x-9 mx-5 w-full'>
                                <button type='submit'>
                                    <Button
                                        transition={false}
                                        buttonText={t("therapists:buttonText")}
                                        buttonSize='lg'
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='md:m-auto lg:m-auto hidden lg:flex'>
                        <Image
                            src='/Images/therapist.svg'
                            width={600}
                            height={600}
                            alt='online therapy'
                            className='min-w-[30rem] min-h-[30rem] mx-20'
                        />
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default withTranslation("therapists")(TherapistSignUp);

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["therapists", "common"])),
            // Will be passed to the page component as props
        },
    };
}

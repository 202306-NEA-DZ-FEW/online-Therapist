import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { auth } from "@/util/firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "@/util/firebase";
import Layout from "@/layout/Layout";
import Link from "next/link";
import Thankyou from "@/components/Thankyou/Thankyou";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Input from "@/components/elements/Input";
import { UserAuth } from "@/context/AuthContext";
import Button from "@/components/elements/Button";

export default function SignUp() {
    const { t } = useTranslation("common");
    const {
        AuthWithGoogle,
        AuthWithFacebook,
        isSignUpSuccessful,
        setIsSignUpSuccessful,
    } = UserAuth();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        confirmemail: "",
        password: "",
        confirmpassword: "",
        birthDate: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (data) => {
        try {
            // Create a user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const user = userCredential.user;
            sendEmailVerification(auth.currentUser).then(() => {
                // Email verification sent!
                // ...
            });
            updateProfile(userCredential.user, {
                displayName: formData.firstname + " " + formData.lastname,
            });

            // Save user information in Firestore
            const userCollection = collection(db, "users");
            await setDoc(doc(userCollection, user.uid), {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                birthDate: formData.birthDate,
                uid: user.uid,
            });

            console.log("User signed up:", user);
            setIsSignUpSuccessful(true);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await AuthWithGoogle();
        } catch (error) {
            console.log(error);
        }
    };

    const handleFacebookSignup = async () => {
        try {
            await AuthWithFacebook();
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = yup.object().shape({
        firstname: yup.string().required("First Name is required"),
        lastname: yup.string().required("Last name is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Email is invalid"),
        confirmemail: yup
            .string()
            .required("Email is required")
            .email("Email is invalid")
            .oneOf([yup.ref("email")], "Email don't match"),
        password: yup
            .string()
            .required("password is required")
            .min(8, "Password must be at least 8 characters"),
        confirmpassword: yup
            .string()
            .required("password is required")
            .oneOf([yup.ref("password")], "Password don't match"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <Layout>
            <div className='md:flex lg:flex lg:pb-20 pb-10'>
                {isSignUpSuccessful ? ( // Conditionally render the thank you page
                    <Thankyou
                        text1={t("signupthank.text1")}
                        text2={t("signupthank.text2")}
                    />
                ) : (
                    <>
                        <div className='md:m-auto lg:m-auto'>
                            <h1 className='text-center font-atkinson font-bold text-4xl pt-4 md:pb-6 lg:text-6xl lg:pb-6'>
                                {t("signup.heading")}
                            </h1>
                            <Image
                                src='/signuppp.svg'
                                width={600}
                                height={600}
                                alt='online therapy'
                                className='m-auto w-96 pb-6 md:w-96 lg:w-full'
                            />
                        </div>
                        <div className='w-96 space-y-6 m-auto md:w-1/2 lg:w-2/5 lg:space-y-6'>
                            <h1 className='text-center font-atkinson font-bold text-3xl md:pt-12'>
                                {t("signup.signupNow")}
                            </h1>
                            <div className='p-8 shadow-lg lg:p-4 rounded'>
                                <form
                                    className='space-y-4 lg:space-y-4'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row lg:space-x-2 lg:m- '>
                                        <Input
                                            width='full'
                                            type='text'
                                            placeholder={t("signup.firstname")}
                                            name='firstname'
                                            errorMessage={
                                                errors.firstname?.message
                                            }
                                            register={{
                                                ...register("firstname"),
                                            }}
                                            value={formData.firstname}
                                            onChange={onChange}
                                        />
                                        <Input
                                            width='full'
                                            type='text'
                                            placeholder={t("signup.lastname")}
                                            name='lastname'
                                            errorMessage={
                                                errors.lastname?.message
                                            }
                                            register={{
                                                ...register("lastname"),
                                            }}
                                            value={formData.lastname}
                                            onChange={onChange}
                                        />
                                    </div>

                                    <div className='flex flex-col space-y-1 mx-3 lg:m-4'>
                                        <Input
                                            width='full'
                                            type='email'
                                            placeholder={t("signup.email")}
                                            name='email'
                                            errorMessage={errors.email?.message}
                                            register={{ ...register("email") }}
                                            value={formData.email}
                                            onChange={onChange}
                                        />
                                        <Input
                                            width='full'
                                            type='email'
                                            placeholder={t(
                                                "signup.emailconfirm"
                                            )}
                                            name='confirmemail'
                                            errorMessage={
                                                errors.confirmemail?.message
                                            }
                                            register={{
                                                ...register("confirmemail"),
                                            }}
                                            value={formData.confirmemail}
                                            onChange={onChange}
                                        />
                                    </div>

                                    <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row  lg:space-x-2 lg:m-2'>
                                        <Input
                                            width='full'
                                            type='password'
                                            placeholder={t("signup.password")}
                                            name='password'
                                            errorMessage={
                                                errors.password?.message
                                            }
                                            register={{
                                                ...register("password"),
                                            }}
                                            value={formData.password}
                                            onChange={onChange}
                                        />
                                        <Input
                                            width='full'
                                            type='password'
                                            placeholder={t(
                                                "signup.passwordconfirm"
                                            )}
                                            name='confirmpassword'
                                            errorMessage={
                                                errors.confirmpassword?.message
                                            }
                                            register={{
                                                ...register("confirmpassword"),
                                            }}
                                            value={formData.confirmpassword}
                                            onChange={onChange}
                                        />
                                    </div>

                                    <div className='flex justify-end items-center mx-3 lg:space-y-2 lg:mx-4'>
                                        <p className='text-md font-medium text-gray-900 pr-12 lg:pr-24'>
                                            {t("signup.birthdate")}
                                        </p>
                                        <Input
                                            width='1/2'
                                            type='date'
                                            name='birthDate'
                                            value={formData.birthDate}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className='flex items-center justify-center space-x-4 py-4 lg:space-x-9'>
                                        <Link href='/login/login'>
                                            <Button
                                                transition={false}
                                                buttonText={t("signup.login")}
                                            />
                                        </Link>
                                        <button type='submit'>
                                            <Button
                                                transition={false}
                                                buttonText={t("signup.signup")}
                                                color='darkteal'
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className='flex items-center justify-center space-x-4 '>
                                <hr className='w-24 lg:w-48 border-Teal' />
                                <p className='text-lg'> {t("signup.or")}</p>
                                <hr className='w-24 lg:w-48 border-Teal' />
                            </div>
                            <div className='flex justify-center items-center space-x-12'>
                                <span
                                    onClick={handleGoogleSignup}
                                    className='cursor-pointer '
                                >
                                    <Image
                                        src='/google.svg'
                                        width={30}
                                        height={30}
                                        alt='google'
                                        className=' '
                                    />
                                </span>

                                <span
                                    onClick={handleFacebookSignup}
                                    className='cursor-pointer'
                                >
                                    <Image
                                        src='/facebook.svg'
                                        width={30}
                                        height={30}
                                        alt='facebook'
                                        className=' '
                                    />
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
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

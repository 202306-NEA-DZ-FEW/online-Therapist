import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/util/firebase";
import { useAppcontext } from "@/context/context";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter();
    const { googleSignup, user, facebookSignup } = useAppcontext();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = () => {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                console.log("User logged in:", userCredential);
                router.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("can't log in", errorMessage, " ", errorCode);
            });
    };

    const handleGoogleSignup = async () => {
        try {
            await googleSignup();
        } catch (error) {
            console.log(error);
        }
    };

    const handleFacebookSignup = async () => {
        try {
            const userCredential = await facebookSignup();
            console.log("facebook signed up:", userCredential);
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Email is invalid"),
        password: yup
            .string()
            .required("password is required")
            .min(8, "Password must be at least 8 characters"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <Layout>
            <div className='md:flex lg:flex lg:px-32'>
                <div className='w-96 space-y-6 m-auto md:w-1/2 lg:w-1/3 lg:space-y-8 '>
                    <h1 className='text-center font-atkinson font-bold text-3xl mt-4  md:pt-12'>
                        WELCOME BACK!
                        {!user ? (
                            <p>Please sign in</p>
                        ) : (
                            <p className='text-center'>logged</p>
                        )}
                    </h1>
                    <div className='p-8 shadow-lg lg:p-4 rounded'>
                        <form
                            className='space-y-4 lg:space-y-6'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='flex flex-col space-y-1 mx-3 lg:m-4'>
                                <Input
                                    width='full'
                                    type='email'
                                    placeholder='Your Email'
                                    name='email'
                                    errorMessage={errors.email?.message}
                                    register={{ ...register("email") }}
                                    value={formData.email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='flex flex-col space-y-1 mx-3 lg:m-4'>
                                <Input
                                    width='full'
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    errorMessage={errors.password?.message}
                                    register={{ ...register("password") }}
                                    value={formData.password}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='flex items-center justify-center space-x-4 py-4 lg:space-x-9'>
                                <Link href='/signUp/signUp'>
                                    <Button
                                        transition={false}
                                        buttonText='Signup'
                                    />
                                </Link>
                                <button type='submit'>
                                    <Button
                                        transition={false}
                                        buttonText='Login'
                                        color='darkteal'
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='flex items-center justify-center space-x-4 '>
                        <hr className='w-24 lg:w-48 border-Teal' />
                        <p className='text-lg'>Or</p>
                        <hr className='w-24 lg:w-48 border-1 border-Teal' />
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
                <div className='hidden md:block md:m-auto lg:block lg:m-auto'>
                    <Image
                        src='/signupp.svg'
                        width={600}
                        height={600}
                        alt='online therapy'
                        className='m-auto w-96 pb-6 md:w-96 '
                    />
                </div>
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

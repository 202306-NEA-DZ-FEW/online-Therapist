import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { BsFacebook, BsGoogle } from "react-icons/bs";
import * as yup from "yup";

import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";

import { UserAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
import { auth } from "@/util/firebase";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Login = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, AuthWithGoogle, AuthWithFacebook } = UserAuth();

    const handleSignIn = async () => {
        // e.preventDefault();

        // try {
        //     await signInWithEmailAndPassword(auth, email, password);
        //     // Redirect to the profile page after successful login
        //     router.push("/patientProfile/patientProfile");
        // } catch (error) {
        //     console.error("Email login error", error);
        // }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                router.push("/patientProfile/patientProfile");
                const user = userCredential.user;
                console.log("User logged in:", user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("can't log in", errorMessage, " ", errorCode);
            });
    };

    // const handleGoogleLogin = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, googleProvider);
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         // IdP data available using getAdditionalUserInfo(result)

    //         // Redirect to the profile page after successful Google login
    //     } catch (error) {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         //   const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     }
    // };

    // const handleFacebookLogin = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, facebookProvider);
    //         // The signed-in user info.
    //         const user = result.user;

    //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //         const credential =
    //             FacebookAuthProvider.credentialFromResult(result);
    //         const accessToken = credential.accessToken;

    //         // IdP data available using getAdditionalUserInfo(result)

    //         // Redirect to the profile page after successful Facebook login
    //     } catch (error) {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = FacebookAuthProvider.credentialFromError(error);
    //         // ...
    //     }
    // };

    const handleGoogleLogin = async () => {
        try {
            await AuthWithGoogle();
        } catch (error) {
            console.log(error);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await AuthWithFacebook();
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Email is invalid"),
        password: yup.string().required("password is required"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <Layout>
            <div className='flex justify-center items-center space-x-20 rtl:space-x-reverse p-10 lg:pb-28 pb-14 '>
                <div className=''>
                    <h1 className='md:text-4xl text-3xl font-atkinson w-fit lg:mb-16 mb-10 uppercase'>
                        {t("login.header")}
                    </h1>
                    <div className='flex flex-col gap-10 lg:w-96 w-80 h-96 border shadow-xl rounded-lg lg:mb-6 mb-4 justify-center items-center'>
                        <form
                            onClick={handleSubmit(handleSignIn)}
                            // onSubmit={handleSubmit(LogIn)}
                            className='lg:space-y-4 space-y-14 lg:w-80 w-72 lg:h-96 h-80 lg:pt-11 pt:16  flex flex-col justify-center mx-auto hx-auto'
                        >
                            <div className='flex-1'>
                                <Input
                                    width='full'
                                    type='email'
                                    id='email'
                                    placeholder={t("login.email")}
                                    name='email'
                                    errorMessage={errors.email?.message}
                                    register={{ ...register("email") }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='flex-1'>
                                <Input
                                    width='full'
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder={t("login.password")}
                                    errorMessage={errors.password?.message}
                                    register={{ ...register("password") }}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className='flex justify-space-between lg:space-x-16 rtl:space-x-reverse space-x-8 pb-10'>
                                {/* <Link href='/patientProfile'> */}
                                <button type='submit'>
                                    <Button
                                        buttonText={t("login.logIn")}
                                        buttonSize='md'
                                    />
                                </button>
                                {/* </Link>*/}
                                <Link
                                    rel='preload'
                                    as='font'
                                    href='/signUp/signUp'
                                >
                                    <Button
                                        buttonText={t("login.signUp")}
                                        buttonSize='md'
                                    />
                                </Link>
                            </div>
                            {/* {error && <p className='error'>{error}</p>} */}
                        </form>
                    </div>

                    <div className=' flex items-center justify-center uppercase rtl:space-x-reverse space-x-4'>
                        <hr className='lg:w-28 w-20 shadow-lg bg-gray-500 border-top' />
                        <p className='text-md font-medium text-gray-500'>
                            {t("login.paragraph")}
                        </p>
                        <hr className='lg:w-28 w-20 shadow-lg bg-gray-500 border-top' />
                    </div>
                    <div className='flex justify-center items-center rtl:space-x-reverse space-x-4 pt-2'>
                        <span onClick={handleFacebookLogin}>
                            <Image
                                src='/Images/Facebook.svg'
                                width={32}
                                height={32}
                                alt='Facebook'
                                className=''
                            />
                        </span>
                        <button onClick={handleGoogleLogin}>
                            <Image
                                src='/Images/Google.svg'
                                width={32}
                                height={32}
                                alt='Google'
                                className=''
                            />
                        </button>
                    </div>
                </div>
                <div className='my-auto pt-9 hidden sm:block'>
                    <Image
                        src='/Images/LoginImage.png'
                        alt='Login image'
                        className='login-image mx-auto'
                        width={674}
                        height={404}
                        priority={true}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Login;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/util/firebase";

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        confirmemail: "",
        password: "",
        confirmpassword: "",
        date: "",
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

            console.log("User signed up:", user);
        } catch (error) {
            console.error("Error signing up:", error);
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
        <div className='md:flex lg:flex lg:h-screen'>
            <div className='md:m-auto lg:m-auto'>
                <h1 className='text-center font-atkinson font-bold text-4xl pt-4 md:pb-6 lg:text-6xl lg:pb-6'>
                    Healing starts here
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
                    SIGNUP NOW
                </h1>
                <div className='p-8 shadow-lg lg:p-4 rounded'>
                    <form
                        className='space-y-4 lg:space-y-4'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* <Input width="full" type="text" placeholder="First Name" name="first-name" text="this is help text" label="Name" hint="Optional"/> */}
                        <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row lg:space-x-2 lg:m-2'>
                            <Input
                                width='full'
                                type='text'
                                placeholder='First Name'
                                name='firstname'
                                errorMessage={errors.firstname?.message}
                                register={{ ...register("firstname") }}
                                value={formData.firstname}
                                onChange={onChange}
                            />
                            <Input
                                width='full'
                                type='text'
                                placeholder='Last Name'
                                name='lastname'
                                errorMessage={errors.lastname?.message}
                                register={{ ...register("lastname") }}
                                value={formData.lastname}
                                onChange={onChange}
                            />
                        </div>

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
                            <Input
                                width='full'
                                type='email'
                                placeholder='Confirm email'
                                name='confirmemail'
                                errorMessage={errors.confirmemail?.message}
                                register={{ ...register("confirmemail") }}
                                value={formData.confirmemail}
                                onChange={onChange}
                            />
                        </div>

                        <div className='flex flex-col space-y-1 mx-3 lg:flex lg:flex-row  lg:space-x-2 lg:m-2'>
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
                            <Input
                                width='full'
                                type='password'
                                placeholder='Confirm Password'
                                name='confirmpassword'
                                errorMessage={errors.confirmpassword?.message}
                                register={{ ...register("confirmpassword") }}
                                value={formData.confirmpassword}
                                onChange={onChange}
                            />
                        </div>

                        <div className='flex justify-end items-center mx-3 lg:space-y-2 lg:mx-4'>
                            <p className='text-md font-medium text-gray-900 pr-12 lg:pr-24'>
                                Birth Date
                            </p>
                            <Input
                                width='1/2'
                                type='date'
                                placeholder='date'
                                name='date'
                                value={formData.date}
                                onChange={onChange}
                            />
                        </div>
                        <div className='flex items-center justify-center space-x-4 py-4 lg:space-x-9'>
                            <Button transition={false} buttonText='Login' />
                            <button type='submit'>
                                <Button
                                    transition={false}
                                    buttonText='Signup'
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
            </div>
        </div>
    );
}

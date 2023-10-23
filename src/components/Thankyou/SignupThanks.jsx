import React from "react";
import Button from "../Button";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function SignupThanks() {
    const { t } = useTranslation("common");
    return (
        <div className='flex flex-col items-center justify-center font-atkinson space-y-6 lg:flex lg:flex-col lg:justify-start lg:items-start lg:m-16 h-screen'>
            <h1 className='text-4xl font-bold'>THANK YOU!</h1>
            <p className='text-xl mx-6 text-center lg:text-start lg:mx-0'>
                Your Sign Up request has been received, you will soon receive a
                confirmation email. <br />
                Please follow the steps in the email to complete and activate
                your account.
            </p>
            <Link href='/'>
                <Button
                    transition={true}
                    buttonSize='lg'
                    buttonText='BACK TO HOME'
                />
            </Link>
        </div>
    );
}

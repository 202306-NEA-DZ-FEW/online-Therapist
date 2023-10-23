import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

function contactThankYou() {
    return (
        <main className='mx-8 mt-5 lg:mx-20 lg:mt-10 font-atkinson'>
            <h1 className='text-4xl lg:text-5xl font-medium pb-4 bg-LightBeige lg:bg-inherit text-center p-3 lg:text-left lg:p-0 rounded-lg'>
                THANK YOU!
            </h1>
            <p className='text-xl lg:text-2xl text-center lg:text-left text-gray-500 my-5'>
                Your request has been sent, a Inner Space representative will
                get in contact with you through the email you provided as soon
                as possible.
            </p>
            <Link href='/' className='mx-auto'>
                <Button buttonText='Take me home!' buttonSize='lg' />
            </Link>
        </main>
    );
}

export default contactThankYou;

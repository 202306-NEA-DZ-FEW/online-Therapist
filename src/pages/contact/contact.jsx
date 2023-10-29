import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Button from "@/components/elements/Button";
import Layout from "@/layout/Layout";

function Contact() {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Layout>
            <main className='mx-8 mt-5 lg:mx-20 lg:mt-10 font-atkinson'>
                <div className='mb-10'>
                    <h1 className='text-4xl lg:text-5xl font-medium pb-4 bg-LightBeige lg:bg-inherit text-center p-3 lg:text-left lg:p-0 rounded-lg'>
                        SEND US YOUR REQUEST!
                    </h1>
                    <p className='text-xl lg:text-2xl text-center lg:text-left text-gray-500'>
                        Do you have a question, concern, idea, feedback, or
                        problem? If you need assistance, please fill out the
                        form below, and we&apos;d be happy to help!
                    </p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div>
                        <form className='flex flex-col gap-3'>
                            <h4 className='text-xl lg:text-2xl font-medium'>
                                Type of contact
                            </h4>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='question'
                                    checked={selectedOption === "question"}
                                    onChange={handleRadioChange}
                                    className='mr-2 accent-DarkTeal'
                                />
                                I have a question about the service.
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='clientSupport'
                                    checked={selectedOption === "clientSupport"}
                                    onChange={handleRadioChange}
                                    className='mr-2 accent-DarkTeal'
                                />
                                I&apos;m a registered client and I need support.
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='counselorInterested'
                                    checked={
                                        selectedOption === "counselorInterested"
                                    }
                                    onChange={handleRadioChange}
                                    className='mr-2 accent-DarkTeal'
                                />
                                I&apos;m a counselor interested in joining.
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='counselorSupport'
                                    checked={
                                        selectedOption === "counselorSupport"
                                    }
                                    onChange={handleRadioChange}
                                    className='mr-2 accent-DarkTeal'
                                />
                                I&apos;m a registered counselor and I need
                                support.
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='businessInquiry'
                                    checked={
                                        selectedOption === "businessInquiry"
                                    }
                                    onChange={handleRadioChange}
                                    className='mr-2 accent-DarkTeal'
                                />
                                I have a business-related inquiry.
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='organizationInterest'
                                    checked={
                                        selectedOption ===
                                        "organizationInterest"
                                    }
                                    onChange={handleRadioChange}
                                    className='mr-2 accent-DarkTeal'
                                />
                                I&apos;m interested in Healing Online for my
                                organization.
                            </label>
                            <label className='lg:text-lg'>
                                <input
                                    type='radio'
                                    value='billingQuestion'
                                    checked={
                                        selectedOption === "billingQuestion"
                                    }
                                    onChange={handleRadioChange}
                                    className='mr-2 accent-DarkTeal'
                                />
                                I have a billing related question.
                            </label>

                            <div className='grid lg:grid-cols-2 pt-8 gap-5'>
                                <div>
                                    <label className='font-medium'>
                                        Full Name:
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        type='text'
                                        placeholder='Enter your full name here.'
                                    />
                                </div>
                                <div>
                                    <label className='font-medium'>
                                        Email:
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        type='email'
                                        placeholder='Enter your Email address here.'
                                    />
                                </div>
                            </div>
                            <div className='lg:pt-3'>
                                <label className='font-medium grid-span-2'>
                                    {" "}
                                    Details:{" "}
                                </label>
                                <textarea
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none h-24'
                                    placeholder='Enter your details here.'
                                />
                            </div>

                            <Link
                                href='/contactThankYou'
                                className='mx-auto mb-5'
                            >
                                <Button buttonText='SUBMIT!' buttonSize='lg' />
                            </Link>
                        </form>
                    </div>
                    <div className='hidden lg:block'>
                        <Image
                            className='rounded-xl h-2/3 w-5/6 mx-auto object-cover'
                            width={5000}
                            height={3000}
                            src='/Contact.jpg'
                            alt=''
                        />
                        <div className='bg-LightTeal p-5 mx-auto mt-10 lg:w-3/4 rounded-2xl'>
                            <p>
                                Looking for more information or want to join
                                Inner Space as a counselor? Submit your
                                information and an Inner Space representative
                                will follow up with you as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Contact;

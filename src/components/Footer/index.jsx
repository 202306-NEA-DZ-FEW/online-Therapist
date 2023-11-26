import {addDoc, collection} from "firebase/firestore"
import Image from "next/image"
import Link from "next/link"
import {useTranslation} from "next-i18next"
import {useState} from "react"
import {useForm} from "react-hook-form"
import {BsTwitterX} from "react-icons/bs"
import {FaFacebook, FaGithub} from "react-icons/fa"
import {toast} from "react-toastify"

import {db} from "@/util/firebase"

import DropDown from "./DropDown"
export default function Footer () {
    const {t} = useTranslation("common")

    const [formData, setFormData] = useState([{
        email: "",
    }])
    const onChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const onSubmit = async (data) => {

        try {
            const response = await fetch("/api/news/subscribe", {
                method: "POST",
                body: JSON.stringify(data),
                type: "application/json",
            })
            if (response.ok) {

                setFormData([{email: ""}])
                toast.success(t("footer.email_sent"))
            }

            await addDoc(collection(db, "news_emails"), {email: data.email})


        } catch (err) {
            toast.success(err)
        }
    }
    const {register, handleSubmit, formState} = useForm()
    const {errors} = formState
    return (
        <footer className='bg-DarkTeal'>
            <div className='mx-auto w-full max-w-screen-xl p-10 xl:p-2 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4'>
                    <div className='md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center'>
                        <Link href='/'>
                            <Image
                                src='/Images/logo2.png'
                                width={125}
                                height={125}
                                alt='logo'
                            />
                        </Link>
                        <p className='text-white mt-3 mb-5 rtl:mr-1 text-center ltr:md:text-left rtl:md:text-right font-medium'>
                            {t("footer.motto")}
                        </p>
                    </div>
                    <div>
                        <h2 className='text-white text-2xl my-3 text-center ltr:md:text-left rtl:md:text-right rtl:ml-4'>
                            {t("footer.pages")}
                        </h2>
                        <hr className='ltr:md:mr-5 rtl:md:ml-5 mb-5' />
                        <ul className='flex md:flex-col justify-evenly gap-4 mt-3 text-sm font-medium text-white sm:mt-0 mb-10 rtl:text-right h-16 md:h-auto'>
                            <li>
                                <Link
                                    className='hover:underline ltr:md:mr-6'
                                    href='/'
                                >
                                    {t("footer.home")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/blogs'
                                    className='hover:underline ltr:md:mr-6 '
                                >
                                    {t("footer.blogs")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/contact'
                                    className='hover:underline'
                                >
                                    {t("footer.contact")}
                                </Link>
                            </li>
                            <li>
                                <DropDown />
                            </li>
                        </ul>
                    </div>
                    <div className='mb-6 md:mb-0 rtl:text-right'>
                        <h2 className='text-white text-2xl my-3 text-center ltr:md:text-left rtl:md:text-right rtl:ml-4'>
                            {t("footer.subscribe")}
                        </h2>
                        <hr className='ltr:md:mr-5 rtl:md:ml-5 mb-5' />
                        <p className='text-white mt-3 mb-5 rtl:mr-1 text-center ltr:md:text-left rtl:md:text-right'>
                            {t("footer.spam")}
                        </p>

                        <div className='flex items-center flex-shrink-0 w-full mx-auto sm:w-auto rtl:ml-4 ltr:md:mr-4'>
                            <form

                                className='flex flex-col items-start  w-full md:flex-row rtl:text-right'
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="flex flex-col items-start w-full">
                                    <input
                                        type='email'
                                        id='email'
                                        placeholder={t("footer.email")}
                                        className='bg-white border border-gray-300 md:w-64 mb-2 md:mb-0 md:mr-2 text-sm rounded-lg block w-full p-2.5 focus:outline-none md:rtl:mx-2'
                                        value={formData.email}
                                        onChange={onChange}
                                        {
                                        ...register("email", {required: t("formErrors.email")})
                                        }

                                    />
                                    {errors?.email && <p className='mx-1 rtl:mr-2 rtl:text-base text-sm text-red-400 mt-1 animate-pulse'>{errors.email.message}</p>}
                                </div>
                                <button
                                    className='text-white bg-Teal hover:bg-white hover:text-Teal focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 center  '
                                    type='submit'
                                >
                                    {t("footer.subscribe")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' /> */}
                <div class='inline-flex items-center justify-center w-full'>
                    <hr class='w-full h-px my-8 bg-white border-0' />
                    <span class='absolute px-3 -translate-x-1/2 bg-DarkTeal left-1/2'>
                        <div className='flex space-x-3 justify-center items-center sm:mt-0 rtl:flex-row-reverse'>
                            <Link
                                href='https://www.facebook.com/recodedofficial'
                                className='text-white hover:text-black text-center rtl:ml-4'
                            >
                                <FaFacebook size={23} />
                                <span className='sr-only'>Facebook page</span>
                            </Link>
                            <Link
                                href='https://twitter.com/recodedofficial'
                                className='text-white hover:text-black text-center rtl:ml-2'
                            >
                                <BsTwitterX size={23} />
                                <span className='sr-only'>Twitter page</span>
                            </Link>

                            <Link
                                href='https://github.com/202306-NEA-DZ-FEW/online-Therapist'
                                className='text-white hover:text-black text-center rtl:ml-2'
                            >
                                <FaGithub size={23} />
                                <span className='sr-only'>GitHub account</span>
                            </Link>
                        </div>
                    </span>
                </div>
                <div className='flex items-center justify-center rtl:flex-row-reverse'>
                    <span className='text-sm text-dark text-center sm:text-left hover:text-white rtl:ml-4'>
                        © 2023{" "}
                        <Link href='#' className='hover:underline'>
                            {t("footer.innerSpace")}
                        </Link>
                        {t("footer.copyright")}
                    </span>
                </div>
            </div>
        </footer>
    )
}

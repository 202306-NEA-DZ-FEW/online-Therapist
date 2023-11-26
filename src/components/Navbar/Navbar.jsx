import {motion, useMotionValueEvent, useScroll} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/router"
import {useTranslation} from "next-i18next"
import {useEffect, useState} from "react"
import {HiMenu} from "react-icons/hi"
import {IoLanguage} from "react-icons/io5"
import {MdArrowDropDown} from "react-icons/md"
import {MdOutlineClose} from "react-icons/md"
import {TbUserCircle} from "react-icons/tb"

import {UserAuth} from "@/context/AuthContext"

import AboutDropdown from "./dropdowns/AboutDropdown"
import LangDropdown from "./dropdowns/LangDropdown"
import UserDropdown from "./dropdowns/UserDropdown"
import Button from "../elements/Button"

export default function Navbar () {
    const router = useRouter()
    const [navbar, setNavbar] = useState(false)
    const {t} = useTranslation("common")
    const language = router.locale
    const {user} = UserAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr"
    }, [language])

    // Animation
    const {scrollY} = useScroll()

    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <motion.nav
            className='sticky top-0 z-50  '
            variants={{
                visible: {y: 0},
                hidden: {y: "-100%"},
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{duration: 0.35, ease: "easeInOut"}}
        >
            <div className='relative justify-between bg-white md:items-center md:flex md:px-8 h-20 '>
                <div className="mx-0 md:container md:mx-auto">
                    <div className='flex items-center justify-between py-3 md:py-0 '>
                        {/* LOGO */}
                        <Link href='/'>
                            <Image
                                src='/Images/logo.png'
                                width={100}
                                height={100}
                                alt='logo'
                            />
                        </Link>
                        <div className='md:hidden flex gap-x-4 items-center'>
                            {!user ? (
                                <div className='flex flex-row gap-x-2'>
                                    <Link href='/login'>
                                        <Button
                                            transition={false}
                                            buttonText={t("signup.login")}
                                            color='darkteal'
                                            buttonSize='fit'
                                        />
                                    </Link>
                                </div>
                            ) : (
                                <div className='flex justify-end space-y-[30px] md:justify-center md:items-center md:flex-col md:space-y-[300px] z-50'>
                                    <div
                                        className='text-3xl relative'
                                        onClick={toggleDropdown}
                                    >
                                        <TbUserCircle />
                                    </div>
                                    <div className='absolute '>
                                        {isDropdownOpen && <UserDropdown />}
                                    </div>
                                </div>
                            )}
                            <button
                                className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <>
                                        <MdOutlineClose className='text-3xl text-black p-0 m-0' />
                                    </>
                                ) : (
                                    <HiMenu className='text-3xl text-black p-0 m-0' />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`md:block ${navbar ? " block" : "hidden"}`}>
                        <ul className='bg-white h-screen md:mt-0 md:h-auto space-y-2 md:space-y-0 md:space-x-10  items-center md:justify-center md:flex justify-start md:items-center flex-col flex md:flex-row pt-10 md:pt-0'>
                            <li
                                className={`block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-48 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto  md:hover:border-b md:hover:text-Teal  ${language === "ar" ? "pl-9" : ""
                                    }`}
                            >
                                <Link
                                    href='/'
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {t("navbar.home")}
                                </Link>
                            </li>
                            <li className='block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-48 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                <Link
                                    href='/blogs'
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {t("navbar.blogs")}
                                </Link>
                            </li>
                            <li className='block text-DarkTeal font-atkinson text-lg text-center md:text-start py-2 rounded-full w-48 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal '>
                                <div className='group inline-block relative flex justify-center items-center flex-col space-y-[180px] '>
                                    <button className='block flex justify-center items-center '>
                                        {t("navbar.about")}{" "}
                                        <MdArrowDropDown className='text-xl' />
                                    </button>

                                    <div className='absolute hidden bg-white z-50 group-hover:block '>
                                        <AboutDropdown />
                                    </div>
                                </div>
                            </li>
                            <li className='block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-48 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                <Link
                                    href='/contact'
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {t("navbar.contact")}
                                </Link>
                            </li>
                            {!user ? (
                                <li className='text-center '>
                                    <div className='hidden md:flex flex flex-row gap-x-2'>
                                        <Link href='/login'>
                                            <Button
                                                transition={false}
                                                buttonText={t("signup.login")}
                                                color='darkteal'
                                                buttonSize='fit'
                                            />
                                        </Link>
                                    </div>
                                </li>
                            ) : (
                                <div className='hidden md:flex justify-center items-center flex-col space-y-[300px] z-50'>
                                    <div
                                        className='text-3xl relative'
                                        onClick={toggleDropdown}
                                    >
                                        <TbUserCircle />
                                    </div>
                                    <div className='absolute outline-none'>
                                        {isDropdownOpen && <UserDropdown />}
                                    </div>
                                </div>
                            )}
                            <li className='hidden md:flex'>
                                <div className='group inline-block relative flex justify-center items-center flex-col space-y-[150px] z-50'>
                                    <button className='flex items-center justify-center mt-2 text-xl py-2 w-20 mx-auto md:w-auto '>
                                        <IoLanguage />
                                    </button>

                                    <div className='absolute hidden group-hover:block'>
                                        <LangDropdown />
                                    </div>
                                </div>
                            </li>
                            <li className='md:hidden block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-48 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                <div className='group  relative flex justify-center items-center flex-col space-y-[135px] md:space-y-[150px] '>
                                    <button className=' md:block '>
                                        {t("navbar.language")}
                                    </button>

                                    <div className='absolute hidden group-hover:block'>
                                        <LangDropdown />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

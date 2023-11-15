import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { UserAuth } from "@/context/AuthContext";
import { TbUserCircle } from "react-icons/tb";
import { IoLanguage } from "react-icons/io5";
import UserDropdown from "./dropdowns/UserDropdown";
import AboutDropdown from "./dropdowns/AboutDropdown";
import { MdArrowDropDown } from "react-icons/md";
import LangDropdown from "./dropdowns/LangDropdown";
import { HiMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import Button from "../elements/Button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
    const router = useRouter();
    const [navbar, setNavbar] = useState(false);
    const { t } = useTranslation("common");
    const language = router.locale;
    const { user } = UserAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    // Animation
    const { scrollY } = useScroll();

    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className='sticky top-0 z-50 bg-white md:h-20 md:pt-4  p-0 md:px-12 border-b'
        >
            <div className=' justify-between px-4 mx-auto md:items-center md:flex md:px-8'>
                <div>
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
                                <div className='flex flex flex-row gap-x-2'>
                                    <Link href='/login'>
                                        <Button
                                            transition={false}
                                            buttonText={t("navbar.login")}
                                            color='darkteal'
                                            buttonSize='fit'
                                        />
                                    </Link>
                                    <Link href='/sign-up'>
                                        <Button
                                            transition={false}
                                            buttonText={t("signup.signup")}
                                            color='teal'
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
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-0 md:block md:pb-0 md:mt-0 ${
                            navbar ? "p-12 md:p-0 block" : "hidden"
                        }`}
                    >
                        <ul className='h-screen md:h-auto space-y-2 md:space-y-0 md:space-x-10 items-center justify-center md:flex md:justify-between md:items-center'>
                            <li
                                className={`block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-96 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal  ${
                                    language === "ar" ? "pl-9" : ""
                                }`}
                            >
                                <Link
                                    href='/'
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {t("navbar.home")}
                                </Link>
                            </li>
                            <li className='block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-96 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                <Link
                                    href='/blogs'
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {t("navbar.blogs")}
                                </Link>
                            </li>
                            <li className='block text-DarkTeal font-atkinson text-lg text-center md:text-start py-2 rounded-full w-96 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal '>
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
                            <li className='block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-96 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
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
                                                buttonText={t("navbar.login")}
                                                color='darkteal'
                                                buttonSize='fit'
                                            />
                                        </Link>
                                        <Link href='/sign-up'>
                                            <Button
                                                transition={false}
                                                buttonText={t("signup.signup")}
                                                color='teal'
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
                                    <div className='absolute '>
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
                            <li className='md:hidden block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-96 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                <div className='group inline-block relative flex justify-center items-center flex-col space-y-[135px] md:space-y-[150px] '>
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
    );
}

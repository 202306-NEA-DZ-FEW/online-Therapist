import Link from "next/link";
import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { UserAuth } from "@/context/AuthContext";
import { therapistLinks, patientLinks } from "@/util/library";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function Sidebar() {
    const { t } = useTranslation("dashboard");
    const router = useRouter();
    const language = router.locale;

    useEffect(() => {
        document.body.dir = language == "ar" ? "rtl" : "ltr";
    }, [language]);

    const { user, activeLink, setActiveLink } = UserAuth();
    const renderLinks = () => {
        if (user && user.isTherapist) {
            return therapistLinks.map((link) => (
                <Link
                    key={link.id}
                    onClick={() => setActiveLink(link.name)}
                    href={link.href}
                    className={`flex items-center gap-x-3 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-Teal hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out ${
                        activeLink === link.name ? "bg-Teal text-white" : ""
                    }`}
                >
                    <span className='text-2xl'>{link.icon}</span>
                    <span className='hidden md:block'>
                        {language === "en" ? link.text_en : link.text_ar}
                    </span>
                </Link>
            ));
        } else if (user) {
            return patientLinks.map((link) => (
                <Link
                    key={link.id}
                    onClick={() => setActiveLink(link.name)}
                    href={link.href}
                    className={`flex items-center gap-x-3 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-Teal hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out ${
                        activeLink === link.name ? "bg-Teal text-white" : ""
                    }`}
                >
                    <span className='text-2xl'>{link.icon}</span>
                    <span className='hidden md:block'>
                        {language === "en" ? link.text_en : link.text_ar}
                    </span>
                </Link>
            ));
        }

        return null;
    };

    return (
        <div className='bg-white h-screen md:block shadow-xl px-3 w-16 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out'>
            <div className='space-y-6 md:space-y-10 mt-10'>
                <h1 className='hidden md:block font-bold text-sm md:text-2xl text-center'>
                    {t("dashboard")}
                </h1>
                <div className='space-y-3'>
                    {user && (
                        <>
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt='Avatar user'
                                    className='w-10 md:w-16 rounded-full mx-auto'
                                />
                            ) : (
                                <CgProfile className='w-10 h-10 md:w-16 rounded-full mx-auto text-gray-500' />
                            )}
                            <div>
                                <h2 className='hidden md:block font-medium text-xs md:text-sm text-center text-Teal'>
                                    {user.displayName}
                                </h2>
                                <p className='hidden md:block text-xs text-gray-500 text-center'>
                                    {user.email}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <div className='flex font- flex-col space-y-2'>
                    <hr />
                    {renderLinks()}
                    <hr />
                </div>
            </div>
        </div>
    );
}

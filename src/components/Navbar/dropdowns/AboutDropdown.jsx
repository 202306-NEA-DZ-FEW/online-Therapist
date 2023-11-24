import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";

export default function AboutDropdown() {
    const { t } = useTranslation("common");
    return (
        <div className='md:w-36 w-48 bg-white font-atkinson border p-2 shadow-md rounded-lg '>
            <ul className='py-2 first:pt-0 z-60 last:pb-0'>
                <Link href='/about-us/'>
                    <li
                        className=' py-2 px-3 rounded-lg text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'
                        href='#'
                    >
                        {t("navbar.aboutUs")}
                    </li>
                </Link>
                <Link href='/team/'>
                    <li
                        className=' py-2 px-3 rounded-lg text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'
                        href='#'
                    >
                        {t("navbar.team")}
                    </li>
                </Link>
                <Link href='/careers/'>
                    <li
                        className=' py-2 px-3 rounded-lg text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'
                        href='#'
                    >
                        {t("navbar.careers")}
                    </li>
                </Link>
            </ul>
        </div>
    );
}

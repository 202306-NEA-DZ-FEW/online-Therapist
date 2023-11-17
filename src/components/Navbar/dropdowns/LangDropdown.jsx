import Link from "next/link";
import React from "react";

export default function LangDropdown() {
    return (
        <div className='w-96 md:w-32 bg-white font-atkinson border bg-grey p-2 shadow-md rounded-lg'>
            <ul className='py-2 first:pt-0  last:pb-0'>
                <Link href='#' locale='en'>
                    <li
                        className=' py-2 px-3 rounded-lg text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'
                        href='#'
                    >
                        English
                    </li>
                </Link>
                <Link href='#' locale='ar'>
                    <li
                        className=' py-2 px-3 rounded-lg text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'
                        href='#'
                    >
                        العربية
                    </li>
                </Link>
            </ul>
        </div>
    );
}

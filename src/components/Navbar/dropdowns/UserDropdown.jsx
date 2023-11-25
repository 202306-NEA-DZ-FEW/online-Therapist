import React from "react";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function UserDropdown() {
    const { t } = useTranslation("common");
    const { user, logOut } = UserAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await logOut();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-64 bg-white font-atkinson border bg-grey p-2 shadow-md rounded-lg'>
            <div className='flex flex-col text-center mb-2 space-y-4 justify-center items-center'>
                {user && (
                    <>
                        {user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt='Profile'
                                className='w-10 object-cover h-10 rounded-full'
                            />
                        ) : (
                            <FaRegUser className='w-10 h-10 text-gray-500' />
                        )}
                        <div>
                            <p className='text-lg'>{user.displayName}</p>
                            <p className='text-sm text-gray-500'>
                                {user.email}
                            </p>
                        </div>
                    </>
                )}
            </div>
            <hr />
            <div class='py-2 first:pt-0 last:pb-0'>
                <Link
                    href='/dashboard/'
                    className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'
                >
                    <FaRegUser />
                    {t("navbar.dashboard")}
                </Link>
            </div>
            <hr />
            <ul className='py-2 first:pt-0 last:pb-0'>
                <Link href={user.isTherapist ? '/therapists/profile/' : '/profile/'}>
                    <li className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'>
                        <IoSettingsOutline />
                        {t("navbar.account")}
                    </li>
                </Link>
                <li
                    onClick={handleSignOut}
                    className='cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700'
                >
                    <IoIosLogOut />
                    {t("navbar.signout")}
                </li>
            </ul>
        </div>
    );
}

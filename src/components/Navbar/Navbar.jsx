import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useAppcontext } from "@/context/context";
import { useRouter } from "next/router";

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const { t } = useTranslation("common");
    const { user, logOut } = useAppcontext();

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    const router = useRouter();
    const language = router.locale;

    return (
        <div>
            <nav className='bg-white md:h-20 md:pt-4  p-0 md:px-12 border-b'>
                <div className='justify-between px-4 mx-auto md:items-center md:flex md:px-8'>
                    <div>
                        <div className='flex items-center justify-between py-3  md:py-0 '>
                            {/* LOGO */}
                            <Link href='/'>
                                <Image
                                    src='/logo.png'
                                    width={100}
                                    height={100}
                                    alt='logo'
                                />
                            </Link>
                            <div className='md:hidden flex items-center'>
                                <div className='group inline-block relative'>
                                    <button className=' flex items-center justify-center text-DarkTeal font-atkinson text-lg text-center py-2  w-20 mx-auto  hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                        <svg
                                            fill='none'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            width='24'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                clip-rule='evenodd'
                                                d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z'
                                                fill='black'
                                                fill-rule='evenodd'
                                            />
                                            <path
                                                clip-rule='evenodd'
                                                d='M21 13H3V11H21V13Z'
                                                fill='black'
                                                fill-rule='evenodd'
                                            />
                                            <path
                                                clip-rule='evenodd'
                                                d='M11.2925 20.2933C11.2927 20.2931 11.2929 20.2929 12 21C12.7071 21.7071 12.7073 21.7069 12.7076 21.7066L12.7096 21.7046L12.7135 21.7007L12.7256 21.6884C12.7355 21.6782 12.7492 21.6642 12.7663 21.6464C12.8005 21.6108 12.8486 21.5599 12.9085 21.4946C13.0284 21.3641 13.196 21.1754 13.3954 20.9344C13.7935 20.4533 14.3224 19.7591 14.8517 18.8991C15.9014 17.1932 17 14.7582 17 12C17 9.24185 15.9014 6.8068 14.8517 5.1009C14.3224 4.24086 13.7935 3.54666 13.3954 3.06556C13.196 2.82458 13.0284 2.63589 12.9085 2.50537C12.8486 2.44008 12.8005 2.38925 12.7663 2.35361C12.7492 2.33579 12.7355 2.32176 12.7256 2.31161L12.7135 2.29931L12.7096 2.29536L12.7082 2.29394C12.7079 2.2937 12.7071 2.29289 12 3C11.2929 3.70711 11.2927 3.70691 11.2925 3.70672L11.2973 3.71164L11.3235 3.73867C11.3479 3.76407 11.3858 3.80406 11.4352 3.85791C11.5341 3.96567 11.679 4.12854 11.8546 4.34069C12.2065 4.76584 12.6776 5.38414 13.1483 6.1491C14.0986 7.6932 15 9.75815 15 12C15 14.2418 14.0986 16.3068 13.1483 17.8509C12.6776 18.6159 12.2065 19.2342 11.8546 19.6593C11.679 19.8715 11.5342 20.0343 11.4352 20.1421C11.3858 20.1959 11.3479 20.2359 11.3235 20.2613L11.2973 20.2884L11.2925 20.2933Z'
                                                fill='black'
                                                fill-rule='evenodd'
                                            />
                                            <path
                                                clip-rule='evenodd'
                                                d='M12.7075 20.2933C12.7073 20.2931 12.7071 20.2929 12 21C11.2929 21.7071 11.2927 21.7069 11.2924 21.7066L11.2904 21.7046L11.2865 21.7007L11.2744 21.6884C11.2645 21.6782 11.2508 21.6642 11.2337 21.6464C11.1995 21.6108 11.1514 21.5599 11.0915 21.4946C10.9716 21.3641 10.804 21.1754 10.6046 20.9344C10.2065 20.4533 9.6776 19.7591 9.14834 18.8991C8.09856 17.1932 7 14.7582 7 12C7 9.24185 8.09856 6.8068 9.14834 5.1009C9.6776 4.24086 10.2065 3.54666 10.6046 3.06556C10.804 2.82458 10.9716 2.63589 11.0915 2.50537C11.1514 2.44008 11.1995 2.38925 11.2337 2.35361C11.2508 2.33579 11.2645 2.32176 11.2744 2.31161L11.2865 2.29931L11.2904 2.29536L11.2918 2.29394C11.2921 2.2937 11.2929 2.29289 12 3C12.7071 3.70711 12.7073 3.70691 12.7075 3.70672L12.7027 3.71164L12.6765 3.73867C12.6521 3.76407 12.6142 3.80406 12.5648 3.85791C12.4659 3.96567 12.321 4.12854 12.1454 4.34069C11.7935 4.76584 11.3224 5.38414 10.8517 6.1491C9.90144 7.6932 9 9.75815 9 12C9 14.2418 9.90144 16.3068 10.8517 17.8509C11.3224 18.6159 11.7935 19.2342 12.1454 19.6593C12.321 19.8715 12.4658 20.0343 12.5648 20.1421C12.6142 20.1959 12.6521 20.2359 12.6765 20.2613L12.7027 20.2884L12.7075 20.2933Z'
                                                fill='black'
                                                fill-rule='evenodd'
                                            />
                                        </svg>
                                    </button>

                                    <ul className='absolute hidden w-full text-center md:text-start rounded-b-lg p-2 mt-0 bg-white shadow-lg text-DarkTeal group-hover:block md:w-24 '>
                                        <div className='space-y-2 z-50 '>
                                            <Link
                                                href='#'
                                                locale='en'
                                                className='hover:text-Teal'
                                            >
                                                <li className='w-full hover:bg-gray-50'>
                                                    English
                                                </li>
                                            </Link>
                                            <Link
                                                href='#'
                                                locale='ar'
                                                className='hover:text-Teal'
                                            >
                                                <li className='w-full hover:bg-gray-50'>
                                                    العربية
                                                </li>
                                            </Link>
                                        </div>
                                    </ul>
                                </div>
                                <button
                                    className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <Image
                                            src='/close.svg'
                                            width={30}
                                            height={30}
                                            alt='logo'
                                        />
                                    ) : (
                                        <Image
                                            src='/hamburger-menu.svg'
                                            width={30}
                                            height={30}
                                            alt='logo'
                                            className='focus:border-none active:border-none'
                                        />
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
                                        href='/'
                                        onClick={() => setNavbar(!navbar)}
                                    >
                                        {t("navbar.blogs")}
                                    </Link>
                                </li>
                                <li className='text-DarkTeal font-atkinson ml-2 text-lg md:hover:text-Teal'>
                                    <div className='group inline-block relative'>
                                        <button className='block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-96 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                            {t("navbar.about")}
                                        </button>

                                        <ul className='absolute hidden w-full text-center md:text-start rounded-b-lg p-2 mt-0 bg-white shadow-lg text-DarkTeal group-hover:block md:w-24'>
                                            <div className='space-y-2 '>
                                                <li className='w-full hover:bg-gray-50'>
                                                    <Link
                                                        href='/'
                                                        className='hover:text-Teal'
                                                    >
                                                        {t("navbar.aboutUs")}
                                                    </Link>
                                                </li>
                                                <li className='w-full hover:bg-gray-50'>
                                                    <Link
                                                        href='/'
                                                        className='hover:text-Teal'
                                                    >
                                                        {t("navbar.team")}
                                                    </Link>
                                                </li>
                                                <li className='w-full hover:bg-gray-50'>
                                                    <Link
                                                        href='/'
                                                        className='hover:text-Teal'
                                                    >
                                                        {t("navbar.careers")}
                                                    </Link>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </li>
                                <li className='block text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-96 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                    <Link
                                        href='/'
                                        onClick={() => setNavbar(!navbar)}
                                    >
                                        {t("navbar.contact")}
                                    </Link>
                                </li>
                                {!user ? (
                                    <li className='text-center'>
                                        <Link href='/login/login'>
                                            <button className='text-white font-atkinson text-lg bg-Teal rounded-full h-12 w-96 md:w-24 md:rounded-md md:h-10 hover:bg-DarkTeal'>
                                                {t("navbar.login")}
                                            </button>
                                        </Link>
                                    </li>
                                ) : (
                                    <div className='flex items-center space-x-4'>
                                        <Link href='/profile/profile'>
                                            <p>Profile</p>
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className='text-white font-atkinson text-lg bg-Teal rounded-full h-12 w-96 md:w-24 md:rounded-md md:h-10 hover:bg-DarkTeal'
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}

                                <li className='text-DarkTeal font-atkinson ml-2 text-lg md:hover:text-Teal'>
                                    <div className='group inline-block relative'>
                                        <button className=' invisible md:visible flex items-center justify-center mt-2 text-DarkTeal font-atkinson text-lg text-center py-2 rounded-full w-20 mx-auto border border-gray-200 hover:bg-gray-50 hover:text-Teal md:border-0 md:border-b-[#1E4445] md:hover:bg-white md:rounded-none md:py-0 md:w-auto md:hover:border-b md:hover:text-Teal'>
                                            <svg
                                                fill='none'
                                                height='24'
                                                viewBox='0 0 24 24'
                                                width='24'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    clip-rule='evenodd'
                                                    d='M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z'
                                                    fill='black'
                                                    fill-rule='evenodd'
                                                />
                                                <path
                                                    clip-rule='evenodd'
                                                    d='M21 13H3V11H21V13Z'
                                                    fill='black'
                                                    fill-rule='evenodd'
                                                />
                                                <path
                                                    clip-rule='evenodd'
                                                    d='M11.2925 20.2933C11.2927 20.2931 11.2929 20.2929 12 21C12.7071 21.7071 12.7073 21.7069 12.7076 21.7066L12.7096 21.7046L12.7135 21.7007L12.7256 21.6884C12.7355 21.6782 12.7492 21.6642 12.7663 21.6464C12.8005 21.6108 12.8486 21.5599 12.9085 21.4946C13.0284 21.3641 13.196 21.1754 13.3954 20.9344C13.7935 20.4533 14.3224 19.7591 14.8517 18.8991C15.9014 17.1932 17 14.7582 17 12C17 9.24185 15.9014 6.8068 14.8517 5.1009C14.3224 4.24086 13.7935 3.54666 13.3954 3.06556C13.196 2.82458 13.0284 2.63589 12.9085 2.50537C12.8486 2.44008 12.8005 2.38925 12.7663 2.35361C12.7492 2.33579 12.7355 2.32176 12.7256 2.31161L12.7135 2.29931L12.7096 2.29536L12.7082 2.29394C12.7079 2.2937 12.7071 2.29289 12 3C11.2929 3.70711 11.2927 3.70691 11.2925 3.70672L11.2973 3.71164L11.3235 3.73867C11.3479 3.76407 11.3858 3.80406 11.4352 3.85791C11.5341 3.96567 11.679 4.12854 11.8546 4.34069C12.2065 4.76584 12.6776 5.38414 13.1483 6.1491C14.0986 7.6932 15 9.75815 15 12C15 14.2418 14.0986 16.3068 13.1483 17.8509C12.6776 18.6159 12.2065 19.2342 11.8546 19.6593C11.679 19.8715 11.5342 20.0343 11.4352 20.1421C11.3858 20.1959 11.3479 20.2359 11.3235 20.2613L11.2973 20.2884L11.2925 20.2933Z'
                                                    fill='black'
                                                    fill-rule='evenodd'
                                                />
                                                <path
                                                    clip-rule='evenodd'
                                                    d='M12.7075 20.2933C12.7073 20.2931 12.7071 20.2929 12 21C11.2929 21.7071 11.2927 21.7069 11.2924 21.7066L11.2904 21.7046L11.2865 21.7007L11.2744 21.6884C11.2645 21.6782 11.2508 21.6642 11.2337 21.6464C11.1995 21.6108 11.1514 21.5599 11.0915 21.4946C10.9716 21.3641 10.804 21.1754 10.6046 20.9344C10.2065 20.4533 9.6776 19.7591 9.14834 18.8991C8.09856 17.1932 7 14.7582 7 12C7 9.24185 8.09856 6.8068 9.14834 5.1009C9.6776 4.24086 10.2065 3.54666 10.6046 3.06556C10.804 2.82458 10.9716 2.63589 11.0915 2.50537C11.1514 2.44008 11.1995 2.38925 11.2337 2.35361C11.2508 2.33579 11.2645 2.32176 11.2744 2.31161L11.2865 2.29931L11.2904 2.29536L11.2918 2.29394C11.2921 2.2937 11.2929 2.29289 12 3C12.7071 3.70711 12.7073 3.70691 12.7075 3.70672L12.7027 3.71164L12.6765 3.73867C12.6521 3.76407 12.6142 3.80406 12.5648 3.85791C12.4659 3.96567 12.321 4.12854 12.1454 4.34069C11.7935 4.76584 11.3224 5.38414 10.8517 6.1491C9.90144 7.6932 9 9.75815 9 12C9 14.2418 9.90144 16.3068 10.8517 17.8509C11.3224 18.6159 11.7935 19.2342 12.1454 19.6593C12.321 19.8715 12.4658 20.0343 12.5648 20.1421C12.6142 20.1959 12.6521 20.2359 12.6765 20.2613L12.7027 20.2884L12.7075 20.2933Z'
                                                    fill='black'
                                                    fill-rule='evenodd'
                                                />
                                            </svg>
                                        </button>

                                        <ul className='absolute hidden w-full text-center md:text-start rounded-b-lg p-2 mt-0 bg-white shadow-lg text-DarkTeal group-hover:block md:w-24'>
                                            <div className='space-y-2 '>
                                                <Link
                                                    href='#'
                                                    locale='en'
                                                    className='hover:text-Teal'
                                                >
                                                    <li className='w-full hover:bg-gray-50'>
                                                        English
                                                    </li>
                                                </Link>
                                                <Link
                                                    href='#'
                                                    locale='ar'
                                                    className='hover:text-Teal'
                                                >
                                                    <li className='w-full hover:bg-gray-50'>
                                                        العربية
                                                    </li>
                                                </Link>
                                            </div>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

import DropDown from "./DropDown";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
    const { t } = useTranslation("common");
    const router = useRouter();
    const language = router.locale;

    return (
        <footer className='bg-DarkTeal'>
            <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
                <div className='md:flex md:justify-between'>
                    <div
                        className={`mb-6 md:mb-0 ${
                            language === "ar" ? "text-right" : ""
                        }`}
                    >
                        <h2
                            className={`text-white text-2xl xl:text-center ${
                                language === "ar" ? "ml-4" : "md:text-left"
                            }`}
                        >
                            {t("footer.subscribe")}
                        </h2>
                        <p
                            className={`text-dark mt-3 mb-5 xl:text-center ${
                                language === "ar" ? "mr-1" : "md:text-left"
                            }`}
                        >
                            {t("footer.spam")}
                        </p>

                        <div
                            className={`flex items-center flex-shrink-0 w-full mx-auto sm:w-auto ${
                                language === "ar" ? "ml-4" : "md:mr-4"
                            }`}
                        >
                            <form
                                action='#'
                                className={`flex flex-col items-center w-full md:flex-row ${
                                    language === "ar" ? "text-right" : ""
                                }`}
                            >
                                <input
                                    type='email'
                                    id='email'
                                    placeholder={t("footer.email")}
                                    className='bg-white border border-gray-300 text-gray-900 md:w-64 mb-2 md:mb-0 md:mr-4 text-sm rounded-lg block w-full p-2.5'
                                    required
                                />
                                <button
                                    type='submit'
                                    className={`text-white bg-Teal hover:bg-white hover:text-Teal focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 ${
                                        language === "ar"
                                            ? "center pr-7 pl-7 mr-3"
                                            : ""
                                    }`}
                                >
                                    {t("footer.subscribe")}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <ul
                            className={`flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-white sm:mt-0 mb-10 ${
                                language === "ar" ? "text-right" : ""
                            }`}
                        >
                            <li>
                                <Link
                                    className={`mr-4 hover:underline ${
                                        language === "ar" ? "ml-4" : "md:mr-6"
                                    }`}
                                    href='#'
                                >
                                    {t("footer.home")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/blogs'
                                    className={`mr-4 hover:underline ${
                                        language === "ar"
                                            ? "ml-2"
                                            : "md:mr-6 pl-8"
                                    }`}
                                >
                                    {t("footer.blogs")}
                                </Link>
                            </li>
                            <li>
                                <DropDown />
                            </li>
                            <li>
                                <Link
                                    href='/contact'
                                    className={`hover:underline ${
                                        language === "ar" ? "ml-3" : ""
                                    }`}
                                >
                                    {t("footer.contact")}
                                </Link>
                            </li>
                        </ul>

                        <div
                            className={`flex mt-10 space-x-5 justify-center items-center sm:mt-0 pt-5 ${
                                language === "ar" ? "flex-row-reverse" : ""
                            }`}
                        >
                            <Link
                                href='https://www.facebook.com/recodedofficial'
                                className={`text-dark hover:text-white text-center ${
                                    language === "ar" ? "ml-4" : ""
                                }`}
                            >
                                <svg
                                    className='w-4 h-4'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 8 19'
                                >
                                    <path
                                        fill-rule='evenodd'
                                        d='M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z'
                                        clip-rule='evenodd'
                                    ></path>
                                </svg>
                                <span className='sr-only'>Facebook page</span>
                            </Link>
                            <Link
                                href='https://twitter.com/recodedofficial'
                                className={`text-dark hover:text-white text-center ${
                                    language === "ar" ? "ml-2" : ""
                                }`}
                            >
                                <svg
                                    className='w-4 h-4'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 17'
                                >
                                    <path
                                        fill-rule='evenodd'
                                        d='M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.980A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z'
                                        clip-rule='evenodd'
                                    ></path>
                                </svg>
                                <span className='sr-only'>Twitter page</span>
                            </Link>

                            <Link
                                href='https://github.com/202306-NEA-DZ-FEW/online-Therapist'
                                className={`text-dark hover:text-white text-center ${
                                    language === "ar" ? "ml-2" : ""
                                }`}
                            >
                                <svg
                                    className='w-4 h-4'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fill-rule='evenodd'
                                        d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.720 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                                        clip-rule='evenodd'
                                    ></path>
                                </svg>
                                <span className='sr-only'>GitHub account</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
                <div
                    className={`flex items-center justify-center ${
                        language === "ar" ? "flex-row-reverse" : ""
                    }`}
                >
                    <span
                        className={`text-sm text-dark text-center sm:text-left hover:text-white ${
                            language === "ar" ? "ml-4" : ""
                        }`}
                    >
                        © 2023{" "}
                        <Link href='#' className='hover:underline'>
                            {t("footer.innerSpace")}
                        </Link>
                        {t("footer.copyright")}
                    </span>
                </div>
            </div>
        </footer>
    );
}
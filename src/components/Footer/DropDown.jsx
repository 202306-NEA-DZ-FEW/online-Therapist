import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const DropDown = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation("common");

    return (
        <div className='relative'>
            <a
                className='hover:underline cursor-pointer mb-3'
                onClick={() => setOpen(!open)}
            >
                {t("footer.about")}
            </a>
            <div className={`${open ? "block" : "hidden"} absolute`}>
                <div className='ml-4 '>
                    <Link
                        href='/about-us/'
                        className='mr-4 hover:underline md:mr-6 '
                    >
                        {t("footer.aboutUs")}
                    </Link>
                </div>
                <div className='ml-4 text-dark'>
                    <Link
                        href='/team/'
                        className='mr-4 hover:underline md:mr-6 '
                    >
                        {t("footer.team")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DropDown;

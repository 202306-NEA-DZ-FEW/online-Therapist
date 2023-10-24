import { useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

const DropDown = () => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation("common");
    const router = useRouter();
    const language = router.locale;

    return (
        <div className='relative '>
            <a
                className={`mr-4 hover:underline md:mr-6 cursor-pointer p-8 mb-3 ${
                    language === "ar" ? "pr-2" : ""
                } `}
                onClick={() => setOpen(!open)}
            >
                {t("footer.about")}
            </a>
            <div className={`${open ? "block" : "hidden"} absolute`}>
                <div className='ml-6 '>
                    <Link href='#' className='mr-4 hover:underline md:mr-6 '>
                        {t("footer.aboutUs")}
                    </Link>
                </div>
                <div className='ml-6 text-dark'>
                    <Link href='#' className='mr-4 hover:underline md:mr-6 '>
                        {t("footer.team")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DropDown;

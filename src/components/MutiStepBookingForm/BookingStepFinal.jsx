import React from "react";
import Button from "../elements/Button";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const BookingStepFinal = () => {
    const { t } = useTranslation("booking");

    return (
        <div>
            <h3 className='mb-2 lg:text-2xl text-lg text-center font-young text-DarkTeal uppercase'>
                {t("stepFinal.header")}
            </h3>
            <p className='lg:text-lg text-center font-atkinson text-gray-900'>
                {t("stepFinal.paragraph1")}
                <br />
                {t("stepFinal.paragraph2")}
            </p>{" "}
            <div className='my-2 flex justify-center items-center lg:pt-6 pt-3'>
                <Link href='/'>
                    <button href='/'>
                        <Button
                            buttonText={t("stepFinal.btnText")}
                            buttonSize='m'
                        />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BookingStepFinal;

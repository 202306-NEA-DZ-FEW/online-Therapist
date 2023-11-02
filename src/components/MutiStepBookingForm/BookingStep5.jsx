import React from "react";
import Button from "../elements/Button";
import CheckboxInput from "../elements/CheckboxInput";
import { useTranslation } from "next-i18next";

const BookingStep5 = ({
    handleChangeInput,
    handlePrevStep,
    handleNextStep,
}) => {
    const { t } = useTranslation("booking");

    return (
        <div>
            {" "}
            <h3 className='mb-4 lg:text-2xl text-lg font-young text-DarkTeal '>
                {t("step5.header")}
            </h3>
            <ul className='lg:w-96 lg:text-lg rtl:pr-4 font-atkinson text-gray-900 bg-white'>
                <li className='w-full '>
                    <CheckboxInput
                        name='issues'
                        value={t("step5.valueText1")}
                        text={t("step5.valueText1")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='issues'
                        value={t("step5.valueText2")}
                        text={t("step5.valueText2")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='issues'
                        value={t("step5.valueText3")}
                        text={t("step5.valueText3")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='issues'
                        value={t("step5.valueText4")}
                        text={t("step5.valueText4")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='issues'
                        value={t("step5.valueText5")}
                        text={t("step5.valueText5")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='issues'
                        value={t("step5.valueText6")}
                        text={t("step5.valueText6")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
            </ul>
            <div className='my-2 flex justify-between items-center lg:pt-5 pt-2'>
                <button onClick={handlePrevStep}>
                    <Button buttonText={t("step2.prev")} buttonSize='md' />
                </button>
                <button onClick={handleNextStep}>
                    <Button buttonText={t("step2.next")} buttonSize='sm' />
                </button>
            </div>
        </div>
    );
};

export default BookingStep5;

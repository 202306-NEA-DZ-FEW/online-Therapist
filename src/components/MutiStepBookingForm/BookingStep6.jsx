import React from "react";
import Button from "../elements/Button";
import { useTranslation } from "next-i18next";

const BookingStep6 = ({
    formData,
    handleChangeInput,
    handlePrevStep,
    handleNextStep,
}) => {
    const { t } = useTranslation("booking");

    return (
        <div>
            <h3 className='mb-2 lg:text-2xl text-lg font-young text-DarkTeal '>
                {t("step6.header")}
            </h3>
            <p className='lg:text-lg font-atkinson text-gray-900'>
                {t("step6.paragraph1")}
                <br />
                {t("step6.paragraph2")}
            </p>

            <label htmlFor='specification' class='block mb-2 lg:pt-10 pt-6'>
                <textarea
                    id='specification'
                    value={formData.specification}
                    onChange={(e) => handleChangeInput(e)}
                    name='specification'
                    type='text'
                    rows='10'
                    class='block p-2.5 w-full lg:text-lg rtl:text-reverse font-atkinson text-gray-900 bg-gray-50 rounded-lg border hover:border-Teal border-gray-300 focus:ring-4 focus:ring-Teal'
                    placeholder={t("step6.placeholder")}
                ></textarea>
            </label>

            <div className='my-2 flex justify-between items-center lg:pt-6 pt-3'>
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

export default BookingStep6;

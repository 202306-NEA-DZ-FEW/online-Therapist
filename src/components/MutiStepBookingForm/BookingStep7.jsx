import React from "react";
import Button from "../elements/Button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const BookingStep7 = ({
    formData,
    handleChangeInput,
    handlePrevStep,
    handleSubmitFormData,
}) => {
    const { t } = useTranslation("booking");
    const router = useRouter();
    const language = router.locale;

    return (
        <div>
            <h3 className='mb-2 lg:text-2xl text-lg font-young text-DarkTeal '>
                {t("step7.header")}
            </h3>
            <p className='lg:text-lg font-atkinson text-gray-900'>
                {t("step7.paragraph1")}
                <br />
            </p>
            <div className='lg:text-md text-sm'>
                <DataConfirm
                    label={t("step7.label1")}
                    value={formData.counselingType}
                />
                <DataConfirm
                    label={t("step7.label2")}
                    value={formData.maritalStatus}
                />
                <DataConfirm
                    label={t("step7.label3")}
                    value={formData.firstSession}
                />
                <DataConfirm
                    label={t("step7.label4")}
                    value={formData.counselorQualities}
                />
                <DataConfirm
                    label={t("step7.label5")}
                    value={formData.issues}
                />
                <DataConfirm
                    label={t("step7.label6")}
                    value={formData.specification}
                />
            </div>
            <div className='my-2 flex items-center'>
                <input
                    id='agreeToTerms'
                    type='checkbox'
                    value={formData.agreeToTerms}
                    onChange={(e) => handleChangeInput(e)}
                    name='agreeToTerms'
                    className='lg:w-4 lg:h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
                />
                <label
                    htmlFor='agreeToTerms'
                    className='w-full py-1 lg:py-2 ml-2 rtl:pr-2 lg:text-lg font-atkinson text-gray-900'
                >
                    {t("step7.label7")}
                </label>
            </div>
            <div className='my-2 flex justify-between items-center lg:pt-5 pt-2'>
                <button onClick={handlePrevStep}>
                    <Button
                        buttonText={t("step2.prev")}
                        rotate={language == "en" ? true : false}
                        buttonSize='md'
                    />
                </button>
                <button onClick={handleSubmitFormData}>
                    <Button
                        buttonText={t("step7.submit")}
                        rotate={language == "en" ? false : true}
                        buttonSize='md'
                    />
                </button>
            </div>
        </div>
    );
};

export default BookingStep7;

// Data Component
const DataConfirm = ({ label, value }) => {
    return (
        <div className='my-3 border border-dashed border-Teal p-1 rounded-lg'>
            <span className='mr-4 text-slate-500'>{label}</span>
            {Array.isArray(value) ? (
                value.map((item, index) => (
                    <span key={index} className='mr-4 text-slate-900'>
                        {item}
                    </span>
                ))
            ) : (
                <span className='mr-4 text-slate-900'>{value}</span>
            )}
        </div>
    );
};

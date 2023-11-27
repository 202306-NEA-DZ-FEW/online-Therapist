import { useTranslation } from "next-i18next";
import Button from "../elements/Button";
import CheckboxInput from "../elements/CheckboxInput";
import { useRouter } from "next/router";

const BookingStep4 = ({
    handleChangeInput,
    handlePrevStep,
    handleNextStep,
}) => {
    const { t } = useTranslation("booking");
    const router = useRouter();
    const language = router.locale;

    return (
        <div>
            {" "}
            <h3 className='mb-4 lg:text-2xl text-lg font-young text-DarkTeal'>
                {t("step3.header")}
            </h3>
            <ul className='lg:w-96 lg:text-lg font-atkinson rtl:pr-4 text-gray-900 bg-white'>
                <li className='w-full'>
                    <CheckboxInput
                        name='counselorQualities'
                        value={t("step4.valueText1")}
                        text={t("step4.valueText1")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='counselorQualities'
                        value={t("step4.valueText2")}
                        text={t("step4.valueText2")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='counselorQualities'
                        value={t("step4.valueText3")}
                        text={t("step4.valueText3")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='counselorQualities'
                        value={t("step4.valueText4")}
                        text={t("step4.valueText4")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li className='w-full'>
                    <CheckboxInput
                        name='counselorQualities'
                        value={t("step4.valueText5")}
                        text={t("step4.valueText5")}
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
            </ul>
            <div className='my-2 flex justify-between items-center lg:pt-5 pt-2'>
                <button onClick={handlePrevStep}>
                    <Button
                        buttonText={t("step2.prev")}
                        rotate={language == "en" ? true : false}
                        buttonSize='md'
                    />
                </button>
                <button onClick={handleNextStep}>
                    <Button
                        buttonText={t("step2.next")}
                        rotate={language == "en" ? false : true}
                        buttonSize='sm'
                    />
                </button>
            </div>
        </div>
    );
};

export default BookingStep4;

import { useRouter } from "next/router";
import Button from "../elements/Button";
import RadioInput from "../elements/RadioInput";
import { useTranslation } from "next-i18next";

const BookingStep1 = ({ handleChangeInput, handleNextStep }) => {
    const { t } = useTranslation("booking");
    const router = useRouter();
    const language = router.locale;

    return (
        <div>
            <h3 className='mb-5 lg:text-2xl text-lg font-young text-DarkTeal'>
                {t("step1.header")}
            </h3>
            <ul className='flex flex-col gap-3'>
                <li>
                    <RadioInput
                        name='counselingType'
                        value={t("step1.valueText1")}
                        text={t("step1.valueText1")}
                        width='96'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li>
                    <RadioInput
                        name='counselingType'
                        value={t("step1.valueText2")}
                        text={t("step1.valueText2")}
                        width='96'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li>
                    <RadioInput
                        name='counselingType'
                        value={t("step1.valueText3")}
                        text={t("step1.valueText3")}
                        width='96'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
            </ul>
            <div className='my-2 flex justify-end items-center lg:pt-6 pt-3'>
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

export default BookingStep1;

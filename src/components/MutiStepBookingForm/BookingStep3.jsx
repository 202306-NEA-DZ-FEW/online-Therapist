import { useTranslation } from "next-i18next";
import Button from "../elements/Button";
import RadioInput from "../elements/RadioInput";

const BookingStep3 = ({
    handleChangeInput,
    handlePrevStep,
    handleNextStep,
}) => {
    const { t } = useTranslation("booking");

    return (
        <div>
            {" "}
            <h3 className='mb-5 lg:text-2xl text-lg font-young text-DarkTeal'>
                {t("step3.header")}
            </h3>
            <ul className='flex flex-col gap-3 rtl:lg:w-72'>
                <li>
                    <RadioInput
                        name='firstSession'
                        value={t("step3.valueText1")}
                        text={t("step3.valueText1")}
                        width='72'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
                <li>
                    <RadioInput
                        name='firstSession'
                        value={t("step3.valueText2")}
                        text={t("step3.valueText2")}
                        width='72'
                        onChange={(e) => handleChangeInput(e)}
                    />
                </li>
            </ul>
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

export default BookingStep3;

import Link from "next/link";
import Button from "../elements/Button";
import { useTranslation } from "next-i18next";
import Reveal from "../utils/Reveal";
import { useRouter } from "next/router";

const AreYouCouncelor = () => {
    const { t } = useTranslation("homepage");
    const router = useRouter();
    const language = router.locale;

    return (
        <div className='font-atkinson mt-24'>
            <Reveal>
                <h2 className='text-center lg:text-start font-bold block text-2xl md:text-4xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words'>
                    {t("counselor.heading")}
                </h2>
            </Reveal>
            <Reveal>
                <p className='uppercase text-center lg:text-start text-lg md:text-xl text-black/70 my-2'>
                    {t("counselor.subHeading")}
                </p>
            </Reveal>
            <div className='bg-white/95 flex flex-col lg:flex-row items-center justify-center text-start  rounded-md  shadow-2xl min-h-[20rem]'>
                <Reveal>
                    <div className='p-16 space-y-4 lg:p-0 lg:space-y-0 lg:flex lg:flex-col lg:items-center lg:justify-center'>
                        <span className='text-md md:text-lg p-12 font-atkinson text-black/80'>
                            {t("counselor.paragraph")}
                        </span>

                        <div className='flex items-center justify-center '>
                            <Link href='/requirements'>
                                <Reveal>
                                    <Button
                                        color='teal'
                                        rotate={language == "en" ? false : true}
                                        buttonText={t("counselor.learnMore")}
                                        buttonSize='lg'
                                        className='xl'
                                    />
                                </Reveal>
                            </Link>
                        </div>
                    </div>
                </Reveal>

                <img
                    className='hidden md:block w-96'
                    src='/Images/therapist.jpg'
                />
            </div>
        </div>
    );
};

export default AreYouCouncelor;

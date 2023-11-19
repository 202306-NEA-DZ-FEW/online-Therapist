// import { useTranslation } from "next-i18next";
import MultiStepForm from "@/components/MutiStepBookingForm/MultiStepForm";
import Layout from "@/layout/Layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const BookAnAppointment = () => {
    const { t } = useTranslation("booking");

    return (
        <Layout>
            <div className='container mx-auto lg:p-16  p-6 '>
                <h1 className='text-center lg:text-5xl text-2xl font-young uppercase mb-4'>
                    {t("booking.header")}
                </h1>
                <p className='lg:text-xl mx-14 text-md font-Atkinson text-start mb-10'>
                    {t("booking.paragraph")}
                </p>
                <div className=''>
                    <MultiStepForm showStepNumber={true} />
                </div>
            </div>
        </Layout>
    );
};

export default BookAnAppointment;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "booking"])),
            // Will be passed to the page component as props
        },
    };
}

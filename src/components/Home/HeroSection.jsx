import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slideImages } from "@/util/library";
import Button from "../elements/Button";
import { useTranslation } from "next-i18next";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

function HeroSection() {
    const { t } = useTranslation("homepage");
    const router = useRouter();
    const language = router.locale;
    const { user } = UserAuth();

    const handleBooking = () => {
        // Check if the user is logged in
        if (!user) {
            router.push("/login/");
        } else {
            router.push("/bookAnAppointment/");
        }
    };

    const settings = {
        fade: false,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    return (
        <div>
            <Slider {...settings} className='bg-white'>
                {slideImages.map((img) => (
                    <div key={img.id}>
                        <div
                            style={{
                                backgroundImage: `url(/Images/${img.imgSrc}.jpg)`,
                            }}
                            className='h-[90vh] bg-cover bg-center relative'
                        ></div>
                    </div>
                ))}
            </Slider>
            <div className='flex flex-col justify-between absolute leading-loose bottom-[25%] left-8 right-8 text-center lg:left-48 lg:right-48 p-6 bg-opacity-50 bg-white bg-clip-padding'>
                <div className='space-y-4'>
                    <h2 className='text-4xl md:text-4xl lg:text-7xl  text-black font-extrabold font-atkinson'>
                        {t("hero.heading")}
                        <br />
                    </h2>
                    <p className='hidden md:block md:text-xl lg:text-3xl sm:text-md font-medium text-black leading-loose font-atkinson'>
                        {t("hero.text1")}
                    </p>
                    <p className='hidden md:block text-lg md:text-xl lg:text-3xl font-medium  font-atkinson leading-loose'>
                        {t("hero.text2")}
                    </p>
                </div>
                <div className='px-auto pt-6 mx-auto'>
                    <Button
                        color='teal'
                        rotate={language == "en" ? false : true}
                        buttonText={t("hero.bookingButton")}
                        buttonSize='fit'
                        clickFunction={handleBooking}
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

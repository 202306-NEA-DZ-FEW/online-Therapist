import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { images } from "@/util/library";
import Button from "../elements/Button";
import Link from "next/link";
// import { UserAuth } from "@/context/AuthContext";

function HeroSection() {
    // const { user } = UserAuth();
    // Define the paths based on the user's authentication status
    // const bookingPath = user ? "/bookAnAppointment" : "/login/login";

    const settings = {
        fade: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    return (
        <Slider {...settings} className='bg-GreenLight'>
            {images.map((image) => (
                <div key={image.id}>
                    <Image
                        className='object-cover w-full max-h-[80vh]'
                        width={400}
                        height={400}
                        src={image.imgSrc}
                        alt='Therapist Sessions'
                    />
                    <div className=' flex justify-between absolute bottom-1.5 text-left left-0 right-0 p-4 bg-opacity-50 bg-white bg-clip-padding'>
                        <div className=''>
                            <h2 className='text-lg md:text-xl lg:text-3xl sm:text-md text-DarkTeal font-extrabold font-atkinson'>
                                Therapy at Your Fingertips: Access the
                                World&apos;s Largest Network of Therapists
                            </h2>
                            <p className='hidden sm:block text-lg md:text-xl lg:text-2xl font-opensans'>
                                Get the same quality care as in-office therapy,
                                but with the convenience and flexibility of
                                online.
                            </p>
                        </div>
                        <div className='px-auto pt-4 mx-auto'>
                            <Link href='/bookAnAppointment'>
                                <Button
                                    buttonText='Book An Appointment'
                                    buttonSize='fit'
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}

export default HeroSection;

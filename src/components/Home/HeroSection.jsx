import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { images } from "@/util/library";
import { slideImages } from "@/util/library";
import Button from "../elements/Button";
import Link from "next/link";
import { useTranslation } from "next-i18next";
// import { UserAuth } from "@/context/AuthContext";

function HeroSection() {
    // const { user } = UserAuth();
    // Define the paths based on the user's authentication status
    // const bookingPath = user ? "/bookAnAppointment" : "/login/login";
    const { t } = useTranslation("common");
    const settings = {
        fade: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    return (
        <Slider {...settings} className='bg-white'>
            {slideImages.map((img) => (
                <>
                    <div
                        key={img.id}
                        style={{
                            backgroundImage: `url(/Images/${img.imgSrc}.jpg)`,
                        }}
                        className='h-[90vh] bg-cover bg-center'
                    >
                        <div className=' flex flex-col justify-between absolute leading-loose bottom-[25%] text-center left-48 right-48 p-6 bg-opacity-50 bg-white bg-clip-padding'>
                            <div className='space-y-4'>
                                <h2 className='text-lg md:text-xl lg:text-7xl leading-loose sm:text-md text-black font-extrabold font-atkinson'>
                                {t("hero.heading")}<br />
                                </h2>
                                <p className='text-lg md:text-xl lg:text-3xl sm:text-md font-medium text-black leading-loose font-atkinson'>
                                {t("hero.text1")}
                                </p>
                                <p className='hidden sm:block text-lg md:text-xl lg:text-3xl font-medium  font-atkinson leading-loose'>
                                {t("hero.text2")}
                                </p>
                            </div>
                            <div className='px-auto pt-6 mx-auto'>
                                <Link href='/bookAnAppointment'>
                                    <Button
                                        color='teal'
                                        transition={true}
                                        buttonText={t("hero.bookingButton")}
                                        buttonSize='fit'
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </Slider>
        // -----------------------------------------------------------------------------------------

        //  <div
        //       style={{ backgroundImage: "url(/Images/20.jpg)" }}
        //       className="h-[90vh] bg-cover bg-center "
        //     >
        //      <div className=' flex flex-col justify-between absolute leading-loose text-start mt-40 ml-32'>
        //                         <div className='space-y-4'>
        //                             <h2 className='text-lg md:text-xl lg:text-6xl leading-loose sm:text-md text-black font-bold font-atkinson'>
        //                                 Therapy at Your <br/> Fingertips
        //                             </h2>
        //                             <p className="text-lg md:text-xl lg:text-xl sm:text-md font-medium text-black leading-loose font-atkinson">Access the
        //                                 World&apos;s Largest Network of Therapists</p>
        //                             <p className='hidden sm:block text-lg md:text-xl text-black lg:text-xl font-atkinson leading-loose'>
        //                                 Get the same quality care as in-office therapy,
        //                                but <br/> with the convenience and flexibility of
        //                                 online.
        //                             </p>
        //                         </div>
        //                         <div className='flex mt-8'>
        //                             <Link href='/bookAnAppointment'>
        //                                 <Button
        //                                 color = "teal"
        //                                 transition={true}
        //                                     buttonText='Book An Appointment'
        //                                     buttonSize='fit' />
        //                             </Link>
        //                         </div>
        //                     </div>
        // </div>

        // -----------------------------------------------------------------------------------------

        // {/* <div className="flex flex-row space-x-44 h-[90vh]">

        //                     <div className=' flex flex-col justify-between leading-loose text-start mt-36 ml-44'>

        //                         <div className='space-y-4'>
        //                             <h2 className=' tracking-wide text-lg md:text-xl lg:text-6xl leading-loose sm:text-md text-black font-extrabold font-atkinson'>
        //                                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Therapy at Your <br/> Fingertips </span>
        //                             </h2>
        //                             <p className="text-lg md:text-xl lg:text-xl sm:text-md font-medium text-black leading-loose font-atkinson">Access the
        //                                 World&apos;s Largest Network of Therapists</p>
        //                             <p className='hidden sm:block text-lg md:text-xl text-black lg:text-xl font-atkinson leading-loose'>
        //                                 Get the same quality care as in-office therapy,
        //                                but <br/> with the convenience and flexibility of
        //                                 online.
        //                             </p>
        //                         </div>
        //                         <div className='flex mb-44'>
        //                             <Link href='/bookAnAppointment'>
        //                                 <Button
        //                                 color = "teal"
        //                                 transition={true}
        //                                     buttonText='Book An Appointment'
        //                                     buttonSize='fit' />
        //                             </Link>
        //                         </div>
        //                         </div>
        //                         <Image
        //                         className=''
        //                         width={600}
        //                         height={400}
        //                         src="/Images/heroo.svg"
        //                         alt='Therapist Sessions'
        //                     />
        // </div> */}

        // -----------------------------------------------------------------------------------------

        // <Slider  >
        //     {/* {images.map((image) => (
        //         <div key={image.id}>
        // <Image
        //     className='object-cover w-full max-h-[80vh]'
        //     width={400}
        //     height={400}
        //     src={image.imgSrc}
        //     alt='Therapist Sessions'
        // />
        //             <div className=' flex justify-between absolute bottom-1.5 text-left left-0 right-0 p-4 bg-opacity-50 bg-white bg-clip-padding'>
        //                 <div className=''>
        //                     <h2 className='text-lg md:text-xl lg:text-3xl sm:text-md text-DarkTeal font-extrabold font-atkinson'>
        //                         Therapy at Your Fingertips: Access the
        //                         World&apos;s Largest Network of Therapists
        //                     </h2>
        //                     <p className='hidden sm:block text-lg md:text-xl lg:text-2xl font-opensans'>
        //                         Get the same quality care as in-office therapy,
        //                         but with the convenience and flexibility of
        //                         online.
        //                     </p>
        //                 </div>
        //                 <div className='px-auto pt-4 mx-auto'>
        //                     <Link href='/bookAnAppointment'>
        //                         <Button
        //                             buttonText='Book An Appointment'
        //                             buttonSize='fit'
        //                         />
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //     ))} */}
        // </Slider>
    );
}

export default HeroSection;

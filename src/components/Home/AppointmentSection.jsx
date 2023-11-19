import { teamMembers } from "@/util/library";
import Button from "../elements/Button";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";
import { useTranslation } from "next-i18next";
import Reveal from "../utils/Reveal";

function AppointmentSection() {
    const { t } = useTranslation("homepage");
    const { user } = UserAuth();
    // Define the paths based on the user's authentication status
    const bookingPath = user ? "/bookAnAppointment" : "/login";

    return (
        <div className=' p-10 md:pl-10 bg-LightBeige md:pr-10 lg:pl-32 lg:pr-32'>
            <Reveal>
                <h2 className='text-center font-semibold lg:font-normal lg:leading-tight lg:text-start pt-12 text-2xl md:text-2xl lg:text-5xl uppercase text-black font-atkinson m-0 pl-6 pr-6'>
                    {t("booking.heading1")} <br />
                    {t("booking.heading2")}
                </h2>
            </Reveal>

            <div className='ml-24 lg:ml-0 md:p-8 lg:p-0 max-w-2xl lg:max-w-none'>
                <div className='flex flex-wrap text-base font-semibold leading-7 text-white lg:space-x-10 md:space-x-5 space-x-5/2 items-center justify-evenly'>
                    {teamMembers.map((member) => (
                        <div key={member.name} className='m-10 p-10'>
                            <div className='group flip-card relative'>
                                <div className='flip-card-inner flex flex-col items-end'>
                                    <div className='flip-card-front absolute w-32 h-32'>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className='w-full h-full object-cover rounded-full border text-center transform transition-transform duration-300'
                                        />
                                    </div>
                                    <div className='flip-card-back absolute w-32 h-32 bg-white text-center flex flex-col justify-center rounded-full border text-center transform transition-transform duration-300 opacity-0 hover:opacity-100'>
                                        <span className='text-lg font-semibold text-black'>
                                            {member.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=' text-black lg:text-lg md:text-lg text-md text-left mx-auto mt-20 p-4 md:p-8 lg:p-8 max-w-2xl lg:max-w-none'>
                <Reveal>
                    <p>
                        {t("booking.paragraph")}
                        {/* With us, you can get the same
                    professionalism and quality care as you would expect from an
                    in-office therapist, but with the ability to communicate
                    whenever and however you want. */}
                    </p>
                </Reveal>
            </div>
            <Reveal>
                <div className='flex justify-center m-4 md:m-6 lg:mb-16 '>
                    <Link href={bookingPath}>
                        <Button
                            buttonText={t("hero.bookingButton")}
                            buttonSize='fit'
                        />
                    </Link>
                </div>
            </Reveal>
        </div>
    );
}

export default AppointmentSection;

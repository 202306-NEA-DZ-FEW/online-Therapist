import { teamMembers } from "@/util/library";
import Button from "../elements/Button";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";

function AppointmentSection() {
    const { user } = UserAuth();
    // Define the paths based on the user's authentication status
    const bookingPath = user ? "/bookAnAppointment" : "/login";

    return (
        <div className='p-10 md:pl-10 bg-GreenLight md:pr-10 lg:pl-20 lg:pr-20'>
            <h2 className='text-center sm:text-xl md:text-2xl lg:text-4xl uppercase text-DarkTeal font-atkinson m-0 pl-6 pr-6'>
                the world&apos;s largest network of professional, licensed,
                accredited, and experienced therapists
            </h2>
            <div className='md:p-8 lg:p-0 max-w-2xl lg:max-w-none'>
                <div className='flex flex-wrap text-base font-semibold leading-7 text-white lg:space-x-10 md:space-x-5 space-x-5/2 items-center justify-evenly'>
                    {teamMembers.map((member) => (
                        <div key={member.name} className='m-10 p-8'>
                            <div className='group flip-card relative'>
                                <div className='flip-card-inner flex flex-col items-center'>
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

            <div className='text-black lg:text-sm md:text-xs sm:text-xs text-left mx-auto mt-20 p-4 md:p-8 lg:p-10 max-w-2xl lg:max-w-none'>
                <p>
                    Life can be tough sometimes. We all go through challenges
                    that can make us feel overwhelmed, stressed, and anxious.
                    When things are getting difficult, it&apos;s important to
                    reach out for help. Therapy can be a great way to work
                    through your challenges and improve your overall well-being.
                    But traditional therapy can be inconvenient and expensive.
                    That&apos;s where we come in. We offer a unique opportunity
                    to access the world&apos;s largest network of licensed,
                    accredited, and experienced therapists, all from the comfort
                    of your own home. With us, you can get the same
                    professionalism and quality care as you would expect from an
                    in-office therapist, but with the ability to communicate
                    whenever and however you want.
                </p>
            </div>

            <div className='flex justify-center m-4 md:m-6 lg:m-10 p-4'>
                <Link href={bookingPath}>
                    <Button buttonText='Book An Appointment' buttonSize='fit' />
                </Link>
            </div>
        </div>
    );
}

export default AppointmentSection;

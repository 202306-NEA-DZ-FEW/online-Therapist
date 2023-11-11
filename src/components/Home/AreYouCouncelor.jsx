import Link from "next/link";
import Image from "next/image";
import Button from "../elements/Button";

const AreYouCouncelor = () => {
    return (
        <div className='font-atkinson mt-24'>
            <h2 className='text-center lg:text-start font-bold block text-3xl md:text-4xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words'>
                Join our team
            </h2>
            <p className='uppercase text-center lg:text-start text-lg md:text-xl text-black/70 my-2'>
                Are you a counselor?
            </p>
            <div className='bg-white/95 flex flex-col lg:flex-row items-center justify-center text-start  rounded-md  shadow-2xl min-h-[20rem]'>
               <div className="p-16 space-y-4 lg:p-0 lg:space-y-0 lg:flex lg:flex-col lg:items-center lg:justify-center">

                <span className='text-lg p-12 font-atkinson text-black/80'>
                    Interested in becoming a part of our revolutionary mental
                    health platform? We offer you the freedom to set your own
                    schedule and decide how much you want to work. Meanwhile, we
                    take care of all the heavy lifting, from handling client
                    referrals to managing all billing details. Join us and focus
                    on what you do best – providing quality mental health
                    services, while we ensure a seamless experience for both you
                    and your clients.
                </span>
                <div className="flex items-center justify-center ">
                    <Link href='/requirements'>
                        <Button
                                        color='teal'
                                        transition={false}
                                        buttonText='LEARN MORE'
                                        buttonSize='lg'
                                        className="xl"
                                    />
                    </Link>
                </div>
               </div>
            <img className="w-96" src="https://img.freepik.com/photos-gratuite/therapeute-femme-mid-shot-presse-papiers_23-2148759113.jpg?w=740&t=st=1699732213~exp=1699732813~hmac=35c0aab09ef3427110b056edfd168654a1c1643ba81298c3268a4b9d7a06805d"/>
            </div>
        </div>
    );
};

export default AreYouCouncelor;

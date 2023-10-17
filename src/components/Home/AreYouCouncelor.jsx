import Link from "next/link";

const AreYouCouncelor = () => {
    return (
        <div className='font-atkinson mt-20'>
            <h2 className='font-normal block text-3xl md:text-4xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words'>
                Join our team
            </h2>
            <p className='uppercase text-lg md:text-xl text-black/70 my-2'>
                Are you a counselor?
            </p>
            <div className='bg-white/95 flex flex-col items-center justify-center text-center py-10 px-5 rounded-md space-y-6 shadow-2xl min-h-[20rem]'>
                {/* <span className='uppercase text-3xl '>
                    Are you a counselor?
       
                </span> */}
                <span className='sm:text-xl text-base text-black/80'>
                    Interested in becoming a part of our revolutionary mental
                    health platform? We offer you the freedom to set your own
                    schedule and decide how much you want to work. Meanwhile, we
                    take care of all the heavy lifting, from handling client
                    referrals to managing all billing details. Join us and focus
                    on what you do best – providing quality mental health
                    services, while we ensure a seamless experience for both you
                    and your clients.
                    {/* TODO

          Add translation
           
          */}
                </span>
                <div>
                    <Link href='/requirements'>
                        {/* button */}
                        {/* 

             TODO 
             replace btn with the reusable button element

            */}
                        <button className='uppercase cursor-pointer py-2 px-3 text-lg rounded text-black/80 font-light bg-[#2DD3E3]'>
                            Learn more
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AreYouCouncelor;

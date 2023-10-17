import Link from "next/link";

const AreYouCouncelor = () => {
    return (
        <div className='w-[90%] mx-auto font-atkinson'>
            <div className='bg-white/95 flex flex-col items-center justify-center text-center py-10 px-5 rounded-md space-y-6 shadow-lg'>
                <span className='uppercase text-4xl'>
                    Are you a counselor?
                    {/* TODO
         
           Add translation 
        
          */}
                </span>
                <span className='text-base rtl:text-xl text-black/80'>
                    Interested in joining our mental health platform? You decide
                    your schedule and how much you want to work, we&apos;ll take
                    care of the client referrals and billing details!
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
                        <button class='uppercase cursor-pointer py-2 px-3 text-lg rounded text-black/80 font-light bg-[#2DD3E3]'>
                            Learn more
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AreYouCouncelor;

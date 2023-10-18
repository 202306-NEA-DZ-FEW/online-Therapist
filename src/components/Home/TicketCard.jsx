import Link from "next/link";

const TicketCard = ({ price, numberOfTickets }) => {
    return (
        <div
            className={
                "bg-white/95 flex flex-col items-center justify-center text-center py-16 rounded-2xl space-y-6 shadow-2xl md:last-of-type:w-full md:last-of-type:mx-auto md:last-of-type:col-span-2 lg:last-of-type:col-auto lg:last-of-type:w-full"
            }
        >
            <div className='flex items-center justify-center space-x-2'>
                <span className='uppercase text-4xl'>
                    {numberOfTickets}$ {"ticket"}
                </span>
            </div>
            <span className='text-base rtl:text-3xl text-black/50'>
                {price}$
            </span>
            <div className='w-fit'>
                <Link href={"/payment"}>
                    <button className='uppercase cursor-pointer py-2 px-3 text-lg rounded text-black/80 font-light bg-[#2DD3E3]'>
                        purchase
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TicketCard;

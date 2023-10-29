import Image from "next/image";
import { useState } from "react";

export default function PaymentCard({ number, name, expDate, onClick }) {
    const [selected, setSelected] = useState(false); // Create a selected state

    const handleCardClick = () => {
        setSelected(!selected);
        if (onClick) {
            onClick(); // Call the onClick callback if provided
        }
    };

    const borderClasses = selected
        ? "border-8 border-Teal"
        : "border border-gray-300";
    return (
        <div
            onClick={handleCardClick}
            className={`${borderClasses} w-[270px] h-[190px] md:w-[280px] md:h-[190px] lg:w-[380px] lg:h-[230px] bg-gradient-to-tr rounded-2xl flex content-center items-center justify-center from-[#9C2CF3] to-[#3A49F9]`}
        >
            <div className='p-8 w-full h-full'>
                <div className='relative w-full h-full'>
                    <Image
                        className='absolute w-[45px] md:w-[45px] lg:w-[60px]'
                        alt='mastercard'
                        src='/mastercard.svg'
                        width={60}
                        height={24}
                    />
                    <Image
                        className='absolute right-0 bottom-0 top-0 my-auto w-[40px] md:w-[40px] lg:w-[50px]'
                        alt='chip'
                        src='/chip.svg'
                        width={50}
                        height={30}
                    />
                    <div className='flex flex-col w-full h-full justify-end gap-4'>
                        <p className='text-lg md:text-lg lg:text-2xl'>
                            {number}{" "}
                        </p>
                        <div className='flex gap-12 md:gap-12 lg:gap-28'>
                            <p className='text-md md:text-md lg:text-lg uppercase'>
                                {name}{" "}
                            </p>
                            <p className='text-md md:text-md lg:text-lg uppercase'>
                                {expDate}{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

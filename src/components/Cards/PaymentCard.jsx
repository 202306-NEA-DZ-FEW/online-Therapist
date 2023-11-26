import Image from "next/image";
import { useState } from "react";

export default function PaymentCard({
    number,
    name,
    expDate,
    CardType,
    onClick,
}) {
    const [selected, setSelected] = useState(false);

    const handleCardClick = () => {
        setSelected(!selected);
        if (onClick) {
            onClick();
        }
    };

    // Define background colors for Master and Visa cards
    const cardColors = {
        mastercard: "from-[#FF9100] to-[#F7353B]",
        visa: "from-[#007FC1] to-[#6AAFDC]",
    };

    const borderClasses = selected
        ? "border-8 border-Teal"
        : "border border-gray-300";
    return (
        <div
            onClick={handleCardClick}
            className={`${borderClasses} w-[270px] h-[190px] md:w-[280px] md:h-[190px] lg:w-[370px] lg:h-[220px] bg-gradient-to-tr ${
                cardColors[CardType] || cardColors.visa
            } rounded-2xl flex content-center items-center justify-center`}
        >
            <div className='p-8 w-full h-full'>
                <div className='relative w-full h-full'>
                    {/* <Image
                        className='absolute w-[45px] md:w-[45px] lg:w-[60px]'
                        alt=''
                        src={`/Images/${CardType}.svg`}
                        width={60}
                        height={24}
                    /> */}
                    <Image
                        className='absolute right-0 bottom-0 top-0 my-auto w-[40px] md:w-[40px] lg:w-[50px]'
                        alt='chip'
                        src='/Images/chip.svg'
                        width={50}
                        height={30}
                    />
                    <div className='flex flex-col w-full h-full justify-end gap-4'>
                        <p className='text-lg text-white md:text-lg lg:text-2xl'>
                            {number}{" "}
                        </p>
                        <div className='flex gap-12 md:gap-12 lg:gap-28'>
                            <p className='text-md text-white md:text-md lg:text-lg uppercase'>
                                {name}{" "}
                            </p>
                            <p className='text-md text-white md:text-md lg:text-lg uppercase'>
                                {expDate}{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";

export default function PaymentCard({ number, name, expDate }) {
    return (
        <div className='w-[260px] h-[190px] md:w-[280px] md:h-[190px] lg:w-[380px] lg:h-[230px] bg-gradient-to-tr rounded-2xl flex content-center items-center justify-center from-[#9C2CF3] to-[#3A49F9]'>
            <div className='p-8 w-full h-full'>
                <div className='relative w-full h-full'>
                    <Image
                        className='absolute'
                        alt=''
                        src='/mastercard.svg'
                        width={60}
                        height={24}
                    />
                    <Image
                        className='absolute right-0 bottom-0 top-0 my-auto'
                        alt=''
                        src='/chip.svg'
                        width={50}
                        height={30}
                    />
                    <div className='flex flex-col w-full h-full justify-end gap-4'>
                        <p className='text-2xl'>{number} </p>
                        <div className='flex gap-28'>
                            <p className='text-lg uppercase'>{name} </p>
                            <p className='text-lg uppercase'>{expDate} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

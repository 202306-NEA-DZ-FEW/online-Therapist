import Image from "next/image";
import Link from "next/link";

const TeamCard = ({ name, role, imgUrl, github, linkedIn }) => {
    return (
        <div className='flex flex-col bg-[#EAF8F9] rounded-t-[25px] w-[178.39px] h-[390.21px]'>
            <Image
                className='rounded-t-[25px] w-full'
                src={imgUrl}
                width={178.39}
                height={190.42}
            />

            <div className='w-full h-1 bg-green-500 rounded-full -mt-1' />
            <h3 className='mt-4 text-xl font-bold justify-center'>{name}</h3>

            <p className='mt-2 text-base justify-center'>{role}</p>

            <div className='flex justify-center mx-4 my-8'>
                <Link href={`https://github.com/${github}`}>
                    <img className='w-[30px]' src='./github.svg' />
                </Link>

                <Link href={`${linkedIn}`} className='ml-2'>
                    <img className='w-[30px]' src='./linkedin.svg' />
                </Link>
            </div>
        </div>
    );
};

export default TeamCard;

import Image from "next/image";
import Link from "next/link";

const TeamCard = ({ name, role, imgUrl, github, linkedIn }) => (
    <div className='relative bg-blue-100 rounded-2xl shadow-lg p-6 w-card h-card flex flex-col justify-between transition hover:scale-105'>
        <div className='absolute top-0 left-0 w-full h-48'>
            <Image
                className='rounded-t-lg object-cover w-full h-full'
                src={imgUrl || "/default-image.jpg"}
                alt={name}
                layout='responsive'
                width={100}
                height={100}
            />
        </div>

        <div className='relative pt-48 text-center mt-8 rtl:mt-20'>
            {/* Increased margin-top for even more padding */}
            <h3 className='text-xl font-bold'>{name}</h3>
            <p className='text-gray-600'>{role}</p>
        </div>

        <SocialLinks github={github} linkedIn={linkedIn} />
    </div>
);

const SocialLink = ({ href, icon, alt }) => (
    <Link
        href={href || "#"}
        target='_blank'
        rel='noopener noreferrer'
        className='block p-1 rounded-full hover:bg-gray-300 transition mr-2'
    >
        <img src={icon} alt={alt} />
    </Link>
);

const SocialLinks = ({ github, linkedIn }) => (
    <div className='flex justify-center mt-2'>
        <SocialLink
            href={`https://github.com/${github}`}
            icon='/github.svg'
            alt='GitHub'
        />
        <SocialLink href={linkedIn} icon='/linkedin.svg' alt='LinkedIn' />
    </div>
);

export default TeamCard;

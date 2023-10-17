import Link from "next/link";
import Image from "next/image";

const Card = ({ title, text, imgSrc, url }) => {
    return (
        <div class='overflow-hidden  aspect-video cursor-auto rounded-md relative group my-1'>
            <div class='h-full z-50 opacity-90 group-hover:opacity-100 transition duration-300 ease-in-out cursor-auto absolute from-teal-950 to-transparent bg-gradient-to-t inset-x-0 -bottom-2  text-white flex items-end'>
                <div>
                    <div class='transform-gpu p-4 space-y-0 text-lg group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 pb-8  transition duration-300 ease-in-out'>
                        <div class='font-semibold text-2xl'>{title}</div>

                        <div class=' text-sm  text-white '>
                            <p className=' line-clamp-1'>{text}</p>
                            <Link
                                href={url}
                                className='underline flex justify-end mr-5 mt-2 text-teal-100 hover:text-teal-400 group-hover:animate-bounce text-base'
                            >
                                {" "}
                                Read more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Image
                src={imgSrc}
                alt={title}
                height={200}
                width={300}
                class='object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out'
            />
        </div>
    );
};

export default Card;

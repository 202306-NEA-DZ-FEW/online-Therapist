import Image from "next/image"
import {useTranslation} from "next-i18next"

import Profile from "/public/profile.png"
const Comments = ({comments = [], language}) => {
    const {t} = useTranslation("blog")
    return (
        <div className=''>
            <ul className='md:px-3'>
                <h2 className='my-4 text-2xl lg:text-3xl font-bold text-black/80'>
                    {t("latest")}
                </h2>
                {comments?.map(
                    ({_id, _createdAt, name, email, comment, image}) => (
                        <li key={_id} className='bg-gray-50 rounded-md my-1'>
                            <div className='flex flex-row gap-5 items-center md:p-5 p-2'>
                                <Image
                                    src={image || Profile}
                                    height={60}
                                    width={60}
                                    alt='user image'
                                    className='rounded-full h-14 w-14'
                                ></Image>
                                <div className='flex-col'>
                                    <h4 className='text-base md:text-xl font-bold text-black/80'>
                                        <a href={`mailto:${email}`}>{name}</a>
                                    </h4>
                                    <p className='mt-1 md:mt-0 text-[.7rem] md:text-[.9rem] text-black/75 rtl:text-lg rtl:md:text-[1.3rem]'>
                                        {comment}
                                    </p>
                                    <p className='text-[.6rem] mt-2'>
                                        {new Date(
                                            _createdAt
                                        ).toLocaleDateString(
                                            language == "en"
                                                ? "en-US"
                                                : "ar-DZ",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}

export default Comments

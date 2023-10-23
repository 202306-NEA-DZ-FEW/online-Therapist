import Link from "next/link";
import React from "react";

function OpenPos({ title, description, type, typeInfo }) {
    return (
        <div>
            <div className='block lg:grid lg:grid-cols-6 lg:gap-7'>
                <div className='col-span-5'>
                    <Link href='/contact'>
                        <p className='text-xl lg:text-2xl text-Teal hover:underline hover:cursor-pointer'>
                            {title}
                        </p>
                    </Link>
                    <p className='text-lg lg:text-xl text-Gray hidden lg:block'>
                        {description}
                    </p>
                </div>
                <div>
                    <p className='text-xl lg:text-2xl text-Teal hidden lg:block'>
                        {type}
                    </p>
                    <p className='text-lg lg:text-xl text-Gray'>{typeInfo}</p>
                </div>
            </div>
            <hr className='h-px mt-5 mb-2 bg-Gray border-0 dark:bg-gray-700' />
        </div>
    );
}

export default OpenPos;

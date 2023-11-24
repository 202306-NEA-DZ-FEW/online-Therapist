import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { LuMessagesSquare } from "react-icons/lu";
import { FiVideo } from "react-icons/fi";
import Reveal from "../utils/Reveal";

export default function CommunicationCard({
    icon,
    title,
    paragraph,
    greenBackground,
}) {
    const IconComponent = {
        call: <FiPhoneCall />,
        videoCall: <FiVideo />,
        chat: <LuMessagesSquare />,
    }[icon];
    return (
        <Reveal>
            <div className='h-auto lg:h-[355px]'>
                <div className='hover:scale-105 border border-gray p-1 h-64 w-56 lg:h-80 lg:w-60 rounded-3xl m-4 shadow-xl'>
                    <div
                        className={`flex flex-col h-32 w-[215px] lg:h-44 lg:w-[230px] rounded-[20px]  ${greenBackground} `}
                    >
                        <span className='text-5xl lg:text-6xl m-auto'>{IconComponent}</span>
                        <h3 className='mx-auto text-xl lg:text-3xl font-atkinson mb-4 lg:mb-8'>
                            {title}
                        </h3>
                    </div>
                    <p className='font-atkinson text-center p-6 text-md lg:text-lg text-gray-700'>
                        {paragraph}
                    </p>
                </div>
            </div>
        </Reveal>
    );
}

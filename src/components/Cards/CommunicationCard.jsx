import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { LuMessagesSquare } from "react-icons/lu";
import { FiVideo } from "react-icons/fi";

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
        <div className='border border-gray h:44 w-56 lg:h-80 lg:w-60 rounded-3xl m-4 shadow-xl'>
            <div
                className={`flex flex-col h-44 w-[2356x] rounded-3xl  ${greenBackground} `}
            >
                <span className='text-6xl m-auto'>{IconComponent}</span>
                <h3 className='mx-auto text-3xl font-atkinson font- mb-8'>
                    {title}
                </h3>
            </div>
            <p className='font-atkinson text-center p-6 text-lg text-gray-700'>
                {paragraph}
            </p>
        </div>
    );
}

// import { FaComment, FaVideo } from "react-icons/fa";
// import { FiHeadphones } from "react-icons/fi";

// function CommunicationCard({ icon, title, paragraph, greenBackground }) {
// const IconComponent = {
//     call: <FiHeadphones />,
//     videoCall: <FaVideo />,
//     chat: <FaComment />,
// }[icon];
//     return (
//         <div className='flex flex-col justify-evenly bg-white w-64 h-64 p-1 m-1 border border-separate rounded-xl shadow-xl text-center'>
//             <div
//                 className={`flex flex-col h-1/2 ${greenBackground} rounded-md items-center justify-center`}
//             >
//                 <div className=' text-4xl flex justify-center text-indigo-600 mb-2'>
//                     {IconComponent}
//                 </div>
//                 <h3 className=' text-xl font-semibold mb-2'>{title}</h3>
//             </div>
//             <div className='flex flex-col h-1/2 bg-white items-center justify-center'>
//                 <p className=' text-gray-600'>{paragraph}</p>
//             </div>
//         </div>
//     );
// }

// export default CommunicationCard;

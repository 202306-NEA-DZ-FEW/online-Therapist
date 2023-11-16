import Link from "next/link";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { UserAuth } from "@/context/AuthContext";
import Appointments from "@/components/dashboard/Appointments";
import Patients from "@/components/dashboard/Patients";
import Messages from "@/components/dashboard/Messages";
import Calender from "@/components/dashboard/Calender";
import { links } from "@/util/library";

export default function TherapistDashboard() {
    const { user } = UserAuth();
    const [activeLink, setActiveLink] = useState("appointments");

    const renderContent = () => {
        switch (activeLink) {
            case "appointments":
                return <Appointments />;
            case "messages":
                return <Messages />;
            case "calendar":
                return <Calender />;
            case "patients":
                return <Patients />;
            default:
                return null;
        }
    };
   
    return (
        <div className='font-poppins'>
            <div className='h-full flex flex-row'>
                {/* <button
       
        class="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 "
      >
        <svg
          class="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button> */}
                <div className='bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out'>
                    <div className='space-y-6 md:space-y-10 mt-10'>
                        <h1 className=' md:block font-bold text-sm md:text-2xl text-center'>
                            Dashboard
                        </h1>
                        <div className='space-y-3'>
                            {user && (
                                <>
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt='Avatar user'
                                            className='w-10 md:w-16 rounded-full mx-auto'
                                        />
                                    ) : (
                                        <CgProfile className='w-10 h-10 md:w-16  rounded-full mx-auto text-gray-500' />
                                    )}
                                    <div>
                                        <h2 className='font-medium text-xs md:text-sm text-center text-Teal'>
                                            {user.displayName}
                                        </h2>
                                        <p className='text-xs text-gray-500 text-center'>
                                            {user.email}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>     
                        <div className='flex font- flex-col space-y-2'>
                            <hr />
                            {links.map((link) => (
                              <Link
                                key={link.id}
                                onClick={() => setActiveLink(link.name)}
                                href={link.href}
                                className={`flex items-center gap-x-3 text-sm font-medium text-gray-700 py-2 px-2 hover:bg-Teal hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out ${activeLink === link.name
                                    ? "bg-Teal text-white"
                                    : ""}`}
                              >
                                <span className='text-2xl'>
                                  {link.icon}
                                </span>
                                <span>{link.text}</span>
                              </Link>
                               
                            ))}

                            <hr />
                        </div>
                    </div>
                </div>

                <div className='flex-grow p-4'>{renderContent()}</div>
            </div>
        </div>
    );
}

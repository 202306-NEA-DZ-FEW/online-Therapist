import React from "react";

import CommunicationCard from "../Cards/CommunicationCard";

function CommunicationSection() {
    return (
        <div className='p-10 bg-LightBeige'>
            <h2 className='lg:text-4xl md:text-2xl sm:text-xl text-DarkTeal uppercase text-center font-atkinson'>
                we can communicate through
            </h2>
            <div className='flex justify-center mx-auto mt-10'>
                <div className='flex-1 sm:overflow-y-auto sm:pl-16'>
                    <div className='flex flex-wrap justify-center bg m-4 md:flex-row md:gap-8 sm:gap-4'>
                        <CommunicationCard
                            greenBackground='bg-Green'
                            icon='call' // Use 'call' for the phone icon
                            title='Voice Call'
                            paragraph='Ready to talk to a therapist? Give them a call and let it all out!'
                        />

                        <CommunicationCard
                            greenBackground='bg-SkyBlue'
                            icon='videoCall' // Use 'videoCall' for the video call icon
                            title='Video Call'
                            paragraph="Your therapist recommends video calls, but it's your choice."
                        />

                        <CommunicationCard
                            greenBackground='bg-Crovet'
                            icon='chat' // Use 'chat' for the chat icon
                            title='Chat'
                            paragraph='Need to talk? Let your therapist listen.'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunicationSection;

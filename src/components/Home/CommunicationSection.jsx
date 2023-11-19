import React from "react";

import CommunicationCard from "../Cards/CommunicationCard";
import { useTranslation } from "next-i18next";
import Reveal from "../utils/Reveal";

function CommunicationSection() {
    const { t } = useTranslation("homepage");
    return (
        <div className=' p-16 bg-white'>
            <Reveal>
                <h2 className='lg:text-5xl md:text-3xl text-3xl text-black font-bold uppercase text-center font-atkinson'>
                    {t("communication.heading")}
                </h2>
            </Reveal>
            <div className='flex justify-center mx-auto mt-12 mr-16 h-auto '>
                <div className='flex-1 overflow-y-auto sm:pl-16'>
                    <div className='flex flex-wrap justify-center bg m-4 md:flex-row md:gap-8 gap-4'>
                        <CommunicationCard
                            greenBackground='bg-LightTeal'
                            icon='call' // Use 'call' for the phone icon
                            title={t("communication.voiceCall")}
                            paragraph={t("communication.voiceText")}
                        />

                        <CommunicationCard
                            greenBackground='bg-SkyBlue'
                            icon='videoCall' // Use 'videoCall' for the video call icon
                            title={t("communication.videoCall")}
                            paragraph={t("communication.videoText")}
                        />

                        <CommunicationCard
                            greenBackground='bg-LightOrange'
                            icon='chat' // Use 'chat' for the chat icon
                            title={t("communication.chat")}
                            paragraph={t("communication.chatText")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunicationSection;

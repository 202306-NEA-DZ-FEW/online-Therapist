import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Button from "../elements/Button";
import { TiTicket } from "react-icons/ti";
import { BsCheckCircleFill } from "react-icons/bs";
import { useTranslation } from "next-i18next";
import Reveal from "../utils/Reveal";

const TicketCard = ({ price }) => {
    const router = useRouter();
    const { t } = useTranslation("homepage");
    const { user } = UserAuth();

    const handleClick = () => {
        // Check if the user is logged in
        if (!user) {
            router.push("/login/");
        } else {
            router.push(`/buyTicket/${price.id}`);
        }
    };
    const ticketNumbers = Number(price.nickname);

    return (
        <div className='hover:border hover:border-Teal hover:scale-105 bg-white/95 flex flex-col items-center justify-center text-center py-10 rounded-2xl space-y-2 md:space-y-6 shadow-2xl md:last-of-type:w-full md:last-of-type:mx-auto md:last-of-type:col-span-2 lg:last-of-type:col-auto lg:last-of-type:w-full'>
            <Reveal>
                <span className='flex text-4xl'>
                    <TiTicket />
                </span>
            </Reveal>

            <div className='flex items-center justify-center space-x-2'>
                <Reveal>
                    <span className='uppercase font-atkinson text-3xl md:text-4xl'>
                        {price.nickname} {t("tickets.tickets")}
                    </span>
                </Reveal>
            </div>
            <Reveal>
                <span className='text-3xl rtl:text-3xl font-semibold text-Teal'>
                    {price.unit_amount / 100}$
                </span>
            </Reveal>
            <Reveal>
                <p>
                    <span className='text-2xl font-semibold text-Teal'>
                        {price.unit_amount / 100 / ticketNumbers}$
                    </span>
                    <span className='text-black text-lg'>
                        / {t("tickets.ticket")}{" "}
                    </span>
                </p>
            </Reveal>
            <Reveal>
                <div className='hidden md:block font-atkinson text-xl text-start'>
                    <p>{t("tickets.text")} </p>

                    <ul>
                        <li className='flex flex-row space-x-2 items-center'>
                            <BsCheckCircleFill className='text-Teal' />{" "}
                            <span> {t("communication.videoCall")}</span>
                        </li>
                        <li className='flex flex-row space-x-2 items-center'>
                            <BsCheckCircleFill className='text-Teal' />{" "}
                            <span>{t("communication.chat")}</span>
                        </li>
                        <li className='flex flex-row space-x-2 items-center'>
                            <BsCheckCircleFill className='text-Teal' />{" "}
                            <span>{t("communication.voiceCall")}</span>
                        </li>
                    </ul>
                </div>
            </Reveal>
            <div className='w-fit'>
                <Reveal>
                    <Button
                        color='teal'
                        transition={false}
                        buttonText={t("tickets.purchaseButton")}
                        buttonSize='fit'
                        clickFunction={handleClick}
                    />
                </Reveal>
            </div>
        </div>
    );
};

export default TicketCard;

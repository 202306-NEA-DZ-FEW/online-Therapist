import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Button from "../elements/Button";
import { GiCheckMark } from "react-icons/gi";
import { TiTicket } from "react-icons/ti";
import { BsCheckCircleFill } from "react-icons/bs";

const TicketCard = ({ price }) => {
    const router = useRouter();
    const { user } = UserAuth();
    const handleClick = () => {
        // Check if the user is logged in
        if (!user) {
            // If not logged in, show an alert
            window.alert("You need to be logged in to purchase the tickets.");
        } else {
            router.push(`/buyTicket/${price.id}`);
        }
    };
    const ticketNumbers = Number(price.nickname);

    return (
        <div className='bg-white/95 flex flex-col items-center justify-center text-center py-10 rounded-2xl space-y-6 shadow-2xl md:last-of-type:w-full md:last-of-type:mx-auto md:last-of-type:col-span-2 lg:last-of-type:col-auto lg:last-of-type:w-full'>
            <span className='flex text-4xl'>
            <TiTicket />
            </span>
            <div className='flex items-center justify-center space-x-2'>
                <span className='uppercase font-atkinson text-4xl'>
                    {price.nickname} {"Tickets "}
                </span>
            </div>
            <span className='text-3xl rtl:text-3xl font-semibold text-Teal'>
                {price.unit_amount / 100}$
            </span>
            <p>
                 <span className='text-2xl font-semibold text-Teal'>{price.unit_amount / 100 / ticketNumbers}$</span>
                <span className='text-black text-lg'>/ Ticket </span>
            </p>
            <div className='font-atkinson text-xl text-start'>
                <p>You can use the tickets for :</p>
                <ul>
                    <li className='flex flex-row space-x-2 items-center'>
                        <BsCheckCircleFill className="text-Teal"/> <span>Video calls</span>
                    </li>
                    <li className='flex flex-row space-x-2 items-center'>
                        <BsCheckCircleFill className="text-Teal"/> <span>Chat</span>
                    </li>
                    <li className='flex flex-row space-x-2 items-center'>
                        <BsCheckCircleFill className="text-Teal" /> <span>Voice calls</span>
                    </li>
                </ul>
            </div>
            <div className='w-fit'>
                <Button
                    color='teal'
                    transition={false}
                    buttonText='PURCHASE'
                    buttonSize='fit'
                    clickFunction={handleClick}
                />
            </div>
        </div>
    );
};

export default TicketCard;

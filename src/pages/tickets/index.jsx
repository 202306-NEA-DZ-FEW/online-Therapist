import { UserAuth } from "@/context/AuthContext";

const PatientProfile = () => {
    const { totalTickets, cards } = UserAuth();

    return (
        <div>
            <h2>total Ticket Quantity</h2>
            <p>{totalTickets}</p>
            <p>{cards.length}</p>
        </div>
    );
};

export default PatientProfile;

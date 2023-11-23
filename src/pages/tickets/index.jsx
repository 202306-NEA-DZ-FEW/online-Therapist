import { UserAuth } from "@/context/AuthContext";

const patientProfile = () => {
    const { totalTickets } = UserAuth();

    return (
        <div>
            <h2>total Ticket Quantity</h2>
            <p>{totalTickets}</p>
        </div>
    );
};

export default patientProfile;

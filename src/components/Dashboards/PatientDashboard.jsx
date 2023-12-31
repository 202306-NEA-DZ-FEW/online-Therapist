import Sidebar from "@/components/Sidebar/Sidebar";
import { UserAuth } from "@/context/AuthContext";
import Therapists from "./Links/Therapists";
import PatientAppointments from "@/components/Dashboards/Links/PatientAppointments";

export default function PatientDashboard() {
    const { activeLink } = UserAuth();

    const renderContent = () => {
        switch (activeLink) {
            case "appointments":
                return <PatientAppointments />;
            case "therapists":
                return <Therapists />;
            default:
                return null;
        }
    };

    return (
        <div className='font-poppins'>
            <div className='h-full flex flex-row'>
                <Sidebar />
                <div className='flex-grow p-4'>{renderContent()}</div>
            </div>
        </div>
    );
}

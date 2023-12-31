import Patients from "@/components/Dashboards/Links/Patients";
import TherapistAppointments from "@/components/Dashboards/Links/TherapistAppointments";
import Sidebar from "@/components/Sidebar/Sidebar";
import { UserAuth } from "@/context/AuthContext";
import WaitingAppointments from "@/components/Dashboards/Links/WaitingAppointments";

export default function TherapistDashboard() {
    const { activeLink } = UserAuth();

    const renderContent = () => {
        switch (activeLink) {
            case "appointments":
                return <WaitingAppointments />;
            case "therapist appointments":
                return <TherapistAppointments />;
            case "patients":
                return <Patients />;
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

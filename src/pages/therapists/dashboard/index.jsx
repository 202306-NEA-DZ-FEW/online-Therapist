import Appointments from "@/components/dashboard/Appointments";
import Patients from "@/components/dashboard/Patients";
import Messages from "@/components/dashboard/Messages";
import Calender from "@/components/dashboard/Calender";
import Sidebar from "@/components/Sidebar/Sidebar";
import { UserAuth } from "@/context/AuthContext";

export default function TherapistDashboard() {
    const { activeLink } = UserAuth();

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
                <Sidebar />
                <div className='flex-grow p-4'>{renderContent()}</div>
            </div>
        </div>
    );
}

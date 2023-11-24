import Messages from "@/components/Dashboards/Links/Messages";
// import Calender from "@/components/Dashboards/Links/Calender";
import Sidebar from "@/components/Sidebar/Sidebar";
import { UserAuth } from "@/context/AuthContext";
import Therapists from "./Links/Therapists";
import PatientAppointments from "@/components/Dashboards/Links/PatientAppointments";

export default function PatientDashboard() {
    const { activeLink } = UserAuth();

    const renderContent = () => {
        switch (activeLink) {
            case "patient appointments":
                return <PatientAppointments />;
            case "messages":
                return <Messages />;
            // case "calendar":
            //     return <Calender />;
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

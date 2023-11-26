import { UserAuth } from "@/context/AuthContext";
import TherapistDashboard from "@/components/Dashboards/ThearapistDashboard";
import PatientDashboard from "@/components/Dashboards/PatientDashboard";
import Layout from "@/layout/Layout";

export default function Dashboard() {
    const { user } = UserAuth();
    const renderContent = () => {
        if (user?.isTherapist) {
            return <TherapistDashboard />;
        } else return <PatientDashboard />;
    };

    return <Layout>{renderContent()}</Layout>;
}

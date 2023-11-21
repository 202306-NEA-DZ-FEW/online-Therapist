import React from "react";

import { UserAuth } from "@/context/AuthContext";
import TherapistDashboard from "@/components/Dashboards/ThearapistDashboard";
import PatientDashboard from "@/components/Dashboards/PatientDashboard";

export default function Dashboard() {
    const { user } = UserAuth();
    const renderContent = () => {
        if (user?.isTherapist) {
            return <TherapistDashboard />;
        } else return <PatientDashboard />;
    };

    return <div>{renderContent()}</div>;
}

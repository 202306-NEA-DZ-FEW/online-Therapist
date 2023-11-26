import { UserAuth } from "@/context/AuthContext";
import TherapistDashboard from "@/components/Dashboards/ThearapistDashboard";
import PatientDashboard from "@/components/Dashboards/PatientDashboard";
import Layout from "@/layout/Layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Dashboard() {
    const { user } = UserAuth();
    const renderContent = () => {
        if (user?.isTherapist) {
            return <TherapistDashboard />;
        } else return <PatientDashboard />;
    };

    return <Layout>{renderContent()}</Layout>;
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "dashboard"])),
            // Will be passed to the page component as props
        },
    };
}
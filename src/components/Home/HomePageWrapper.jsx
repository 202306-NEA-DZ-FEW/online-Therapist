import HeroSection from "@/components/Home/HeroSection";
import AppointmentSection from "@/components/Home/AppointmentSection";
import CommunicationSection from "@/components/Home/CommunicationSection";
import RecentBlogsSection from "@/components/Home/RecentBlogsSection";
import TicketsSection from "@/components/Home/TicketsSection";

const HomePageWrapper = () => {
    return (
        <>
            <HeroSection />
            <AppointmentSection />
            <CommunicationSection />
            <RecentBlogsSection />
            <TicketsSection />
        </>
    );
};

export default HomePageWrapper;

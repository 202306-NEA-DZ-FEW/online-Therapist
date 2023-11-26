import AppointmentSection from "@/components/Home/AppointmentSection"
import CommunicationSection from "@/components/Home/CommunicationSection"
import HeroSection from "@/components/Home/HeroSection"
import RecentBlogsSection from "@/components/Home/RecentBlogsSection"
import TicketsSection from "@/components/Home/TicketsSection"

const HomePageWrapper = ({posts}) => {
    return (
        <>
            <HeroSection />
            <AppointmentSection />
            <CommunicationSection />
            <RecentBlogsSection posts={posts} />
            <TicketsSection />
        </>
    )
}

export default HomePageWrapper

import { HiUserGroup } from "react-icons/hi";
import { LuMessagesSquare } from "react-icons/lu";
import { IoCalendar } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { HiHome } from "react-icons/hi";

export const slideImages = [
    {
        imgSrc: "2",
        id: "1",
    },
    {
        imgSrc: "4",
        id: "2",
    },
    {
        imgSrc: "6",
        id: "3",
    },
    {
        imgSrc: "8",
        id: "4",
    },
    {
        imgSrc: "13",
        id: "5",
    },

    {
        imgSrc: "1",
        id: "6",
    },
    {
        imgSrc: "17",
        id: "7",
    },

    {
        imgSrc: "14",
        id: "8",
    },
    // {
    //     imgSrc: "18",
    //     id: "9",
    // },
    // {
    //     imgSrc: "20",
    //     id: "10",
    // },
];

export const images = [
    {
        id: 1,
        type: "image",
        imgSrc: "https://c.stocksy.com/a/uBaE00/za/3475714.jpg",
    },
    {
        id: 2,
        type: "image",
        imgSrc: "https://c.stocksy.com/a/HVAM00/za/5283595.jpg",
    },
    {
        id: 3,
        // type: "image",
        imgSrc: "https://c.stocksy.com/a/GEqF00/za/3775692.jpg",
    },
    // {
    //     id: 4,
    //     type: "video",
    //     imgSrc: "https://c.stocksy.com/a/VZAM00/y2/5283857.mp4",
    // },
    {
        id: 4,
        type: "image",
        imgSrc: "https://c.stocksy.com/a/VSOH00/za/4145599.jpg",
    },
    {
        id: 5,
        type: "image",
        imgSrc: "https://c.stocksy.com/a/uBaE00/za/3475714.jpg",
    },
    {
        id: 6,
        type: "image",
        imgSrc: "https://c.stocksy.com/a/EUzL00/za/5241246.jpg",
    },
    {
        id: 7,
        type: "image",
        imgSrc: "https://c.stocksy.com/a/cBaE00/za/3475696.jpg",
    },
];

export const teamMembers = [
    {
        name: "Maria JR",
        //   linkedin: "",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/03/psychologist-psychiatrist-vs-therapist-1-800x500.jpg",
    },
    {
        name: "Marris Adikwu",
        //   linkedin: "",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/06/Marris_Headshot-150x150.jpg",
    },
    {
        name: "Bisma Anwar",
        //   linkedin: "",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/09/Bisma_Circle-min-1-150x150.png",
    },
    {
        name: "Joseph Rauch",
        //   linkedin: "",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/01/Joseph-Rauch.png",
    },
    {
        name: "Jor-El Caraballo",
        //   linkedin: "",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/06/Jor-El-Caraballo-150x150.jpg",
    },
];

export const links = [
    {
        id: 1,
        name: "home",
        href: "/",
        icon: <HiHome />,
        text: "Home",
    },
    {
        id: 2,
        name: "appointments",
        href: "",
        icon: <FaClipboardList />,
        text: "Appointments",
    },
    {
        id: 3,
        name: "messages",
        href: "",
        icon: <LuMessagesSquare />,
        text: "Messages",
    },
    {
        id: 4,
        name: "calendar",
        href: "",
        icon: <IoCalendar />,
        text: "Calendar",
    },
    {
        id: 5,
        name: "patients",
        href: "",
        icon: <HiUserGroup />,
        text: "Patients",
    },
    {
        id: 6,
        name: "profile",
        href: "/therapists/profile/",
        icon: <CgProfile />,
        text: "Profile",
    },
    {
        id: 7,
        name: "settings",
        href: "/therapists/profile/",
        icon: <IoSettingsSharp />,
        text: "Settings",
    },
];

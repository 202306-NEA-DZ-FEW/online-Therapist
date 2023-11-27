export const members = [
    {
        id: 1,
        name_en: "Lilia Bendjeddou",
        name_ar: "ليليا بن جدو",
        role_en: "Front-end & Web Developer",
        role_ar: "مُطَوِّر واجهة المستخدم ومُطَوِّر الوِيب",
        imgUrl: "/Images/member1.png",
        linkedIn: "www.linkedin.com/in/lilia-bendjeddou-705679256/",
        github: "Lilicod",
    },
    {
        id: 2,
        name_en: "Mohamed Matassi",
        name_ar: "محمد مطاسي",
        role_en: "Front-end & Web Developer",
        role_ar: "مُطَوِّر واجهة المستخدم ومُطَوِّر الوِيب",
        imgUrl: "/Images/member2.png",
        linkedIn: "www.linkedin.com/in/matassi-mohamed",
        github: "M07am3dM",
    },
    {
        id: 3,
        name_en: "Walid Lamraoui",
        name_ar: "وليد لعمراوي",
        role_en: "Front-end & Web Developer",
        role_ar: "مُطَوِّر واجهة المستخدم ومُطَوِّر الوِيب",
        imgUrl: "/Images/member3.png",
        linkedIn: " linkedin.com/in/walid-lamraoui/",
        github: "dzc0d3r",
    },
    {
        id: 4,
        name_en: "Meriem Mansouri",
        name_ar: "مريم منصوري",
        role_en: "Front-end & Web Developer",
        role_ar: "مُطَوِّر واجهة المستخدم ومُطَوِّر الوِيب",
        imgUrl: "/Images/member4.png",
        linkedIn: "https://www.linkedin.com/in/meriem-mansouri-1b1643276/",
        github: "meryem08",
    },
    {
        id: 5,
        name_en: "Dalila Benhamed",
        name_ar: "بن حامد دليلة",
        role_en: "Front-end & Web Developer",
        role_ar: "مُطَوِّر واجهة المستخدم ومُطَوِّر الوِيب",
        imgUrl: "/Images/member5.png",
        linkedIn: "www.linkedin.com/in/dalila-dalila-81a3a3200",
        github: "dalilia",
    },
    {
        id: 6,
        name_en: " Sid Ali Habchi",
        name_ar: "حبشي سيد علي",
        role_en: "Front-end & Web Developer",
        role_ar: "مُطَوِّر واجهة المستخدم ومُطَوِّر الوِيب",
        imgUrl: "/Images/member6.png",
        linkedIn: "www.linkedin.com/in/sid-ali-habchi-10216125a/",
        github: "HabchiSidAli",
    },
    /*name,id,img,github,linkedin*/
];

import { CgProfile } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

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
        type: "image",
        imgSrc: "https://c.stocksy.com/a/GEqF00/za/3775692.jpg",
    },
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
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/03/psychologist-psychiatrist-vs-therapist-1-800x500.jpg",
    },
    {
        name: "Marris Adikwu",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/06/Marris_Headshot-150x150.jpg",
    },
    {
        name: "Bisma Anwar",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/09/Bisma_Circle-min-1-150x150.png",
    },
    {
        name: "Joseph Rauch",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/01/Joseph-Rauch.png",
    },
    {
        name: "Jor-El Caraballo",
        image: "https://www.talkspace.com/blog/wp-content/uploads/2020/06/Jor-El-Caraballo-150x150.jpg",
    },
];

export const therapistLinks = [
    {
        id: 1,
        name: "home",
        href: "/",
        icon: <HiHome />,
        text_en: "Home",
        text_ar: "الصفحة الرئيسية",
    },
    {
        id: 2,
        name: "appointments",
        href: "",
        icon: <IoCalendar />,
        text_en: "Waiting Appointments",
        text_ar: "المواعيد في انتظار",
    },
    {
        id: 3,
        name: "therapist appointments",
        href: "",
        icon: <FaClipboardList />,
        text_en: "Appointments",
        text_ar: "مواعيد ",
    },
    {
        id: 4,
        name: "patients",
        href: "",
        icon: <HiUserGroup />,
        text_en: "Patients",
        text_ar: "مرضى",
    },
    {
        id: 5,
        name: "profile",
        href: "/therapists/profile/",
        icon: <CgProfile />,
        text_en: "Profile",
        text_ar: "حساب الشخصي",
    },
    {
        id: 6,
        name: "settings",
        href: "/therapists/profile/",
        icon: <IoSettingsSharp />,
        text_en: "Settings",
        text_ar: "إعدادات",
    },
];

export const patientLinks = [
    {
        id: 1,
        name: "home",
        href: "/",
        icon: <HiHome />,
        text_en: "Home",
        text_ar: "الصفحة الرئيسية",
    },
    {
        id: 2,
        name: "appointments",
        href: "",
        icon: <FaClipboardList />,
        text_en: "Appointments",
        text_ar: "مواعيد ",
    },
    { 
        id: 3,
        name: "therapists",
        href: "",
        icon: <IoCalendar />,
        text_en: "Therapists",
        text_ar: "المعالجين",
    },
    {
        id: 4,
        name: "profile",
        href: "/profile/",
        icon: <CgProfile />,
        text_en: "Profile",
        text_ar: "حساب الشخصي",
    },
    {
        id: 5,
        name: "settings",
        href: "/profile/",
        icon: <IoSettingsSharp />,
        text_en: "Settings",
        text_ar: "إعدادات",
    },
];

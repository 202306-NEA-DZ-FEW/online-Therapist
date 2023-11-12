import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import Edit from "public/edit-profile.svg";
import Profile from "public/profile.svg";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { storage } from "@/util/firebase";

const ProfileImage = () => {
    const { user, updateProfilePhoto, setLoading, loading } = useAuth();
    const [ProfileImage, setProfileImage] = useState("");
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const imageName = `${user.uid}`;
        const path = "images/users/";
        setProfileImage(URL.createObjectURL(file));
        try {
            if (!file) return;
            const imageRef = ref(storage, `${path}/${imageName}`);
            try {
                await uploadBytes(imageRef, file);
            } catch (error) {
                console.log(error);
            }

            const profileImageRef = ref(storage, `${path}${imageName}`);
            const downloadURL = await getDownloadURL(profileImageRef);
            updateProfilePhoto(downloadURL);
            setProfileImage(downloadURL);
            localStorage.setItem("therapist_image", downloadURL);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className='relative inline-flex justify-center w-[14rem] h-[14rem] lg:w-[20rem] lg:h-[20rem] xl:w-[18rem] xl:h-[18rem] rounded-full'>
                <Image
                    src={
                        localStorage.getItem("therapist_image") ||
                        user.photoURL ||
                        ProfileImage ||
                        Profile
                    }
                    alt='profile preview'
                    width={315}
                    height={315}
                    className='object-cover min-w-full h-full rounded-full'
                />
                <label
                    htmlFor='upload'
                    className='inline-flex justify-center items-center cursor-pointer w-[3rem] h-[3rem] lg:w-[4rem] lg:h-[4rem] bg-white border-2 border-black rounded-full absolute left-1/2 -translate-x-1/2 -bottom-[1.5rem] lg:-bottom-[2rem]'
                >
                    <Image src={Edit} alt='profile edit icon' className='p-2' />
                    <input
                        type='file'
                        onChange={handleUpload}
                        hidden
                        id='upload'
                    />
                </label>
            </div>
        </>
    );
};

export default ProfileImage;

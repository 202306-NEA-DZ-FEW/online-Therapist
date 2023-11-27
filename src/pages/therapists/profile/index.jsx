import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Spinner from "public/loading.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "@/components/elements/Button";
import Input from "@/components/Profile/Input";
import ProfileImage from "@/components/ProfileImage";

import { useAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";
const Profile = ({ t }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    /** state */
    const [edit, setEdit] = useState(
        searchParams.get("edit") == "true" ? true : false
    );

    const { user } = useAuth();
    const [photo] = useState(
        localStorage?.getItem(`therapist_image_${user?.uid}`)
    );
    const [formData, setFormData] = useState({
        fullname: "",
        bio: "",
        birthdate: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        specialty: "",
        availability: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const enableEdit = (e) => {
        e.preventDefault();
        setEdit((edit) => !edit);
        router.query.edit = true;
        router.push(router);
    };
    const disableEdit = () => {
        setEdit((edit) => !edit);
        router.query = "";
        router.push(router);
    };
    const onSubmit = async () => {
        try {
            const therapistRef = doc(db, "therapists", user.uid);
            await updateDoc(therapistRef, { ...formData, photoURL: photo });
            toast.success(t("therapists:profile.notifications.updateSuccess"));
        } catch (err) {
            toast.error(`Error ${err} `, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    };
    const redirectUser = () => {
        if (!user) {
            router.push("/login");
        } else if (user?.isUser) {
            router.push("/profile");
        }
    };
    useEffect(() => {
        redirectUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    async function fetchTherapist() {
        const docRef = doc(db, "therapists", localStorage.getItem("uid"));
        const docSnap = await getDoc(docRef);

        setFormData({ ...docSnap.data() });
    }

    useEffect(() => {
        fetchTherapist();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!user ? (
                <div className='grid place-items-center h-screen '>
                    <Image
                        src={Spinner}
                        alt='loading'
                        height={150}
                        width={150}
                        className='h-28 w-28'
                    />
                </div>
            ) : (
                (
                    <>
                        {(user?.isTherapist && (
                            <Layout>
                                <div className='container mx-auto font-atkinson '>
                                    <div className='w-full grid grid-cols-1  lg:grid-cols-3 py-20 gap-y-10'>
                                        <div className='justify-self-center lg:justify-self-center '>
                                            <ProfileImage />
                                        </div>

                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className='flex flex-col  justify-self-center lg:justify-self-end px-5 md:px-0 gap-2 col-span-2 w-[80%]'
                                        >
                                            <legend className='text-3xl md:text-4xl text-center md:text-start font-medium uppercase md:mb-10 mb-5'>
                                                {t("therapists:profile.title")}
                                            </legend>
                                            <div className=' lg:mx-0 mx-2 p-1 flex justify-between items-center my-5 min-w-max '>
                                                <Input
                                                    label={t(
                                                        "therapists:profile.fullname"
                                                    )}
                                                    name='fullname'
                                                    isDisabled={!edit}
                                                    placeholder=''
                                                    errorMessage={
                                                        errors.fullname?.message
                                                    }
                                                    register={{
                                                        ...register("fullname"),
                                                    }}
                                                    value={formData.fullname}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                                <div className='w-full grid grid-cols-1 md:grid-cols-3  items-start my-5 gap-2'>
                                                    <label
                                                        htmlFor='bio'
                                                        className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                                    >
                                                        {t(
                                                            "therapists:profile.bio"
                                                        )}
                                                    </label>
                                                    <textarea
                                                        className=' md:col-span-2 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer w-full h-28 resize-none pl-4 '
                                                        placeholder=''
                                                        disabled={!edit}
                                                        name='bio'
                                                        register={{
                                                            ...register("bio"),
                                                        }}
                                                        value={formData.bio}
                                                        onChange={onChange}
                                                    ></textarea>
                                                    <p className='text-sm text-red-500 mt-1 animate-pulse '>
                                                        {errors.bio?.message}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2'>
                                                <Input
                                                    label={t(
                                                        "therapists:profile.birthdate"
                                                    )}
                                                    name='birthdate'
                                                    type='date'
                                                    isDisabled={!edit}
                                                    errorMessage={
                                                        errors.birthdate
                                                            ?.message
                                                    }
                                                    register={{
                                                        ...register(
                                                            "birthdate"
                                                        ),
                                                    }}
                                                    value={formData.birthdate}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className='  lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 rtl:md:max-w-10'>
                                                <Input
                                                    label={t(
                                                        "therapists:profile.email"
                                                    )}
                                                    type='email'
                                                    name='email'
                                                    isDisabled={!edit}
                                                    placeholder=''
                                                    errorMessage={
                                                        errors.email?.message
                                                    }
                                                    register={{
                                                        ...register("email"),
                                                    }}
                                                    value={formData.email}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                                <Input
                                                    label={t(
                                                        "therapists:profile.phone"
                                                    )}
                                                    type='tel'
                                                    name='phone'
                                                    isDisabled={!edit}
                                                    placeholder=''
                                                    errorMessage={
                                                        errors.phone?.message
                                                    }
                                                    register={{
                                                        ...register("phone"),
                                                    }}
                                                    value={formData.phone}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                                <div className='flex flex-col w-full'>
                                                    <Input
                                                        label={t(
                                                            "therapists:profile.age"
                                                        )}
                                                        type='number'
                                                        name='age'
                                                        isDisabled={!edit}
                                                        placeholder=''
                                                        register={{
                                                            ...register("age"),
                                                        }}
                                                        value={formData.age}
                                                        onChange={onChange}
                                                    />
                                                    <p className='md:self-center text-sm text-red-500 mt-1 animate-pulse '>
                                                        {errors.age?.message}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='lg:mx-0 mx-2 mt-5 -mb-5 p-1 flex justify-between items-center  min-w-max'>
                                                <div className=' grid grid-cols-1 md:grid-cols-3 w-full '>
                                                    <div className='flex justify-between items-start '>
                                                        <label
                                                            htmlFor='gender'
                                                            className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                                        >
                                                            {t(
                                                                "therapists:profile.gender"
                                                            )}
                                                        </label>
                                                    </div>
                                                    <div className='w-full flex flex-col md:col-span-2'>
                                                        <select
                                                            disabled={!edit}
                                                            name='gender'
                                                            required
                                                            className='  border border-gray-300 h-12  pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer cursor-pointer'
                                                            register={{
                                                                ...register(
                                                                    "gender"
                                                                ),
                                                            }}
                                                            value={
                                                                formData.gender
                                                            }
                                                            onChange={onChange}
                                                        >
                                                            <option
                                                                defaultValue
                                                                disabled
                                                            >
                                                                {t(
                                                                    "therapists:profile.choose"
                                                                )}
                                                            </option>
                                                            <option value='male'>
                                                                {t(
                                                                    "therapists:profile.male"
                                                                )}
                                                            </option>
                                                            <option value='female'>
                                                                {t(
                                                                    "therapists:profile.female"
                                                                )}
                                                            </option>
                                                        </select>
                                                        <p className='md:self-center text-sm text-red-500 mt-1 animate-pulse '>
                                                            {
                                                                errors.gender
                                                                    ?.message
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2'></div>
                                                </div>
                                            </div>

                                            <div className='lg:mx-0 mx-2 p-1  flex items-center my-5 gap-2 min-w-max '>
                                                <div className='w-full grid grid-cols-1 md:grid-cols-3'>
                                                    <div className='flex justify-between items-start '>
                                                        <label
                                                            htmlFor='specialty'
                                                            className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                                        >
                                                            {t(
                                                                "therapists:profile.speciality"
                                                            )}
                                                        </label>
                                                    </div>
                                                    <div className='w-full flex flex-col md:md:col-span-2'>
                                                        <select
                                                            disabled={!edit}
                                                            name='specialty'
                                                            className=' border border-gray-300 h-12  pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer cursor-pointer'
                                                            register={{
                                                                ...register(
                                                                    "specialty"
                                                                ),
                                                            }}
                                                            value={
                                                                formData.specialty
                                                            }
                                                            onChange={onChange}
                                                        >
                                                            <option
                                                                defaultValue
                                                                disabled
                                                            >
                                                                {" "}
                                                                {t(
                                                                    "therapists:profile.choose"
                                                                )}
                                                            </option>
                                                            <option value='individual counseling'>
                                                                {t(
                                                                    "therapists:profile.individual"
                                                                )}
                                                            </option>
                                                            <option value='couple counseling'>
                                                                {t(
                                                                    "therapists:profile.couple"
                                                                )}
                                                            </option>
                                                            <option value='teen counseling'>
                                                                {t(
                                                                    "therapists:profile.teen"
                                                                )}
                                                            </option>
                                                        </select>
                                                        <p className='  text-sm text-red-500 mt-1 animate-pulse '>
                                                            {
                                                                errors.specialty
                                                                    ?.message
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='lg:mx-0 mx-2 p-1  flex items-center my-5 gap-2 min-w-max '>
                                                <div className='grid grid-cols-1 md:grid-cols-3 w-full'>
                                                    <div className='flex justify-between items-start '>
                                                        <label
                                                            htmlFor='specialty'
                                                            className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                                        >
                                                            {t(
                                                                "therapists:profile.availability"
                                                            )}
                                                        </label>
                                                    </div>
                                                    <div className='w-full flex flex-col md:md:col-span-2'>
                                                        <select
                                                            disabled={!edit}
                                                            name='availability'
                                                            className='border border-gray-300 h-12  pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peercursor-pointer'
                                                            register={{
                                                                ...register(
                                                                    "availability"
                                                                ),
                                                            }}
                                                            value={
                                                                formData.availability
                                                            }
                                                            onChange={onChange}
                                                        >
                                                            <option
                                                                defaultValue
                                                                disabled
                                                            >
                                                                {" "}
                                                                {t(
                                                                    "therapists:profile.choose"
                                                                )}
                                                            </option>
                                                            <option value='on'>
                                                                {t(
                                                                    "therapists:profile.yes"
                                                                )}
                                                            </option>
                                                            <option value='off'>
                                                                {t(
                                                                    "therapists:profile.no"
                                                                )}
                                                            </option>
                                                        </select>
                                                        <p className='md:self-center md:ml-[-16rem] lg:ml-[-8rem]  text-sm text-red-500 mt-1 animate-pulse '>
                                                            {
                                                                errors.specialty
                                                                    ?.message
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex flex-row justify-center gap-5 my-14 lg:ml-8 lg:rtl:mr-20'>
                                                <button type='submit'>
                                                    <Button
                                                        buttonText={t(
                                                            "therapists:profile.save"
                                                        )}
                                                        disabled={!edit}
                                                        transition={false}
                                                        color='teal'
                                                        type='submit'
                                                        clickFunction={
                                                            disableEdit
                                                        }
                                                    />
                                                </button>
                                                <Button
                                                    buttonText={t(
                                                        "therapists:profile.edit"
                                                    )}
                                                    disabled={edit}
                                                    transition={false}
                                                    color='teal'
                                                    clickFunction={enableEdit}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Layout>
                        )) || (
                            <div className='grid place-items-center h-screen '>
                                <Image
                                    src={Spinner}
                                    alt='loading'
                                    height={150}
                                    width={150}
                                    className='h-28 w-28'
                                />
                            </div>
                        )}
                    </>
                ) || (
                    <div className='grid place-items-center h-screen '>
                        <Image
                            src={Spinner}
                            alt='loading'
                            height={150}
                            width={150}
                            className='h-28 w-28'
                        />
                    </div>
                )
            )}
        </>
    );
};

export default withTranslation("therapists")(Profile);

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "therapists"])),
            // Will be passed to the page component as props.
        },
    };
}

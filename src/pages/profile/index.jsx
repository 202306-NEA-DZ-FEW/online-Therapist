// Importez les modules nécessaires
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Importez les composants nécessaires
import Button from "@/components/elements/Button";
import Input from "@/components/Profile/Input";
import ProfileImage from "@/components/ProfileImage";

// Importez le contexte Auth
import { useAuth, UserAuth } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";

const User = ({ t }) => {
    const router = useRouter();
    const language = router.locale;
    const searchParams = useSearchParams();
    const { totalTickets, cards } = UserAuth();

    const [edit, setEdit] = useState(
        searchParams.get("edit") == "true" ? true : false
    );
    const { user } = useAuth();
    const [photo] = useState(
        localStorage?.getItem(`therapist_image_${user?.uid}`)
    );
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        confirmemail: "",
        password: "",
        confirmpassword: "",
        birthDate: "",
        educationLevel: "",
        hobbies: "",
        familySize: "",
        gender: "",
        phoneNumber: "",
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
    const onSubmit = async () => {
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { ...formData, photoURL: photo });
            toast.success(t("users:userProfile.notifications.updateSuccess"));
        } catch (err) {
            toast.error(`Error ${err} `, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    };

    const onDeleteAccount = async () => {
        if (window.confirm(t("users:userProfile.deleteConfirmation"))) {
            try {
                const userRef = doc(db, "users", user.uid);

                // Vérifier si le document existe avant de le supprimer
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    // Document existe, vous pouvez le supprimer en toute sécurité.
                    await deleteDoc(userRef);
                    // Rediriger vers la page de connexion
                    router.push("/login");
                } else {
                    // eslint-disable-next-line no-console
                    console.error("Document does not exist.");
                    toast.error(t("users:userProfile.deleteError"));
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Error deleting account", error);
                toast.error(t("users:userProfile.deleteError"));
            }
        }
    };

    async function fetchUsers() {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const user = useAuth().user;

            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormData({ ...docSnap.data() });
                } else {
                    // eslint-disable-next-line no-console
                    console.error("Document does not exist");
                }
            } else {
                // eslint-disable-next-line no-console
                console.error("User is null");
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching user data", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <Layout>
            <div className='container mx-auto font-atkinson '>
                <p className='text-red-500 text-center pt-8 md:ml-5 md:mr-5  sm:mr-4 sm:ml-4'>
                    {t("users:userProfile.remark")}
                </p>
                {(user?.isUser && (
                    <div className='grid grid-cols-1  lg:grid-cols-2 py-20 gap-y-10 '>
                        <div className='justify-self-center lg:justify-self-start lg:pl-20 rtl:lg:pr-20'>
                            <ProfileImage />
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='w-full justify-self-center lg:justify-self-end px-5 md:px-0 md:ml-4 md:mr-4'
                        >
                            <legend className='text-3xl md:text-4xl text-center md:text-start font-medium uppercase md:mb-10 mb-5  md:mr-3 md:ml-4'>
                                {t("users:userProfile.title")}
                            </legend>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label={t("users:userProfile.firstname")}
                                    name='firstname'
                                    styles='md:ml-[6.5rem] lg:w-[26.9rem] md:w-[34rem] rtl:md:mr-[6.5rem] rtl:ml-0 rtl:md:w-[28.4rem] rtl:lg:w-[21.5rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.firstname?.message}
                                    register={{ ...register("firstname") }}
                                    value={formData.firstname}
                                    onChange={onChange}
                                />
                            </div>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label={t("users:userProfile.lastname")}
                                    name='lastname'
                                    styles='md:ml-[6.5rem] lg:w-[26.9rem] md:w-[34rem] rtl:md:mr-[6.5rem] rtl:ml-0 rtl:md:w-[28.4rem] rtl:lg:w-[21.5rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.lastname?.message}
                                    register={{ ...register("lastname") }}
                                    value={formData.lastname}
                                    onChange={onChange}
                                />
                            </div>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2'>
                                <Input
                                    label={t("users:userProfile.birthDate")}
                                    name='birthDate'
                                    type='date'
                                    styles='md:ml-[6.5rem] lg:w-[26.9rem] md:w-[34rem] rtl:md:mr-[3.7rem] rtl:ml-0 rtl:md:w-[28.4rem] rtl:lg:w-[21.5rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.birthDate?.message}
                                    register={{ ...register("birthDate") }}
                                    value={formData.birthDate}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='  lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 rtl:md:max-w-10'>
                                <Input
                                    label={t("users:userProfile.email")}
                                    type='email'
                                    name='email'
                                    styles='rtl:ml-0 md:ml-[8.9rem] rtl:md:mr-[1.8rem] rtl:w-full rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] mx-0 md:w-[34.1rem] lg:w-[27rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.email?.message}
                                    register={{ ...register("email") }}
                                    value={formData.email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label={t("users:userProfile.phoneNumber")}
                                    type='tel'
                                    name='phoneNumber'
                                    styles='md:ml-[4rem] rtl:ml-0 rtl:md:mr-[4.4rem] rtl:w-full
                                    rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] md:w-[34rem] lg:w-[27rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.phoneNumber?.message}
                                    register={{
                                        ...register("phoneNumber"),
                                    }}
                                    value={formData.phoneNumber}
                                    onChange={onChange}
                                />
                            </div>

                            <div className=' lg:mx-0 mx-2 p-1 flex flex-col md:flex-row my-5 gap-2 min-w-max '>
                                <label
                                    htmlFor='gender'
                                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                >
                                    {t("users:userProfile.gender")}
                                </label>
                                <div className='w-full mx-0 flex flex-col md:w-[35rem] lg:w-[27.5rem]'>
                                    <select
                                        disabled={!edit}
                                        name='gender'
                                        required
                                        className='rtl:ml-0 md:w-[34rem] lg:w-[27rem] w-full  md:ml-[7.4rem] rtl:md:mr-[6.2rem] rtl:md:min-w-[21.5rem] rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] border border-gray-300 h-12 bg-white pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer cursor-pointer'
                                        register={{ ...register("gender") }}
                                        value={formData.gender}
                                        onChange={onChange}
                                    >
                                        <option defaultValue disabled>
                                            {t("users:userProfile.choose")}
                                        </option>
                                        <option value='male'>
                                            {t("users:userProfile.male")}
                                        </option>
                                        <option value='female'>
                                            {t("users:userProfile.female")}
                                        </option>
                                    </select>
                                    <p className='md:self-center md:ml-[-12rem] lg:ml-[-4rem] text-sm text-red-500 mt-1 animate-pulse '>
                                        {errors.gender?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max  '>
                                <div className='flex flex-col w-full '>
                                    <Input
                                        label={t(
                                            "users:userProfile.familySize"
                                        )}
                                        type='number'
                                        name='familySize'
                                        styles='md:ml-[5.5rem] rtl:ml-0 rtl:md:mr-[2rem] rtl:w-full
                                        rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] md:w-[34rem] lg:w-[27rem]'
                                        isDisabled={!edit}
                                        placeholder=''
                                        register={{
                                            ...register("familySize"),
                                        }}
                                        value={formData.familySize}
                                        onChange={onChange}
                                    />
                                    <p className='md:self-center md:ml-[-14rem] lg:ml-[-7rem] text-sm text-red-500 mt-1 animate-pulse '>
                                        {errors.familySize?.message}
                                    </p>
                                </div>
                            </div>

                            <div className=' lg:mx-0 mx-2 p-1 flex flex-col md:flex-row my-5 gap-2 min-w-max'>
                                <label className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'>
                                    {t("users:userProfile.educationLevel")}
                                </label>
                                <div className='w-full mx-0 flex flex-col md:w-[35rem] lg:w-[27.5rem] lg:ml-[-4rem] '>
                                    <select
                                        disabled={!edit}
                                        name='educationLevel'
                                        className='rtl:mr-3 md:w-[34rem] lg:w-[27rem] w-full md:ml-[6.3rem]  rtl:md:mr-[0.7rem] rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] border border-gray-300 h-12 bg-white pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer cursor-pointer'
                                        register={{
                                            ...register("educationLevel"),
                                        }}
                                        value={formData.educationLevel}
                                        onChange={onChange}
                                    >
                                        <option defaultValue disabled>
                                            {" "}
                                            {t("users:userProfile.choose")}
                                        </option>
                                        <option value='No Formal Education'>
                                            {t("users:userProfile.level1")}
                                        </option>
                                        <option value='Primary Education'>
                                            {t("users:userProfile.level2")}
                                        </option>
                                        <option value='Secondary Education'>
                                            {t("users:userProfile.level3")}
                                        </option>
                                        <option value='Vocational or Technical Education'>
                                            {t("users:userProfile.level4")}
                                        </option>
                                        <option value='Higher Education'>
                                            {t("users:userProfile.level5")}
                                        </option>
                                        <option value='Other'>
                                            {t("users:userProfile.level6")}
                                        </option>
                                    </select>
                                    <p className='md:self-center md:ml-[-16rem] lg:ml-[-8rem]  text-sm text-red-500 mt-1 animate-pulse '>
                                        {errors.educationLevel?.message}
                                    </p>
                                </div>
                            </div>
                            <h1 className='text-3xl md:text-4xl text-center md:text-start font-medium uppercase md:mb-10 mb-5  md:mr-3 md:ml-4'>
                                {t("users:userProfile.security")}
                            </h1>
                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 rtl:md:max-w-10'>
                                <Input
                                    label={t("users:userProfile.password")}
                                    type='password'
                                    name='password'
                                    styles='rtl:ml-0 md:ml-[6.5rem] rtl:md:mr-[5rem] rtl:w-full rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] mx-0 md:w-[34.1rem] lg:w-[27rem]'
                                    isDisabled={!edit}
                                    placeholder={t(
                                        "users:userProfile.password"
                                    )}
                                    errorMessage={errors.password?.message}
                                    register={{ ...register("password") }}
                                    value={formData.password}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max'>
                                <Input
                                    label={t(
                                        "users:userProfile.confirmpassword"
                                    )}
                                    type='password'
                                    name='confirmpassword'
                                    styles='md:ml-[1.9rem] rtl:ml-0 rtl:md:mr-[2.3rem] rtl:w-full
                                    rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] md:w-[34rem] lg:w-[27rem]'
                                    isDisabled={!edit}
                                    placeholder={t(
                                        "users:userProfile.confirmpassword"
                                    )}
                                    errorMessage={
                                        errors.confirmpassword?.message
                                    }
                                    register={{
                                        ...register("confirmpassword"),
                                    }}
                                    value={formData.confirmpassword}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='flex flex-row justify-center text-center gap-4 my-14 lg:ml-8 lg:rtl:mr-20 md:mr-4 md:ml-4'>
                                <button type='submit'>
                                    <Button
                                        buttonText={t("users:userProfile.save")}
                                        disabled={!edit}
                                        transition={false}
                                        color='teal'
                                        type='submit'
                                    />
                                </button>
                                <button>
                                    <Button
                                        buttonText={t("users:userProfile.edit")}
                                        disabled={edit}
                                        transition={false}
                                        color='teal'
                                        clickFunction={enableEdit}
                                    />
                                </button>
                                <Link href='./edit-password'>
                                    <Button
                                        rotate={language == "en" ? false : true}
                                        buttonText={t(
                                            "users:userProfile.editPassword"
                                        )}
                                    />
                                </Link>
                                <button onClick={onDeleteAccount}>
                                    <Button
                                        buttonText={t(
                                            "users:userProfile.deleteAccount"
                                        )}
                                        transition={false}
                                        color='teal'
                                    />
                                </button>
                            </div>

                            <h1 className='text-3xl md:text-4xl text-center md:text-start font-medium uppercase md:mb-10 mb-5  md:mr-3 md:ml-4'>
                                {t("users:userProfile.payment")}
                            </h1>
                            <div className='flex flex-row  gap-5 my-14 lg:ml-3 lg:rtl:mr-4 md:mr-4 md:ml-4'>
                                <div>
                                    <p>
                                        {totalTickets}{" "}
                                        {t("users:userProfile.tickets")}
                                    </p>
                                    <Link href='/paymentMethods'>
                                        <Button
                                            buttonText={t(
                                                "users:userProfile.show"
                                            )}
                                            transition={false}
                                            color='teal'
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <p>
                                        {cards && cards.length}{" "}
                                        {t("users:userProfile.cards")}
                                    </p>
                                    <Link href='/#tickets'>
                                        <Button
                                            buttonText={t(
                                                "users:userProfile.buy"
                                            )}
                                            transition={false}
                                            color='teal'
                                        />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                )) || <div></div>}
            </div>
        </Layout>
    );
};
export default withTranslation("users")(User);

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "users",
                "therapists",
            ])),
            // Will be passed to the page component as props.
        },
    };
}

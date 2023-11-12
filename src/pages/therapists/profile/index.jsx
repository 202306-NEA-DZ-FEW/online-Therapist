import {doc, getDoc, updateDoc} from "firebase/firestore"
import {useSearchParams} from "next/navigation"
import {useRouter} from "next/router"
import {withTranslation} from "next-i18next"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import {useState} from "react"
import {useEffect} from "react"
import {useForm} from "react-hook-form"

import Button from "@/components/elements/Button"
import Input from "@/components/elements/Input"
import ProfileImage from "@/components/ProfileImage"

import {useAuth} from "@/context/AuthContext"
import Layout from "@/layout/Layout"
import {db} from "@/util/firebase"
const Profile = ({t}) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    /** state */
    const [edit, setEdit] = useState(
        searchParams.get("edit") == "true" ? true : false
    )
    const [formErrors, setFormErrors] = useState("")
    const [photo, setPhoto] = useState(localStorage?.getItem("therapist_image"))
    const {user} = useAuth()
    const [formData, setFormData] = useState({})

    const onChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }


    const {register, handleSubmit, formState} = useForm()
    const {errors} = formState
    const enableEdit = (e) => {
        e.preventDefault()
        setEdit((edit) => !edit)
        router.query.edit = true
        router.push(router)
    }
    const onSubmit = async () => {
        try {
            const therapistRef = doc(db, "therapists", user.uid)
            await updateDoc(therapistRef, {...formData, photoURL: photo})
        } catch (err) {
            setFormErrors({...formErrors, err})
        }
    }
    async function fetchTherapist () {
        const docRef = doc(db, "therapists", user.uid)
        const docSnap = await getDoc(docRef)

        setFormData({...docSnap.data()})
    }

    useEffect(() => {
        fetchTherapist()
    }, [])

    return (
        <Layout>
            <div className='container mx-auto font-atkinson '>
                {(user?.isTherapist && (
                    <div className='grid grid-cols-1  lg:grid-cols-2 py-20 gap-y-10'>
                        <div className='justify-self-center lg:justify-self-start'>
                            <ProfileImage />
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className='w-full justify-self-center lg:justify-self-end'
                        >
                            <legend class='text-3xl md:text-4xl text-center md:text-start font-medium uppercase'>
                                {t("therapist profile")}
                            </legend>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label='Full Name'
                                    name='fullname'
                                    styles='md:ml-[6.5rem] lg:w-[26.9rem] md:w-[34rem] rtl:md:mr-[6.5rem] rtl:ml-0 rtl:md:w-[28.4rem] rtl:lg:w-[21.5rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.fullname?.message}
                                    register={{...register("fullname")}}
                                    value={formData.fullname}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='lg:mx-0 mx-2 p-1 flex flex-col md:flex-row items-start my-5 gap-2'>
                                <label
                                    htmlFor='bio'
                                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                >
                                    Bio
                                </label>
                                <textarea
                                    className='md:ml-[9.7rem] rtl:md:mr-[9.7rem] border border-gray-300 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer rtl:md:min-w-[28.6rem] rtl:lg:min-w-[21.5rem] w-full h-28 resize-none pl-4 xl:w-[27rem] rtl:xl:w-[21rem]'
                                    placeholder=''
                                    disabled={!edit}
                                    name='bio'
                                    register={{...register("bio")}}
                                    value={formData.bio}
                                    onChange={onChange}
                                ></textarea>
                                <p className='text-sm text-red-500 mt-1 animate-pulse '>
                                    {errors.bio?.message}
                                </p>
                            </div>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2'>
                                <Input
                                    label='Birth Date'
                                    name='birthdate'
                                    type='date'
                                    styles='md:ml-[6.4rem] rtl:md:mr-[6.4rem] rtl:ml-[0rem] rtl:w-[27rem] md:w-[34rem] lg:w-[27rem] rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem]'
                                    isDisabled={!edit}
                                    errorMessage={errors.birthdate?.message}
                                    register={{...register("birthdate")}}
                                    value={formData.birthdate}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='  lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 rtl:md:max-w-10'>
                                <Input
                                    label='Email'
                                    type='email'
                                    name='email'
                                    styles='md:ml-[8.9rem] rtl:md:mr-[8.9rem] rtl:w-full rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] mx-0 md:w-[34.1rem] lg:w-[27rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.email?.message}
                                    register={{...register("email")}}
                                    value={formData.email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label='Phone Numer'
                                    type='tel'
                                    name='phone'
                                    styles='md:ml-[4.5rem] rtl:md:mr-[4.5rem] rtl:w-full
                                    rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] md:w-[34rem] lg:w-[27rem]'
                                    isDisabled={!edit}
                                    placeholder=''
                                    errorMessage={errors.phone?.message}
                                    register={{...register("phone")}}
                                    value={formData.phone}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <div className='flex flex-col w-full'>
                                    <Input
                                        label='Age'
                                        type='number'
                                        name='age'
                                        styles='md:ml-[9.8rem] rtl:md:ml-[0rem] rtl:md:mr-[9.8rem] rtl:w-full
                                    rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] md:w-[34rem] lg:w-[27rem]'
                                        isDisabled={!edit}
                                        placeholder=''
                                        register={{...register("age")}}
                                        value={formData.age}
                                        onChange={onChange}
                                    />
                                    <p className='md:self-center md:ml-[-14rem] lg:ml-[-7rem] text-sm text-red-500 mt-1 animate-pulse '>
                                        {errors.age?.message}
                                    </p>
                                </div>
                            </div>

                            <div className=' lg:mx-0 mx-2 p-1 flex flex-col md:flex-row my-5 gap-2 min-w-max '>
                                <label
                                    htmlFor='gender'
                                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                >
                                    Gender
                                </label>
                                <div className='w-full mx-0 flex flex-col md:w-[35rem] lg:w-[27.5rem]'>
                                    <select
                                        disabled={!edit}
                                        name='gender'
                                        required
                                        className='md:w-[34rem] lg:w-[27rem] w-full  md:ml-[7.4rem] rtl:md:mr-[7.5rem] rtl:md:min-w-[21.5rem] rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] border border-gray-300 h-12 bg-white pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer cursor-pointer'
                                        register={{...register("gender")}}
                                        value={formData.gender}
                                        onChange={onChange}
                                    >
                                        <option selected disabled>
                                            {" "}
                                            Choose ...
                                        </option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </select>
                                    <p className='md:self-center md:ml-[-12rem] lg:ml-[-4rem] text-sm text-red-500 mt-1 animate-pulse '>
                                        {errors.gender?.message}
                                    </p>
                                </div>
                            </div>

                            <div className=' lg:mx-0 mx-2 p-1 flex flex-col md:flex-row my-5 gap-2 min-w-max'>
                                <label
                                    htmlFor='speciality'
                                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                >
                                    Speciality
                                </label>
                                <div className='w-full mx-0 flex flex-col md:w-[35rem] lg:w-[27.5rem] '>
                                    <select
                                        disabled={!edit}
                                        name='speciality'
                                        className='md:w-[34rem] lg:w-[27rem] w-full md:ml-[6.3rem]  rtl:md:mr-[6.3rem] rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] border border-gray-300 h-12 bg-white pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer cursor-pointer'
                                        register={{...register("speciality")}}
                                        value={formData.speciality}
                                        onChange={onChange}
                                    >
                                        <option selected> Choose ...</option>
                                        <option value='individual counceling'>
                                            Individual Counceling
                                        </option>
                                        <option value='couple counceling'>
                                            Couple Counceling
                                        </option>
                                        <option value='teen counceling'>
                                            Teen Counceling
                                        </option>
                                    </select>
                                    <p className='md:self-center md:ml-[-16rem] lg:ml-[-8rem]  text-sm text-red-500 mt-1 animate-pulse '>
                                        {errors.speciality?.message}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center gap-5 my-14 lg:ml-8 lg:rtl:mr-20'>
                                <button type='submit'>
                                    <Button
                                        buttonText='Save'
                                        disabled={!edit}
                                        transition={false}
                                        color='teal'
                                        type='submit'
                                    />
                                </button>
                                <Button
                                    buttonText='Edit'
                                    disabled={edit}
                                    transition={false}
                                    color='teal'
                                    clickFunction={enableEdit}
                                />
                            </div>
                        </form>
                    </div>
                )) || <div></div>}
            </div>
        </Layout>
    )
}

export default withTranslation("therapists")(Profile)

export async function getStaticProps ({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "therapists"])),
            // Will be passed to the page component as props.
        },
    }
}

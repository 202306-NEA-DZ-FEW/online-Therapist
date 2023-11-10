import {useSearchParams} from "next/navigation"
import {useRouter} from "next/router"
import {withTranslation} from "next-i18next"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import {useState} from "react"

import Button from "@/components/elements/Button"
import Input from "@/components/elements/Input"

import {useAuth} from "@/context/AuthContext"
import Layout from "@/layout/Layout"
const Profile = ({t}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [edit, setEdit] = useState(searchParams.get('edit') == "true" ? true : false)
    const {user} = useAuth()
    const enableEdit = (e) => {
        e.preventDefault()
        setEdit(edit => !edit)
        router.query.edit = true
        router.push(router)
    }
    return (
        <Layout>
            <div className='container mx-auto font-atkinson '>
                {(user?.isTherapist && (
                    <div className='grid grid-cols-1  lg:grid-cols-2 py-20 gap-y-10'>
                        <div className='justify-self-center lg:justify-self-start'>
                            Photo component
                        </div>


                        <form className='w-full justify-self-center lg:justify-self-end'>
                            <legend class='text-3xl md:text-4xl text-center md:text-start font-medium uppercase'>
                                {t("therapist profile")}
                            </legend>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label='Your Name'
                                    styles='md:ml-24 rtl:md:mr-24'
                                    isDisabled={!edit}
                                    placeholder='test'
                                />
                            </div>
                            <div className='lg:mx-0 mx-2 p-1 flex flex-col md:flex-row items-start my-5 gap-2'>
                                <label
                                    htmlFor="bio"
                                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                >
                                    Bio
                                </label>
                                <textarea

                                    className="md:ml-[9.7rem] rtl:md:mr-[9.7rem] border border-gray-300 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer rtl:md:min-w-[28.2rem] rtl:lg:min-w-[21.5rem] w-full h-28 resize-none pl-4"
                                    placeholder="bio"
                                    disabled={!edit}
                                    name="bio"
                                >
                                </textarea>
                            </div>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label='Birth Date'
                                    type="date"
                                    styles='md:ml-[6.4rem] rtl:md:mr-[6.4rem]'
                                    isDisabled={!edit}

                                />
                            </div>
                            <div className='  lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 rtl:md:max-w-10'>
                                <Input
                                    label='Email'
                                    type="email"
                                    styles='md:ml-[8.9rem] rtl:md:mr-[8.9rem] rtl:w-full rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] mx-0'
                                    isDisabled={!edit}
                                    placeholder="email"

                                />
                            </div>
                            <div className='lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <Input
                                    label='Phone Numer'
                                    type="tel"
                                    styles='md:ml-[4.5rem] rtl:md:mr-[4.5rem] rtl:w-full
                                    rtl:md:w-[28.5rem] rtl:lg:w-[21.5rem] '
                                    isDisabled={!edit}
                                    placeholder="phone"
                                />
                            </div>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <label
                                    htmlFor="gender"
                                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                >
                                    Gender
                                </label>
                                <select
                                    disabled={!edit}
                                    name="gender"
                                    className="w-full ml-[7.4rem] rtl:mr-[7.5rem] rtl:md:min-w-[21.5rem] border border-gray-300 h-12 bg-white pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer">
                                    <option

                                        value="male">
                                        Male
                                    </option>
                                    <option

                                        value="male">
                                        Female
                                    </option>
                                </select>
                            </div>
                            <div className=' lg:mx-0 mx-2 p-1 flex items-center my-5 gap-2 min-w-max '>
                                <label
                                    htmlFor="speciality"
                                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                                >
                                    Speciality
                                </label>
                                <select
                                    disabled={!edit}
                                    name="speciality"
                                    className="w-full ml-[6rem] rtl:mr-[6.3rem] border border-gray-300 h-12 bg-white pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer">
                                    <option

                                        value="individual counceling">
                                        Individual Counceling
                                    </option>
                                    <option

                                        value="couple counceling">
                                        Couple Counceling
                                    </option>
                                    <option

                                        value="teen counceling">
                                        Teen Counceling
                                    </option>
                                </select>
                            </div>
                            <div className="flex flex-row justify-center gap-5 my-14 lg:ml-8 lg:rtl:mr-20">
                                <Button buttonText="Save" disabled={!edit} transition={false} color="teal" />
                                <Button buttonText="Edit" disabled={edit} transition={false} color="teal" clickFunction={enableEdit} />
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

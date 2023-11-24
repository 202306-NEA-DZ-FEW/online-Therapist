import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Profile from "public/profile.png";
import Spinner from "public/spinner.svg";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAuth } from "@/context/AuthContext";

import Input from "../elements/Input";
const AddComment = ({ postId }) => {
    const { t } = useTranslation("blog");
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        _id: postId,
        name: user?.displayName || "",
        email: user?.email || "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const router = useRouter();
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const onSubmit = async (data) => {
        if (!user) {
            toast.error(t("loggin_first"));
            setFormData({ ...formData, comment: "" });
            return;
        } else {
            setIsSubmitting(true);
            setFormData(data);
            try {
                const response = await fetch("/api/blog/create-comment", {
                    method: "POST",
                    body: JSON.stringify(data),
                    type: "application/json",
                });
                if (response.ok) {
                    setIsSubmitting(false);
                    setFormData({ ...formData, comment: "" });
                    router.replace(router.asPath, router.asPath, {
                        scroll: false,
                    });
                    toast.success(t("comment_added"));
                }
            } catch (err) {
                setFormData(err);
            }
        }
    };

    if (isSubmitting) {
        return (
            <div className='flex justify-center h-56  items-start w-full'>
                <Image
                    src={Spinner}
                    width={100}
                    height={100}
                    alt='loading'
                ></Image>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full md:-mx-3'>
            <Input
                width='full'
                type='hidden'
                placeholder=''
                name='_id'
                register={{
                    ...register("_id"),
                }}
                errorMessage={errors._id?.message}
                value={formData._id}
                onChange={onChange}
            />
            <Input
                width='full'
                type='hidden'
                placeholder=''
                name='email'
                errorMessage={errors.email?.message}
                register={{
                    ...register("email"),
                }}
                value={user?.email}
            />
            <Input
                width='full'
                type='hidden'
                placeholder=''
                name='name'
                errorMessage={errors.name?.message}
                register={{
                    ...register("name"),
                }}
                value={user?.displayName || "Ghost"}
            />
            <Input
                width='full'
                type='hidden'
                placeholder=''
                name='image'
                errorMessage={errors.image?.message}
                register={{
                    ...register("image"),
                }}
                value={user?.photoURL || Profile.src}
            />

            <div className='flex md:flex-row flex-col md:justify-end md:gap-4 gap-2 md:ml-2 md:rtl:mr-2 rtl:text-2xl'>
                <Input
                    width='full'
                    type='text'
                    placeholder={t("write_a_comment")}
                    name='comment'
                    errorMessage={errors.comment?.message}
                    register={{
                        ...register("comment", { required: t("required") }),
                    }}
                    value={formData.comment}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value={t("comment_btn")}
                    className='shadow bg-teal-700 hover:bg-teal-600 hover:cursor-pointer focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded h-12 '
                />
            </div>
        </form>
    );
};

export default AddComment;

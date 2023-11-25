import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { groq } from "next-sanity";
import React from "react";
import {
    PiArrowLineUpLeftLight,
    PiArrowLineUpRightLight,
} from "react-icons/pi";

import Layout from "@/layout/Layout";

import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";

const Blogs = ({ posts }) => {
    const { t } = useTranslation("blog");
    return (
        <Layout>
            <div className='container mx-auto w-full font-atkinson  mb-10'>
                <div className='mx-2 mt-5 '>
                    <div className=' mt-5 mx-3 flex flex-wrap justify-center gap-2 lg:gap-5'>
                        {posts.map((post) => (
                            <Link
                                key={post._id}
                                href={`/${
                                    post.language == "ar" ? "/ar" : ""
                                }/blogs/${post.slug.current}`}
                                className='overflow-clip shadow-lg rounded-md mt-5 md:w-[22rem] lg:w-[25rem]'
                            >
                                <div className='flex flex-col group cursor-pointer '>
                                    <div className='relative min-w-full will-change-contents  md:h-64 h-56'>
                                        <Image
                                            className='object-cover 
            lg:object-center group-hover:scale-[1.07]  transition-all duration-300 ease-out '
                                            src={urlForImage(
                                                post.mainImage
                                            ).url()}
                                            alt={post.title}
                                            fill
                                        />
                                        <div
                                            className='grid grid-cols-1 md:grid-cols-2 absolute bottom-0 bg-opacity-30 w-full rounded  bg-black/20 
                      backdrop-blur-md text-white/90 p-7  justify-between group-hover:-bottom-3 group-hover:backdrop-blur-[5px] transition-all duration-300 ease-out '
                                        >
                                            <div className='lg:flex flex-col hidden -ml-5 rtl:-mr-5'>
                                                <p className='font-bold text-base w-56'>
                                                    {t("written_by")} :{" "}
                                                    {post.author.name}
                                                </p>
                                                <p className='text-xs'>
                                                    {new Date(
                                                        post._createdAt
                                                    ).toLocaleDateString(
                                                        post.language == "en"
                                                            ? "en-US"
                                                            : "ar-DZ",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>

                                            <div className='flex flex-row items-center justify-start lg:justify-end -mr-5 rtl:-ml-2 mt-2'>
                                                {post.categories?.map(
                                                    (category) => (
                                                        <div
                                                            key={category}
                                                            className='mr-1 rtl:ml-1 text-center bg-DarkTeal text-white  rounded-full px-3 p-2 text-sm '
                                                        >
                                                            <p className='-mt-1'>
                                                                {category.title}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-7 flex-1 px-5 py-2'>
                                        <p className='underline underline-offset-[4px] decoration-double decoration-from-font decoration-teal-700  md:text-2xl font-bold text-xl  text-transparent  bg-clip-text bg-gradient-to-r from-emerald-700 via-sky-600 to-teal-800 break-words outline-slate-950 px-0'>
                                            {post.title}
                                        </p>
                                        <p className='mt-3 text-gray-600 line-clamp-2'>
                                            {post.description}
                                        </p>
                                    </div>
                                    <p className='self-end px-7 pb-5 flex flex-row my-3 uppercase text-base md:text-lg  text-DarkTeal font-semibold'>
                                        {t("more")}
                                        {post.language == "ar" ? (
                                            <PiArrowLineUpLeftLight className='mt-1 mx-2' />
                                        ) : (
                                            <PiArrowLineUpRightLight className='mt-1 mx-2' />
                                        )}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Blogs;

export async function getStaticProps({ locale }) {
    const query = groq`*[_type == "post" && language == $locale]{
    ...,
    author->,
    categories[]->
    | order(created_At desc)
  }`;
    const posts = await client.fetch(query, { locale });

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "blog"])),
            posts,
        },
        revalidate: 30,
    };
}

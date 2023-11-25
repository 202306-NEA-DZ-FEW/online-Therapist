import {PortableText} from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import {useTranslation} from "next-i18next"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import {groq} from "next-sanity"
import React from "react"
import {PiArrowLineUpLeftLight, PiArrowLineUpRightLight} from "react-icons/pi"

import AddComment from "@/components/Blog/AddComment"
import Comments from "@/components/Blog/Comments"
import Reactions from "@/components/Blog/Reactions"

import Layout from "@/layout/Layout"

import {client} from "../../../../sanity/lib/client"
import {urlForImage} from "../../../../sanity/lib/image"

const RichTextChildren = {
    types: {
        image: (value) => {
            return (
                <div className='relative w-ful h-96 my-10 mx-auto '>
                    <Image
                        className='object-cover'
                        src={urlForImage(value).url}
                        alt='Post Image'
                        fill
                    />
                </div>
            )
        },
    },
    lists: {
        bullet: ({children}) => {
            <ul className='ml-10 rtl:mr-10 list-disc space-y-5 rtl:space-y-reverse'>
                {children}
            </ul>
        },
        number: (children) => {
            <ol className='ml-10 rtl:mr-10 list-decimal space-y-5 rtl:space-y-reverse'>
                {children}
            </ol>
        },
    },
    block: {
        h1: ({children}) => (
            <h1 className='mb-2 mt-4 text-2xl md:text-5xl font-bold text-transparent  bg-clip-text bg-gradient-to-r rtl:bg-gradient-to-l from-teal-500 via-emerald-400 to-teal-950'>
                {children}
            </h1>
        ),
        h2: ({children}) => (
            <h2 className='mb-2 mt-4 text-xl md:text-4xl font-bold text-black/80'>
                {children}
            </h2>
        ),
        h3: ({children}) => (
            <h3 className='mb-2 mt-4 text-xl md:text-2xl font-bold text-black/80'>
                {children}
            </h3>
        ),
        h4: ({children}) => (
            <h4 className='mb-2 mt-4 text-lg md:text-xl font-bold text-black/80'>
                {children}
            </h4>
        ),
        normal: ({children}) => (
            <p className='text-black/80 md:text-lg md:mb-7 font-medium rtl:md:text-xl'>
                {children}
            </p>
        ),
    },
}
const Post = ({post, related_posts}) => {
    const {t} = useTranslation("blog")
    return (
        <Layout>
            <div className='h-full  mt-7 mb-3 container md:mx-auto'>
                <article className='px-10 pb-28 py-5'>
                    <section className='rtl:space-y-reverse space-y-2 border border-teal-700 text-white rounded-lg shadow-2xl group'>
                        <div className='relative h-90 lg:h-80 md:h-96 flex flex-col md:flex-row justify-between '>
                            <div className='absolute top-0 w-full h-full opacity-20 p-10 group-hover:blur-[1px] blur-[5px] transition-all duration-300 ease-in-out '>
                                <Image
                                    className='object-cover object-center mx-auto pointer-events-none'
                                    src={urlForImage(post.mainImage)?.url()}
                                    fill
                                    alt={post.title}
                                />
                            </div>

                            <section className='rounded-md p-5 bg-transparent bg-gradient-to-tr rtl:bg-gradient-to-tl from-emerald-600 via-sky-700 to-teal-950 w-full  min-h-full '>
                                <div className='flex flex-col md:flex-row justify-between gap-y-5'>
                                    <div className=''>
                                        <h1
                                            className='text-xl md:text-4xl
                                            font-bold hover:cursor-text'
                                        >
                                            {post.title}
                                        </h1>
                                        <p className='mt-2 text-xs md:text-base'>
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
                                    <div className='flex items-start justify-start rtl:mr-4 space-x-2 rtl:space-x-reverse '>
                                        <Image
                                            src={urlForImage(
                                                post.author.image
                                            ).url()}
                                            height={60}
                                            width={60}
                                            alt={post.author.name}
                                            className='rounded-full -mr-[.8rem] rtl:-ml-5'
                                        />
                                        <div className='w-64 rtl:w-40 text-center'>
                                            <h3 className='font-semibold text-sm rtl:md:text-xl md:text-lg'>
                                                {post.author.name}
                                            </h3>
                                            <p className='line-clamp-2 px-2 mx-1.5 text-center md:text-xs text-[.65rem]'>
                                                <PortableText
                                                    value={post.author.bio}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <h2 className='italic pt-7 rtl:pt-10 line-clamp-2'>
                                        {post.description}
                                    </h2>
                                    <div className='flex items-center justify-end lg:mt-10 lg:rtl:mt-20 md:mt-10 mt-3'>
                                        {post.categories?.map((category) => (
                                            <div
                                                key={category._id}
                                                className='ml-3 rtl:mr-1 text-center bg-transparent bg-gradient-to-tr from-amber-700 via-rose-700 to-violet-950 text-white  rounded-full px-3 py-1 rtl:px-6 text-sm font-semibold '
                                            >
                                                {category.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                    <main className='mt-5 mb-0 py-5 md:px-2'>
                        <PortableText
                            value={post.body}
                            components={RichTextChildren}
                        />
                    </main>
                    <section className='mt-1'>
                        <Reactions
                            language={post.language}
                            postId={post._id}
                            title={post.title}
                            reactions={post.emojis?.reactions}
                        />
                        <Comments
                            comments={post.comments}
                            language={post.language}
                        />
                        <AddComment postId={post._id} />
                    </section>
                    <section className="mt-20">
                        <div className='container mx-auto w-full font-atkinson  my-10 md:px-2'>

                            <div className='mx-2 mt-5 '>
                                {related_posts.length > 0 && <h2 className="my-4 text-2xl lg:text-3xl font-bold text-black/80">{t("related_posts")}</h2>}
                                <div className=' mt-5 mx-3 flex flex-wrap justify-center gap-5'>
                                    {related_posts?.map((post) => (
                                        <Link
                                            key={post._id}
                                            href={`/${post.language == "ar" ? "/ar" : ""
                                                }/blogs/${post.slug.current}`}
                                            className='overflow-clip shadow-lg rounded-md mt-5 w-[25rem]'
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

                                                        <div className='flex flex-row items-center justify-start md:justify-end -mr-5 rtl:-ml-2 mt-2'>
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
                                                    <p className='underline underline-offset-[4px] decoration-double decoration-from-font decoration-teal-700  md:text-2xl font-bold text-xl  text-transparent  bg-clip-text bg-gradient-to-r from-emerald-700 via-sky-600 to-teal-800 break-words outline-slate-950'>
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
                    </section>
                </article>



            </div>
        </Layout>
    )
}

export default Post

export async function getServerSideProps (context) {
    const {slug} = context.params
    const {locale} = context
    const query = groq`
            *[_type == "post" && slug.current == $slug && language == $language][0]
            {
              ...,
              author->,
              categories[]->,
              'comments': *[_type == "comment" && post._ref == ^._id]{_id, name, email, comment, image, _createdAt} | order(_createdAt asc),
              'emojis': *[_type == "reaction" && post._ref == ^._id][0] {reactions},
            }
    `


    const post = await client.fetch(query, {slug, language: locale})
    const related_posts_query = groq`*[_type == "post" && $category in categories[]->title && $id != _id && language == $language]{
        ...,
              author->,
              categories[]->,
    }`
    const related_posts = await client.fetch(related_posts_query, {category: post?.categories[0].title, id: post._id, language: locale})


    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "blog"])),
            post,
            related_posts
        },
    }
}

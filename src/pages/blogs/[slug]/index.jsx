import {PortableText} from "@portabletext/react"
import Image from "next/image"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import {groq} from "next-sanity"
import React from "react"

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
            <h2 className='mb-2 mt-4 text-xl md:text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-r rtl:bg-gradient-to-l from-teal-600 via-emerald-600 to-teal-950'>
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
const Post = ({post}) => {
    return (
        <Layout>
            <div className='h-full  my-7 container md:mx-auto'>
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
                </article>
            </div>
        </Layout>
    )
}

export default Post
/* export async function getStaticPaths({ locale }) {
    const query_path = groq`
               *[_type == "post" &&
                defined(slug.current)][].slug.current
              `;
    const paths = await client.fetch(query_path);

    return {
        paths: paths.map((slug) => ({ params: { slug }, locale })),
        fallback: true,
    };
} */

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

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "blog"])),
            post,
        },

    }
}

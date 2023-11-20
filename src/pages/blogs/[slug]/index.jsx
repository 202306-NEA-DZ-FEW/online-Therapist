import {PortableText} from "@portabletext/react"
import Image from "next/image"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import {groq} from "next-sanity"
import React from "react"

import Layout from "@/layout/Layout"

import {client} from "../../../../sanity/lib/client"
import {urlForImage} from "../../../../sanity/lib/image"

const RichTextChildren = {
    types: {
        image: (value) => {
            return (
                <div className="relative w-ful h-96 my-10 mx-auto ">
                    <Image
                        className="object-cover"
                        src={urlForImage(value).url}
                        alt="Post Image"
                        fill
                    />


                </div>

            )
        },
    },
    lists: {
        bullet: ({children}) => {
            <ul className="ml-10 rtl:mr-10 list-disc space-y-5 rtl:space-y-reverse">{children}</ul>
        },
        number: (children) => {
            <ol className="ml-10 rtl:mr-10 list-decimal space-y-5 rtl:space-y-reverse">{children}</ol>
        }
    },
    block: {
        h1: ({children}) =>
            <h1 className="mb-2 mt-4 text-2xl md:text-5xl font-bold text-transparent  bg-clip-text bg-gradient-to-r rtl:bg-gradient-to-l from-teal-600 via-fuchsia-950 to-sky-100">{children}</h1>
        ,
        h2: ({children}) =>
            <h2 className="mb-2 mt-4 text-xl md:text-4xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-teal-600 via-fuchsia-950 to-sky-100">{children}</h2>
        ,
        h3: ({children}) =>
            <h3 className="mb-2 mt-4 text-xl md:text-2xl font-bold text-black/80">{children}</h3>
        ,
        h4: ({children}) =>
            <h4 className="mb-2 mt-4 text-lg md:text-xl font-bold text-black/80">{children}</h4>
        ,
        normal: ({children}) => <p className="text-black/80 md:text-lg md:mb-7 font-medium rtl:md:text-xl">{children}</p>

    }

}
const Post = ({post}) => {
    return (
        <Layout>
            <div className='h-full  my-7'>
                <article className="px-10 pb-28 py-5">
                    <section className="rtl:space-y-reverse space-y-2 border border-teal-700 text-white rounded-lg shadow-2xl group">
                        <div className="relative h-80 flex flex-col md:flex-row justify-between ">
                            <div className="absolute top-0 w-full h-full opacity-20 p-10 group-hover:blur-[2px] blur-[5px] group-hover:cursor-not-allowed transition-all duration-300 ease-in-out ">

                                <Image
                                    className="object-cover object-center mx-auto pointer-events-none"
                                    src={urlForImage(post.mainImage).url()}
                                    fill
                                    alt={post.title}


                                />
                            </div>

                            <section className="rounded-md p-5 bg-transparent bg-gradient-to-tr rtl:bg-gradient-to-tl from-emerald-600 via-sky-700 to-teal-950 w-full md:min-h-full min-h-fit " >
                                <div className="flex flex-col md:flex-row justify-between gap-y-5">
                                    <div className="">
                                        <h1
                                            className="text-xl md:text-4xl
                                            font-bold"
                                        >{post.title}</h1>
                                        <p className="mt-2 text-xs md:text-base">
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
                                    <div className="flex items-start justify-start rtl:mr-4 space-x-2 rtl:space-x-reverse ">
                                        <Image

                                            src={urlForImage(post.author.image).url()}
                                            height={60}
                                            width={60}
                                            alt={post.author.name}
                                            className="rounded-full -mr-5 rtl:-ml-5"
                                        />
                                        <div className="w-64 rtl:w-40 text-center">
                                            <h3 className="font-semibold text-sm rtl:md:text-xl md:text-lg">
                                                {post.author.name}
                                            </h3>
                                            <p className="line-clamp-2 px-2 mx-1 text-center md:text-xs text-[.65rem]">
                                                <PortableText
                                                    value={post.author.bio}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <h2 className="italic pt-7 rtl:pt-10 line-clamp-2">
                                        {post.description}
                                    </h2>
                                    <div className="flex items-center justify-end md:mt-10 md:rtl:mt-20 mt-3">
                                        {post.categories?.map(category => (
                                            <div
                                                key={category._id}
                                                className="ml-3 rtl:mr-1 text-center bg-transparent bg-gradient-to-tr from-amber-700 via-rose-700 to-violet-950 text-white  rounded-full px-3 py-1 rtl:px-6 text-sm font-semibold "
                                            >
                                                {category.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>
                    <main className="my-5 py-5 md:px-2">
                        <PortableText
                            value={post.body}
                            components={RichTextChildren}
                        />
                    </main>

                </article>
            </div>
        </Layout>
    )
}

export default Post
export async function getStaticPaths () {
    const query_path = groq`
               *[_type == "post" &&
                defined(slug.current)][].slug.current
              `
    const paths = await client.fetch(query_path)

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: true,
    }
}

export async function getStaticProps (context) {
    const {slug} = context.params
    const query = groq`
            *[_type == "post" && slug.current == $slug][0]
            {
              ...,
              author->,
              categories[]->,
            }
    `

    const post = await client.fetch(query, {slug})

    if (context.locale != post.language) {
        if (context.locale == "ar") {
            return {
                redirect: {
                    permanent: false,
                    destination: `/${context.locale}/blogs/${post.slug.current}-arabic`,
                },
            }
        }
        if (context.locale == "en") {
            return {
                redirect: {
                    permanent: false,
                    destination: `/blogs/${post.slug.current.replace(
                        "-arabic",
                        ""
                    )}`,
                },
            }
        }
    } else {
        return {
            props: {
                ...(await serverSideTranslations(context.locale, [
                    "common",
                    "blog",
                ])),
                post,
            },
        }
    }
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { groq } from "next-sanity";
import React from "react";

import Layout from "@/layout/Layout";

import { client } from "../../../../sanity/lib/client";

const Post = ({ post }) => {
    return (
        <Layout>
            <div className='h-screen container mx-auto'>
                <h1 className='text-center text-4xl font-semibold mt-10 text-black/80'>
                    {post.title}
                </h1>
            </div>
        </Layout>
    );
};

export default Post;
export async function getStaticPaths() {
    const query_path = groq`
               *[_type == "post" &&
                defined(slug.current)][].slug.current
              `;
    const paths = await client.fetch(query_path);

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    };
}

export async function getStaticProps(context) {
    const { slug } = context.params;
    const query = groq`
            *[_type == "post" && slug.current == $slug][0]
            {
              ...,
              author->,
              categories[]->,
            }
    `;

    const post = await client.fetch(query, { slug });

    if (context.locale != post.language) {
        if (context.locale == "ar") {
            return {
                redirect: {
                    permanent: false,
                    destination: `/${context.locale}/blogs/${post.slug.current}-arabic`,
                },
            };
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
            };
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
        };
    }
}

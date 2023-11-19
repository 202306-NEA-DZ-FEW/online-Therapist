import Image from 'next/image'
import Link from 'next/link'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {groq} from 'next-sanity'
import React from 'react'
import {LuExternalLink} from 'react-icons/lu'

import Layout from '@/layout/Layout'

import {client} from '../../../sanity/lib/client'
import {urlForImage} from '../../../sanity/lib/image'

const Blogs = ({posts}) => {
  const {t} = useTranslation("blog")
  return (
    <Layout>
      <div className='container mx-auto h-screen py-10'>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-5">
          <div className="">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/${post.language == 'ar' ? '/ar' : ''}/blogs/${post.slug.current}`}
              >
                {console.log(post)}
                <div

                  className='flex flex-col group cursor-pointer'
                >
                  <div
                    className='relative w-full h-80 group-hover:scale-[1.03] transition-transform duration-200 ease-out'
                  >
                    <Image
                      className='object-cover object-left rtl:object-right
            lg:object-center'
                      src={urlForImage(post.mainImage).url()}
                      alt={post.title}
                      fill
                    />
                    <div
                      className='grid grid-cols-1 md:grid-cols-2 absolute bottom-0 bg-opacity-20 w-full  rounded  bg-black 
                 drop-shadow-lg backdrop-blur-lg text-white/90 p-7  justify-between'
                    >
                      <div
                        className=''
                      >
                        <p className='font-bold text-xl md:text-2xl'>
                          {post.title}
                        </p>
                        <p className='text-md'>
                          {new Date(post._createdAt).toLocaleDateString(
                            post.language == "en" ? "en-US" : "ar-DZ"
                            , {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            }
                          )}
                        </p>
                      </div>

                      <div className="flex flex-row items-center justify-start md:justify-end mt-2">
                        {post.categories?.map((category) => (
                          <div key={category}
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
                  <div className='mt-5 flex-1'>
                    <p className="underline text-xl font-bold">
                      {post.title}
                    </p>
                    <p className="mt-1 text-gray-600 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <p className="flex flex-row mt-5 uppercase">
                    {t("more")}
                    <LuExternalLink className="mt-1 mx-1" />

                  </p>


                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blogs


export async function getStaticProps ({locale}) {
  const query = groq`*[_type == "post" && language == $locale]{
    ...,
    author->,
    categories[]->
    | order(created_At desc)
  }`
  const posts = await client.fetch(query, {locale})

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "blog"])),
      posts
    }
  }

}
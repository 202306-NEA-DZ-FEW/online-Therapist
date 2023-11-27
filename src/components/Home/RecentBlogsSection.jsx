import {useTranslation} from "next-i18next"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Card from "../Cards/BlogCard"
import Reveal from "../utils/Reveal"
import {urlForImage} from "../../../sanity/lib/image"

const RecentBlogsSection = ({posts}) => {
    const {t} = useTranslation("homepage")

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }
    return (
        <div className='max-w-[100%] bg-[#EAF8F9] p-5'>
            <Reveal>
                <h2 className='text-center font-bold font-atkinson block text-3xl md:text-4xl lg:text-5xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words text-black mb-5  md:my-10 '>
                    {t("blogs.heading")}
                </h2>
            </Reveal>
            <Reveal className=''>
                <Slider
                    {...settings}
                    className='z-50 p-1 m-1 md:p-5 md:m-5 lg:my-10'
                >
                    {posts?.map((post) => (
                        <Card
                            key={post._ref}
                            title={post.title}
                            url={`${post.language}/blogs/${post.slug.current}`}
                            text={post.description}
                            imgSrc={urlForImage(post.mainImage).url()}
                        />
                    ))}
                </Slider>
            </Reveal>
        </div>
    )
}

export default RecentBlogsSection

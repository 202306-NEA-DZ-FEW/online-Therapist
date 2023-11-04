import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Card from "../Cards/BlogCard";

const RecentBlogsSection = () => {
    const blogs = [
        {
            title: "Mental Health and technology",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
            url: "",
            blogImg: "/Images/blog-img-placeholder.svg",
        },
        {
            title: "Mental Health and technology",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
            url: "",
            blogImg: "/Images/blog-img-placeholder.svg",
        },
        {
            title: "Mental Health and technology",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
            url: "",
            blogImg: "/Images/blog-img-placeholder.svg",
        },
        {
            title: "Mental Health and technology",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
            url: "",
            blogImg: "/Images/blog-img-placeholder.svg",
        },
        {
            title: "Mental Health and technology",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem",
            url: "",
            blogImg: "/Images/blog-img-placeholder.svg",
        },
    ];

    const settings = {
        dots: true,
        arrows: true,
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
                breakpoint: 600,
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
    };
    return (
        <div className='container max-w-[90%] mx-auto p-5'>
            <h2 className='font-normal block text-3xl md:text-4xl rtl:md:text-3xl  rtl:lg:text-4xl uppercase break-words text-black/80 mb-5  md:mb-10'>
                Recent Blogs
            </h2>

            <Slider {...settings} className='p-1 m-1 md:p-5 md:m-5'>
                {blogs.map((blog, index) => (
                    <Card
                        key={index}
                        title={blog.title}
                        url={blog.url}
                        text={blog.body}
                        imgSrc={blog.blogImg}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default RecentBlogsSection;

import { useState } from "react";

const DropDown = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className='relative '>
            <a
                className='mr-4 hover:underline md:mr-6 cursor-pointer p-8 mb-3 '
                onClick={() => setOpen(!open)}
            >
                About
            </a>
            <div className={`${open ? "block" : "hidden"} absolute`}>
                <div className='ml-6 '>
                    <a href='#' class='mr-4 hover:underline md:mr-6 '>
                        About us
                    </a>
                </div>
                <div className='ml-6 text-dark'>
                    <a href='#' class='mr-4 hover:underline md:mr-6 '>
                        Our team
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DropDown;

import React from "react";

function Button({
    transition = true,
    color = "teal",
    buttonSize = "md",
    buttonText,
    buttonHoverText,
    clickFunction,
    disabled = false,
    rotate = false,
}) {
    // transition: takes true or false, if true the button has a sliding transition, else the button is simple.
    // color: can be "teal" or "darkteal".
    // buttonSize: can be "sm", "md" or "lg".
    // buttonText: takes a string and it's the text in the button.
    // buttonHoverText: takes a string and replaces the the text onHover when the transition is true (if left empty its an arrow).
    // clickFunction: Not neccesarry, here you can pass your onClick function, doesn't work if the button is disabled.
    // disabled: disables the transition, the onClick function and makes the curson a "not-allowed" cursor.
    // rotate: rotates the animation so it can fit better to arabic.

    let size;

    switch (buttonSize) {
        case "sm":
            size = "w-20 h-14";
            break;
        case "md":
            size = "w-32 h-14";
            break;
        case "lg":
            size = "w-48 h-14";
            break;
    }

    if (color.toLocaleLowerCase() === "teal" && !disabled) {
        return transition ? (
            <div
                onClick={clickFunction}
                className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-Teal rounded-lg shadow-md group text-xl ${size} bg-white hover:cursor-pointer`}
            >
                <span
                    className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 ${
                        rotate ? "translate-x-full" : "-translate-x-full"
                    } bg-Teal group-hover:translate-x-0 ease`}
                >
                    {buttonHoverText ? (
                        buttonHoverText
                    ) : (
                        <svg
                            className={`w-6 h-6 ${rotate ? "rotate-180" : ""}`}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M14 5l7 7m0 0l-7 7m7-7H3'
                            ></path>
                        </svg>
                    )}
                </span>
                <span
                    className={`absolute flex items-center justify-center w-full h-full text-Teal transition-all duration-300 transform ${
                        rotate
                            ? "group-hover:-translate-x-full"
                            : "group-hover:translate-x-full"
                    } ease`}
                >
                    {buttonText}
                </span>
                <span className='relative invisible'>${buttonText}</span>
            </div>
        ) : (
            <div
                onClick={clickFunction}
                className={`bg-white border-2 border-Teal flex items-center justify-center text-xl px-4 py-2 font-medium leading-6 text-Teal whitespace-no-wrap rounded-lg shadow-md hover:bg-Teal hover:text-white focus:outline-none hover:cursor-pointer ${size}`}
            >
                {buttonText}
            </div>
        );
    } else if (color.toLocaleLowerCase() === "darkteal" && !disabled) {
        return transition ? (
            <div
                onClick={clickFunction}
                className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-SkyBlue rounded-lg shadow-md group text-xl ${size} bg-LightOrange hover:cursor-pointer`}
            >
                <span
                    className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-DarkTeal group-hover:translate-x-0 ease`}
                >
                    {buttonHoverText ? (
                        buttonHoverText
                    ) : (
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M14 5l7 7m0 0l-7 7m7-7H3'
                            ></path>
                        </svg>
                    )}
                </span>
                <span
                    className={`absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease`}
                >
                    {buttonText}
                </span>
                <span className='relative invisible'>${buttonText}</span>
            </div>
        ) : (
            <div
                onClick={clickFunction}
                className={`bg-Teal border-2 border-Teal flex items-center justify-center text-xl px-4 py-2 font-medium leading-6 text-white whitespace-no-wrap rounded-lg shadow-md hover:bg-DarkTeal hover:text-white focus:outline-none hover:cursor-pointer ${size}`}
            >
                {buttonText}
            </div>
        );
    } else if (color.toLocaleLowerCase() === "teal" && disabled) {
        return (
            <div
                className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium border-2 border-Teal rounded-lg shadow-md group text-xl ${size} bg-white hover:cursor-not-allowed`}
            >
                <span className='absolute flex items-center justify-center w-full h-full text-Teal'>
                    {buttonText}
                </span>
                <span className='relative invisible'>${buttonText}</span>
            </div>
        );
    } else if (color.toLocaleLowerCase() === "lightorange" && disabled) {
        return (
            <div
                className={`relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium border-2 border-SkyBlue rounded-lg shadow-md group text-xl ${size} bg-LightOrange hover:cursor-not-allowed`}
            >
                <span className='absolute flex items-center justify-center w-full h-full text-SkyBlue'>
                    {buttonText}
                </span>
                <span className='relative invisible'>${buttonText}</span>
            </div>
        );
    }
}

export default Button;

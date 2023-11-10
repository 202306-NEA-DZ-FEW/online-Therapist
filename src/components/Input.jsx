import clsx from "clsx"
import React from "react"

export default function Input ({
    placeholder,
    type,
    label,
    name,
    errorMessage,
    value,
    styles,
    onChange,
    register,
    isDisabled = false
}) {
    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className='flex justify-between items-start'>
                <label
                    htmlFor={name}
                    className='md:mb-2 mb-2 w-max text-xl font-medium leading-7 text-gray-900'
                >
                    {label}
                </label>
            </div>

            <div className='flex flex-col w-full'>
                <input
                    {...register}
                    type={type}
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    onChange={onChange}
                    value={value}
                    className={clsx(`border border-gray-300 h-12  pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer ${styles}`)}
                    disabled={isDisabled}
                />
                <p className='text-sm text-red-500 mt-1 animate-pulse '>
                    {errorMessage}
                </p>
            </div>
        </div>
    )
}

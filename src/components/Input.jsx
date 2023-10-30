import React from "react";

export default function Input({
    placeholder,
    type,
    label,
    name,
    width,
    errorMessage,
    value,
    onChange,
    register,
}) {
    return (
        <>
            <div className='flex justify-between items-center'>
                <label
                    htmlFor={name}
                    className='block text-md font-medium leading-6 text-gray-900'
                >
                    {label}
                </label>
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex flex-col w-full'>
                    <input
                        {...register}
                        type={type}
                        placeholder={placeholder}
                        id={name}
                        name={name}
                        onChange={onChange}
                        value={value}
                        className={`border border-gray-300 h-12 w-${width} pl-4 rounded-md p-2 focus:outline-none focus:border-Teal focus:ring-Teal invalid:border-red-500 invalid:text-red-500 peer`}
                    />
                    <p className='text-sm text-red-500 mt-1 animate-pulse '>
                        {errorMessage}
                    </p>
                </div>
            </div>
        </>
    );
}

const RadioInput = ({ onChange, name, value, text, width  }) => {
    return (
        <div>
            <label className='cursor-pointer'>
                <input
                    type='radio'
                    className='peer sr-only'
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <div className={`lg:w-${width} max-w-xl rounded-md bg-SkyBlue p-5  hover:bg-LightTeal hover:text-black hover:ring-Teal peer-checked:bg-Teal peer-checked:text-white text-Gray ring-2 ring-transparent transition-all hover:shadow peer-checked:ring-blue-400 peer-checked:ring-offset-2`}>
                    <div className=' gap-1'>
                        <div className='flex items-center justify-between'>
                            <p className='lg:text-xl font-atkinson uppercase'>
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default RadioInput;

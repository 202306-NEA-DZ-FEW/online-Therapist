const CheckboxInput = ({ onChange, name, value, text }) => {
    return (
        <div className='flex items-center pl-3'>
            <input
                id='maleCounselor'
                type='checkbox'
                value={value}
                onChange={onChange}
                name={name}
                className='lg:w-4 lg:h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
            />
            <label
                htmlFor='maleCounselor'
                className='w-full py-1 ml-2 rtl:pr-2'
            >
                {text}
            </label>
        </div>
    );
};

export default CheckboxInput;

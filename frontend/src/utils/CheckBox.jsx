/**
 * Name: Aman Harishkumar Desai
 * Banner ID: B00965752
 */
import { React, useState } from 'react';

function Checkbox({ id, value, label, onChanged, propsIsChecked }) {
    const [isChecked, setIsChecked] = useState(propsIsChecked);

    const handleChange = () => {
        setIsChecked(!isChecked);
        if (onChanged) {
            onChanged(value, !isChecked);
        }
    };
    return (
        <>
            <div className="flex items-center mb-4">
                <input
                    id={id}
                    type="checkbox"
                    value={value}
                    checked={isChecked}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-gray-100 focus:ring-opacity-50 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor={id}
                    className="ml-2 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300 align-middle"
                >
                    {label}
                </label>
            </div>

        </>

    );
}

export default Checkbox;

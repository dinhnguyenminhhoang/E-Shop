import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

interface DropdownProps {
    options?: string[];
    defaultOption?: string;
    icon?: React.ReactNode;
    lable?: string;
    isDisplaySelect?: boolean;
    onChange?: (selectedOption: string | null) => void;
}

const DropDown: React.FC<DropdownProps> = ({
    options,
    defaultOption,
    icon = <FaCaretDown size={24} />,
    lable,
    isDisplaySelect = true,
    onChange: handleChange,
}) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<
        string | null | undefined
    >(null);

    useEffect(() => {
        setSelectedOption(defaultOption);
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        toggleDropdown();
        handleChange && handleChange(option);
    };

    return (
        <div
            className="flex items-center gap-2 text-white cursor-pointer"
            onClick={toggleDropdown}
        >
            {isDisplaySelect && lable && (
                <span className="text-sm">{lable}:</span>
            )}
            <div
                className={`relative flex items-center gap-2 ${
                    isDisplaySelect && "border-2 border-white rounded-md pl-2"
                }`}
            >
                {isDisplaySelect && selectedOption && (
                    <p className="text-sm capitalize">{selectedOption}</p>
                )}

                <div className="text-white cursor-pointer">{icon}</div>

                {isDropdownVisible && (
                    <div className="absolute top-full right-0 z-10 text-xs capitalize bg-white border border-gray-300 rounded shadow-md mt-2">
                        {options?.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className={`p-2 cursor-pointer min-w-sm px-3 whitespace-nowrap text-gray-600 
                                    ${
                                        selectedOption === option
                                            ? "bg-emerald-600 hover:none text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropDown;

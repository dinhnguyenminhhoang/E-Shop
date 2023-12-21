import { filterType } from "@/common/filter";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type optionType = {
    id: number;
    name?: string;
    title?: string;
    type?: string;
};
interface MySelecterProps {
    title: string;
    option: optionType[];
    type: string;
    listFilter: any;
    setListFilter: (listFilter: filterType) => void;
}
const MySelecter: React.FC<MySelecterProps> = ({
    title,
    option,
    type,
    listFilter,
    setListFilter,
}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown);
        setActive(true);
    };
    const handleAddNewOption = (
        selected: optionType,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setListFilter({ ...listFilter, [type]: selected.id });
        setShowDropdown(false);
    };
    useEffect(() => {
        if (listFilter[type] === "") {
            setActive(false);
        }
    }, [listFilter]);
    return (
        <div className="relative z-20" onClick={handleShowDropdown}>
            <div
                className={`flex items-center p-2 border-[1px] cursor-pointer rounded-borderContnet bg-[#f3f4f6] ${
                    showDropdown
                        ? "border-custom-primary text-custom-primary"
                        : "text-[#444444]"
                }`}
            >
                <span className="mr-1 text-sm font-normal">{title}</span>
                <FaChevronDown size={12} />
            </div>
            {showDropdown && (
                <div className="absolute p-2 rounded-borderContnet min-w-[300px] max-w-[500px] bg-white shadow-custom">
                    <div className="transition-all pb-2 border-b flex flex-row flex-wrap gap-2 items-center justify-start">
                        {option?.length > 0 &&
                            option.map((item: any, index) => (
                                <div
                                    onClick={(
                                        e: React.MouseEvent<
                                            HTMLDivElement,
                                            MouseEvent
                                        >
                                    ) => handleAddNewOption(item, e)}
                                    key={index}
                                    className={`flex border gap-2 cursor-pointer items-center px-2 py-1 bg-[#f3f4f6] rounded-borderContnet ${
                                        Number(listFilter[type]) === item.id
                                            ? "border-custom-Colorprimary text-custom-Colorprimary"
                                            : null
                                    }`}
                                >
                                    <span className="font-normal text-sm]">
                                        {item?.name || item?.title}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MySelecter;

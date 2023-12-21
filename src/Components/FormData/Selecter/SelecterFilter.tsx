import React, { useEffect, useState } from "react";
import Select from "react-select";

interface SelecterFilterProps {
    options: any;
    handleGetOptionBySelect: (option: any, typeId: string) => void;
    typeId: string;
    defaultValue?: string;
    isMulti?: boolean;
    isReset?: boolean;
    h?: string;
    setIsReset?: (value: boolean) => void;
    placeholder?: string;
}

const SelecterFilter: React.FC<SelecterFilterProps> = ({
    options,
    handleGetOptionBySelect,
    typeId,
    defaultValue,
    isMulti,
    isReset,
    setIsReset,
    placeholder,
    h,
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const getOptionLabel = (option: any) => option.title || option.name;
    useEffect(() => {
        if (isReset && setIsReset) {
            setSelectedOption("");
            setIsReset(false);
        }
    }, [isReset]);
    const getOptionValue = (option: any) =>
        option.value || option.title || option.name;
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            width: "100%",
            height: h ? h : "auto",
            border: "1px solid #4b5563",
            backgroundColor: state.isFocused
                ? "rgb(55, 65, 81)"
                : " rgb(55, 65, 81)",
            fontSize: "14px",
            outline: "none",
            borderRadius: "4px",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? "#fff" : "#333",
            padding: "8px 12px",
            fontSize: "14px",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#fff",
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: "white",
        }),
    };

    useEffect(() => {
        if (selectedOption) {
            handleGetOptionBySelect(selectedOption, typeId);
        }
    }, [selectedOption]);
    return (
        <div className="h-full">
            <Select
                value={selectedOption}
                placeholder={placeholder || "chọn để lọc"}
                isMulti={isMulti ? true : false}
                onChange={setSelectedOption}
                options={options}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                styles={customStyles}
            />
        </div>
    );
};

export default SelecterFilter;

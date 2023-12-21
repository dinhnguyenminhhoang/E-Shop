import React, { ChangeEvent } from "react";

interface InputFormProp {
    lable: string;
    placeholder: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name?: string;
    Icon?: React.ReactElement;
    err?: boolean;
    textErr?: string;
    w?: string;
}
const InputForm: React.FC<InputFormProp> = ({
    lable,
    name,
    placeholder,
    value = "",
    onChange,
    type = "text",
    Icon,
    err,
    textErr,
    w,
}) => {
    return (
        <div className="relative">
            <p className="bg-white absolute pt-0 pr-2 pb-0 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600">
                {lable}
            </p>
            <input
                name={name}
                placeholder={placeholder}
                type={type || "text"}
                value={value}
                onChange={onChange}
                className={`border pl-4 placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 mr-0 mt-0 ml-0 text-base bg-white border-gray-300 rounded-md ${
                    err ? "border-red-600" : null
                } ${w ? `w-[${w}]` : ""}`}
            />
            {err && textErr ? (
                <span className="text-xs text-red-600 absolute -bottom-5 left-0">
                    {textErr}
                </span>
            ) : null}
            {Icon && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#c2cad1]">
                    {Icon}
                </div>
            )}
        </div>
    );
};

export default InputForm;

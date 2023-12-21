import React from "react";

interface FilterProps {
    setSearchValue: (value: string) => void;
    searchValue: string;
    handleSearch: () => void;
    handleReset: () => void;
    placeholder?: string;
}
const Filter: React.FC<FilterProps> = ({
    searchValue,
    setSearchValue,
    handleSearch,
    handleReset,
    placeholder,
}) => {
    return (
        <div className="rounded-lg  min-w-0 shadow-xs overflow-hidden bg-gray-800 rounded-t-lg rounded-0 mb-4">
            <div className="p-4">
                <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                    <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md  focus:bg-gray-700  border-gray-600 focus:border-gray-500 bg-gray-700"
                            type="search"
                            name="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={placeholder || "tìm kiếm"}
                        />
                        <button className="absolute right-0 top-0 mt-5 mr-1"></button>
                    </div>

                    <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                        <div className="w-full mx-1">
                            <button
                                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full bg-emerald-700"
                                onClick={() => handleSearch()}
                            >
                                Filter
                            </button>
                        </div>
                        <div className="w-full mx-1">
                            <button
                                className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-400 focus:outline-none rounded-lg border border-gray-200 w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2 text-sm bg-gray-700"
                                onClick={handleReset}
                            >
                                <span className="text-gray-200">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;

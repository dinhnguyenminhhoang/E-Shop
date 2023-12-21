import { BiBookBookmark } from "react-icons/bi";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FcNext, FcPrevious } from "react-icons/fc";
import { LiaSearchPlusSolid } from "react-icons/lia";
const ALlStaff = () => {
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
                ALl Staff
            </h1>
            <div className="rounded-l min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <div className="p-4">
                    <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <input
                                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md bg-gray-100 focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-700"
                                type="search"
                                name="search"
                                placeholder="Search by name/email/phone"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 mt-5 mr-1"
                            ></button>
                        </div>
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select className="block w-full h-12 border bg-gray-100 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700 focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5">
                                <option value="All">Staff Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Cashier">Cashier</option>
                                <option value="Super Admin">Super Admin</option>
                            </select>
                        </div>
                        <div className="w-auto">
                            <button
                                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 w-full rounded-md h-12"
                                type="button"
                            >
                                <span className="mr-3">
                                    <AiOutlinePlus size={22} />
                                </span>
                                Add Staff
                            </button>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <div className="w-full mx-1">
                                <button
                                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                    type="submit"
                                >
                                    Filter
                                </button>
                            </div>
                            <div className="w-full">
                                <button
                                    className="align-bottom  leading-5 transition-colors duration-150 font-medium text-gray-600 dark:text-gray-400 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 px-4 w-full mr-3 flex items-center justify-center cursor-pointer h-12 md:py-1 py-3 text-sm dark:bg-gray-700"
                                    type="reset"
                                >
                                    <span className="text-black dark:text-gray-200">
                                        Reset
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                        <tr>
                            <td className="px-4 py-2">ID</td>
                            <td className="px-4 py-2">JOINING DATE</td>
                            <td className="px-4 py-2">NAME</td>
                            <td className="px-4 py-2">EMAIL</td>
                            <td className="px-4 py-2">PHONE</td>
                            <td className="px-4 py-2 text-right">ACTION</td>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-400">
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-custom-addmin_bg">
                            <td className="px-4 py-2">
                                <span className="font-semibold uppercase text-xs">
                                    2e62
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Oct 31, 2023</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">Saif Ahmads</span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm">
                                    saifad303@gmail.com
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <span className="text-sm font-medium">
                                    0123456789
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex justify-end">
                                    <div className="flex justify-between items-center gap-2">
                                        <button>
                                            <BiBookBookmark size={22} />
                                        </button>
                                        <button>
                                            <LiaSearchPlusSolid size={22} />
                                        </button>
                                        <button>
                                            <AiOutlineDelete size={22} />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
                    <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
                        <span className="flex items-center font-semibold tracking-wide uppercase">
                            Showing 1-8 of 491
                        </span>
                        <div className="flex mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center text-[12px] text-[#9ca3af]">
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400  border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            <FcPrevious />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            1
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium  p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            2
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            3
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium  p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-pointer"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            <FcNext />
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ALlStaff;

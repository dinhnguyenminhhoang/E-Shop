import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
interface PaginationsProps {
    handlePageChange: (newPage: number, oldPage: number) => void;
    pagination: {
        currentPage: number;
        totalPage: number;
    };
    paging: pagingType | null;
}
const Paginations: React.FC<PaginationsProps> = ({
    pagination,
    handlePageChange,
    paging,
}) => {
    const { currentPage, totalPage } = pagination;
    const [pageArr, setPageArr] = useState<number[]>();
    const maxDisplayedPages = 6;
    const handlePaginationClick = (newPage: number, oldPage: number) => {
        if (handlePageChange) {
            handlePageChange(newPage, oldPage);
        }
    };
    useEffect(() => {
        let pageIndexes = [];
        if (totalPage <= maxDisplayedPages) {
            pageIndexes = Array.from(
                { length: totalPage },
                (_, index) => index
            );
            setPageArr(pageIndexes);
        } else {
            const halfDisplayCount = Math.floor(maxDisplayedPages / 2);
            const leftDisplayCount = halfDisplayCount;

            if (currentPage <= halfDisplayCount) {
                pageIndexes = Array.from(
                    { length: maxDisplayedPages },
                    (_, index) => index
                );
                setPageArr(pageIndexes);
            } else if (currentPage >= totalPage - halfDisplayCount) {
                pageIndexes = Array.from(
                    { length: maxDisplayedPages },
                    (_, index) => totalPage - maxDisplayedPages + index
                );
                setPageArr(pageIndexes);
            } else {
                const startIndex = currentPage - leftDisplayCount - 1;
                pageIndexes = Array.from(
                    { length: maxDisplayedPages },
                    (_, index) => startIndex + index
                );
                setPageArr(pageIndexes);
            }
        }
    }, [totalPage, maxDisplayedPages, currentPage]);
    return (
        paging && (
            <div className="px-4 py-3 border-t border-gray-700  bg-gray-800">
                <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 ">
                    <span className="flex items-center font-semibold tracking-wide uppercase">
                        {(paging.pageSize || 0) < (paging.totalCount || 0)
                            ? `Showing ${paging.pageSize} of ${paging.totalCount}`
                            : `Showing ${paging.totalCount} of ${paging.totalCount}`}
                    </span>
                    <div className="flex mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center text-[12px] text-[#9ca3af]">
                                <li>
                                    <button
                                        disabled={currentPage === 1}
                                        className="align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md border border-transparent cursor-pointer text-[#2196f3] disabled:text-custom-disable disabled:cursor-not-allowed"
                                        type="button"
                                        onClick={() =>
                                            handlePaginationClick(
                                                pagination.currentPage - 1,
                                                pagination.currentPage
                                            )
                                        }
                                    >
                                        <MdArrowBackIos />
                                    </button>
                                </li>
                                {currentPage > 5 ? (
                                    <>
                                        <li
                                            className={`${
                                                currentPage === totalPage
                                                    ? "text-white"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            <button
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    handlePaginationClick(
                                                        1,
                                                        pagination.currentPage
                                                    )
                                                }
                                                className="align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md  focus:outline-none border border-transparent cursor-pointer disabled:cursor-not-allowed"
                                                type="button"
                                            >
                                                {1}
                                            </button>
                                        </li>
                                        <li className="text-gray-600">
                                            <button
                                                disabled={true}
                                                className="align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md  focus:outline-none border border-transparent cursor-pointer disabled:cursor-not-allowed"
                                                type="button"
                                            >
                                                ...
                                            </button>
                                        </li>
                                    </>
                                ) : null}
                                {pageArr &&
                                    pageArr.map((page, index: number) => {
                                        if (
                                            pageArr.length - 1 === index &&
                                            totalPage > 6 &&
                                            currentPage < totalPage - 3
                                        ) {
                                            return null;
                                        } else if (
                                            index === 0 &&
                                            currentPage > 6
                                        ) {
                                            return null;
                                        } else {
                                            return (
                                                <li
                                                    key={index}
                                                    className={`${
                                                        currentPage === page + 1
                                                            ? "text-white"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    <button
                                                        disabled={
                                                            currentPage ===
                                                            page + 1
                                                        }
                                                        onClick={() =>
                                                            handlePaginationClick(
                                                                page + 1,
                                                                pagination.currentPage
                                                            )
                                                        }
                                                        className="align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md  focus:outline-none border border-transparent cursor-pointer disabled:cursor-not-allowed"
                                                        type="button"
                                                    >
                                                        {page + 1}
                                                    </button>
                                                </li>
                                            );
                                        }
                                    })}
                                {totalPage > 6 &&
                                currentPage < totalPage - 3 ? (
                                    <>
                                        <li className="text-gray-600">
                                            <button
                                                disabled={true}
                                                className="align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md  focus:outline-none border border-transparent cursor-pointer disabled:cursor-not-allowed"
                                                type="button"
                                            >
                                                ...
                                            </button>
                                        </li>
                                        <li
                                            className={`${
                                                currentPage === totalPage
                                                    ? "text-white"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            <button
                                                disabled={
                                                    currentPage === totalPage
                                                }
                                                onClick={() =>
                                                    handlePaginationClick(
                                                        totalPage,
                                                        pagination.currentPage
                                                    )
                                                }
                                                className="align-bottom inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md  focus:outline-none border border-transparent cursor-pointer disabled:cursor-not-allowed"
                                                type="button"
                                            >
                                                {totalPage}
                                            </button>
                                        </li>
                                    </>
                                ) : null}

                                <li>
                                    <button
                                        disabled={currentPage === totalPage}
                                        onClick={() =>
                                            handlePaginationClick(
                                                pagination.currentPage + 1,
                                                pagination.currentPage
                                            )
                                        }
                                        className="align-bottom inline-flex items-center justify-center  leading-5 transition-colors duration-150 font-medium  p-2 rounded-md  focus:outline-none border border-transparent cursor-pointer text-[#2196f3]  disabled:cursor-not-allowed disabled:text-custom-disable"
                                        type="button"
                                    >
                                        <MdArrowForwardIos />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    );
};

export default Paginations;

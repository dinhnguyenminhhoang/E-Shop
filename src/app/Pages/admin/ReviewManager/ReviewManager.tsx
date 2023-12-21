import SelecterFilter from "@/Components/FormData/Selecter/SelecterFilter";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import {
    adminCreateReply,
    adminDeleteReply,
    adminGetDetailReview,
    adminGetListReview,
    adminUpdateRely,
} from "@/app/action/adminAction/adminReviews";
import { getReviewType } from "@/common/getAllType";
import { pagingType } from "@/common/paging";
import { reviewRelyType, reviewType } from "@/common/reviewType";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { CiEdit, CiFilter } from "react-icons/ci";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { MdDeleteOutline, MdOutlineClear, MdOutlineSend } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const initFormFarams = {
    pageIndex: 1,
    pagesize: 6,
};
const ReviewManager = () => {
    const param = useParams();
    const dispatch = useDispatch<any>();
    const listReviewData = useSelector(
        (state: any) =>
            state.listReviewData.data as {
                data: { list: reviewType[]; paging: pagingType };
            }
    );
    const detailReviewData = useSelector(
        (state: any) =>
            state.detailReviewData.data as {
                data: reviewRelyType;
                success: boolean;
            }
    );
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPage: 1,
        pagesize: 6,
    });
    const [formParams, setFormParams] = useState<getReviewType>(initFormFarams);
    const [allReviews, setAllReviews] = useState<reviewType[]>([]);
    const [zoomImg, setZoomImg] = useState<string>("");
    const [isDetailReview, setIsDetailReview] = useState<boolean>(false);
    const [isUpdateReply, setIsUpdateReply] = useState<boolean>(false);
    const [isCretaeReply, setIsCretaeReply] = useState<boolean>(false);
    const [ValueReply, setValueReply] = useState<string>("");
    useEffect(() => {
        if (param?.id) {
            dispatch(adminGetDetailReview(Number(param.id)));
        } else dispatch(adminGetListReview({ pagesize: 6, pageIndex: 1 }));
    }, [dispatch, param]);
    useEffect(() => {
        if (listReviewData && listReviewData?.data?.paging) {
            setPagination({
                currentPage: listReviewData.data.paging.pageIndex || 1,
                totalPage: listReviewData.data.paging.totalPages || 1,
                pagesize: listReviewData.data.paging.pagesize || 1,
            });
        }
        if (listReviewData?.data?.list) {
            setAllReviews(listReviewData?.data?.list);
        }
    }, [listReviewData]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (formParams) {
                dispatch(
                    adminGetListReview({
                        ...formParams,
                        pagesize: 6,
                        pageIndex: newPage,
                    })
                );
            } else {
                dispatch(
                    adminGetListReview({ pagesize: 6, pageIndex: newPage })
                );
            }
        }
    };
    const handleZoomImg = (img: string) => {
        if (zoomImg === "") {
            setZoomImg(img);
        } else {
            setZoomImg("");
        }
    };
    useEffect(() => {
        if (zoomImg) {
            const checkImg = setTimeout(() => {
                setZoomImg("");
            }, 2000);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            () => clearTimeout(checkImg);
        }
    }, [zoomImg]);
    const handleDate = (time: string) => {
        const date = new Date(time);
        return `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`;
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormParams({ ...formParams, [e.target.name]: e.target.value });
    };
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        if (typeId === "reply") {
            setFormParams({
                ...formParams,
                IsReply: option.id === 1 ? true : false,
            });
        }
    };
    const handFilterReview = () => {
        dispatch(
            adminGetListReview({
                ...formParams,
                pageIndex: listReviewData.data.paging.pageIndex || 1,
                pagesize: listReviewData.data.paging.pageSize || 6,
            })
        );
    };
    const handleResetFilterReview = () => {
        dispatch(
            adminGetListReview({
                pageIndex: listReviewData.data.paging.pageIndex || 1,
                pagesize: listReviewData.data.paging.pageSize || 6,
            })
        );
    };
    const handleShowDetailReview = async (id: number) => {
        await dispatch(adminGetDetailReview(id)).then(() => {
            if (detailReviewData.success) {
                setIsDetailReview(true);
            }
        });
    };
    const handleDataEditReply = (id: number) => {
        if (detailReviewData.data.reply) {
            setValueReply(detailReviewData.data.reply?.content);
        }
        setIsUpdateReply(true);
    };
    const handleEditReply = async (id: number) => {
        if (id > 0 && ValueReply !== "") {
            const res = await dispatch(
                adminUpdateRely({
                    reviewId: id,
                    content: ValueReply.trim(),
                })
            );
            try {
                if (res.payload.success) {
                    toast.success("Cập nhật phản hồi thành công");
                    setIsUpdateReply(false);
                    setValueReply("");
                    dispatch(adminGetDetailReview(id));
                } else {
                    toast.error(
                        `Cập nhật phản hồi thất bại: ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(`có lỗi sảy ra vui lòng đợi trong giây lát`);
            }
        }
    };
    const handleDeleteReply = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(adminDeleteReply(id));
            try {
                if (res.payload.success) {
                    toast.success("xóa phản hồi thành công");
                    setIsUpdateReply(false);
                    setValueReply("");
                    dispatch(adminGetDetailReview(id));
                } else {
                    toast.error(
                        `xóa phản hồi thất bại: ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(`có lỗi sảy ra vui lòng đợi trong giây lát`);
            }
        }
    };
    const handleCreateReviewReply = async (id: number) => {
        if (id > 0 && ValueReply !== "") {
            const res = await dispatch(
                adminCreateReply({
                    reviewId: id,
                    content: ValueReply.trim(),
                })
            );
            try {
                if (res.payload.success) {
                    toast.success("Tạo mới phản hồi thành công");
                    setIsUpdateReply(false);
                    setValueReply("");
                    setIsCretaeReply(false);
                    dispatch(adminGetDetailReview(id));
                } else {
                    toast.error(
                        `Tạo mới phản hồi thất bại: ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(`có lỗi sảy ra vui lòng đợi trong giây lát`);
            }
        }
    };
    console.log(detailReviewData);
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-gray-300">
                Reviews management
            </h1>
            <div className="rounded-lg shadow-xs  bg-gray-800 mb-5">
                <div className="grid gap-4 lg:gap-4 xl:gap-4 md:gap-2 md:grid-cols-5 py-2 px-4">
                    <div className="">
                        <label className="block text-sm text-gray-400">
                            Start Date
                        </label>
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md  focus:bg-gray-700 border-gray-600 focus:border-gray-500 bg-gray-700"
                            type="date"
                            name="startDate"
                            value={formParams?.StartDate}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm text-gray-400">
                            End Date
                        </label>
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md   focus:bg-gray-700  border-gray-600 focus:border-gray-500 bg-gray-700"
                            type="date"
                            name="EndDate"
                            value={formParams?.EndDate}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm text-gray-400">
                            MinScore
                        </label>
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md  focus:bg-gray-700 border-gray-600 focus:border-gray-500 bg-gray-700"
                            type="number"
                            name="MinScore"
                            value={formParams?.MinScore || 0}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex items-center flex-col">
                        <label className="block text-sm  text-gray-400">
                            MaxScore
                        </label>
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md focus:bg-gray-700 border-gray-600 focus:border-gray-500 bg-gray-700"
                            type="number"
                            name="MaxScore"
                            value={formParams?.MaxScore || 0}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="">
                        <label className="block text-sm text-gray-400">
                            reply option
                        </label>
                        <SelecterFilter
                            h="48px"
                            options={[
                                {
                                    id: 1,
                                    title: "reply",
                                },
                                {
                                    id: 2,
                                    title: "không reply",
                                },
                            ]}
                            handleGetOptionBySelect={handleGetOptionBySelect}
                            typeId="reply"
                            defaultValue={
                                formParams.IsReply ? "reply" : "không repy"
                            }
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handFilterReview}
                            className="flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600"
                        >
                            Filter
                            <span className="ml-2 text-base">
                                <CiFilter size={22} />
                            </span>
                        </button>
                        <div className="w-full mx-1">
                            <button
                                className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-400 focus:outline-none rounded-lg border border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm bg-gray-700"
                                onClick={handleResetFilterReview}
                            >
                                Reset
                                <span className="text-gray-200 ml-2">
                                    <RxReset size={22} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {allReviews?.length ? (
                <div style={{ overflowY: "auto" }}>
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ID</td>
                                <td className="px-4 py-2">FULLNAME</td>
                                <td className="px-4 py-2">AVATA</td>
                                <td className="px-4 py-2">COMMENT</td>
                                <td className="px-4 py-2">CREATEATED</td>
                                <td className="px-4 py-2">PRODUCT NAME</td>
                                <td className="px-4 py-2">PRODUCT IMAGE</td>
                                <td className="px-4 py-2">SCORE REVIEW</td>
                                <td className="px-4 py-2 text-right">ACTION</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-400">
                            {!param?.id ? (
                                allReviews?.length > 0 &&
                                allReviews.map((review) => (
                                    <tr
                                        className="bg-custom-addmin_bg"
                                        key={review.id}
                                    >
                                        <td className="px-4 py-2 ">
                                            <span className="font-semibold uppercase text-xs">
                                                {review.id}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="font-semibold uppercase text-xs">
                                                {review.fullname}
                                            </span>
                                        </td>
                                        <td
                                            className={`px-4 py-2 cursor-pointer ${
                                                zoomImg === review.avatarUrl
                                                    ? "fixed top-0 left-0 w-full h-full bg-slate-950 flex justify-center items-center z-30"
                                                    : null
                                            }`}
                                            onClick={() =>
                                                handleZoomImg(review.avatarUrl)
                                            }
                                        >
                                            <img
                                                src={review.avatarUrl}
                                                alt=""
                                                className={`w-[30px] h-[30px] object-contain ${
                                                    zoomImg
                                                        ? "w-full h-full"
                                                        : null
                                                }`}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">
                                                {review.content}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {handleDate(review.createdAt)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {review.productVersionName}
                                            </span>
                                        </td>
                                        <td
                                            className={`px-4 py-2 cursor-pointer ${
                                                zoomImg ===
                                                review.productVersionImgUrl
                                                    ? "fixed top-0 left-0 w-full h-full bg-slate-950 flex justify-center items-center z-30"
                                                    : null
                                            }`}
                                            onClick={() =>
                                                handleZoomImg(
                                                    review.productVersionImgUrl
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    review.productVersionImgUrl
                                                }
                                                alt=""
                                                className={`w-[30px] h-[30px] object-contain ${
                                                    zoomImg
                                                        ? "w-full h-full"
                                                        : null
                                                }`}
                                            />
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {review.score}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <div className="flex justify-end">
                                                <div className="flex justify-between items-center gap-2">
                                                    <Tippy
                                                        content="chi tiết"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleShowDetailReview(
                                                                    review.id
                                                                )
                                                            }
                                                        >
                                                            <LiaSearchPlusSolid
                                                                size={22}
                                                            />
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : detailReviewData && detailReviewData.success ? (
                                <tr
                                    className="bg-custom-addmin_bg"
                                    key={detailReviewData.data.id}
                                >
                                    <td className="px-4 py-2 ">
                                        <span className="font-semibold uppercase text-xs">
                                            {detailReviewData.data.id}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <span className="font-semibold uppercase text-xs">
                                            {detailReviewData.data.fullname}
                                        </span>
                                    </td>
                                    <td
                                        className={`px-4 py-2 cursor-pointer ${
                                            zoomImg ===
                                            detailReviewData.data.avatarUrl
                                                ? "fixed top-0 left-0 w-full h-full bg-slate-950 flex justify-center items-center z-30"
                                                : null
                                        }`}
                                        onClick={() =>
                                            handleZoomImg(
                                                detailReviewData.data.avatarUrl
                                            )
                                        }
                                    >
                                        <img
                                            src={
                                                detailReviewData.data.avatarUrl
                                            }
                                            alt=""
                                            className={`w-[30px] h-[30px] object-contain ${
                                                zoomImg ? "w-full h-full" : null
                                            }`}
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className="text-sm">
                                            {detailReviewData.data.content}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <span className="text-sm">
                                            {handleDate(
                                                detailReviewData.data.createdAt
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <span className="text-sm">
                                            {
                                                detailReviewData.data
                                                    .productVersionName
                                            }
                                        </span>
                                    </td>
                                    <td
                                        className={`px-4 py-2 cursor-pointer ${
                                            zoomImg ===
                                            detailReviewData.data
                                                .productVersionImgUrl
                                                ? "fixed top-0 left-0 w-full h-full bg-slate-950 flex justify-center items-center z-30"
                                                : null
                                        }`}
                                        onClick={() =>
                                            handleZoomImg(
                                                detailReviewData.data
                                                    .productVersionImgUrl
                                            )
                                        }
                                    >
                                        <img
                                            src={
                                                detailReviewData.data
                                                    .productVersionImgUrl
                                            }
                                            alt=""
                                            className={`w-[30px] h-[30px] object-contain ${
                                                zoomImg ? "w-full h-full" : null
                                            }`}
                                        />
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <span className="text-sm">
                                            {detailReviewData.data.score}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 ">
                                        <div className="flex justify-end">
                                            <div className="flex justify-between items-center gap-2">
                                                <Tippy
                                                    content="chi tiết"
                                                    placement="bottom"
                                                    delay={100}
                                                    className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleShowDetailReview(
                                                                detailReviewData
                                                                    .data.id
                                                            )
                                                        }
                                                    >
                                                        <LiaSearchPlusSolid
                                                            size={22}
                                                        />
                                                    </button>
                                                </Tippy>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                    {pagination && listReviewData?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={pagination}
                            paging={listReviewData.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có đánh giá nào hợp lệ
                </div>
            )}
            {detailReviewData?.data ? (
                <CenterModal
                    show={isDetailReview}
                    setShow={setIsDetailReview}
                    bgAll="h"
                    showModalTitle
                    modalTitle={
                        <h1 className="text-white text-2xl font-bold">
                            Chi tiết đánh giá
                        </h1>
                    }
                    mainContent={
                        <div className="bg-gray-100 flex items-center justify-center relative">
                            <div className="">
                                <div className="py-8 transition duration-500">
                                    <div className="flex gap-2">
                                        <img
                                            src={
                                                detailReviewData.data.avatarUrl
                                            }
                                            alt=""
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
                                                {detailReviewData.data.fullname}
                                            </h1>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className="text-md text-gray-600 font-medium">
                                                {detailReviewData.data.content}
                                            </p>
                                            <div className="font-medium text-xs ml-1 mt-1">
                                                <span>
                                                    {`
                                                    ${new Date(
                                                        detailReviewData.data.createdAt
                                                    ).getMonth()} /${new Date(
                                                        detailReviewData.data.createdAt
                                                    ).getFullYear()} 
                                                    `}
                                                </span>
                                                {detailReviewData.data
                                                    .reply ? null : (
                                                    <button
                                                        onClick={() =>
                                                            setIsCretaeReply(
                                                                true
                                                            )
                                                        }
                                                        className="underline ml-2"
                                                    >
                                                        trả lời
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {detailReviewData.data.reply ? (
                                            <div className="flex justify-between items-center ml-4">
                                                <div className="mt-2 flex items-center space-x-4">
                                                    <div className="">
                                                        <img
                                                            className="w-12 h-12 rounded-full"
                                                            src={
                                                                detailReviewData
                                                                    .data.reply
                                                                    .avatarUrl
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs mt-6 font-bold">
                                                            {
                                                                detailReviewData
                                                                    .data.reply
                                                                    .fullname
                                                            }
                                                        </span>
                                                        {isUpdateReply ? (
                                                            <div className="relative">
                                                                <input
                                                                    className={`text-sm font-semibold border min-w-[300px] w-full py-1 px-2 pr-8 rounded-md ${
                                                                        ValueReply ===
                                                                        ""
                                                                            ? "border-red-500"
                                                                            : "border-[#333] "
                                                                    }`}
                                                                    value={
                                                                        ValueReply
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setValueReply(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        handleEditReply(
                                                                            detailReviewData
                                                                                .data
                                                                                .id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        ValueReply ===
                                                                        ""
                                                                    }
                                                                    className="absolute top-1/2 -translate-y-1/2 right-2 text-red-600 disabled:text-custom-disable"
                                                                >
                                                                    <MdOutlineSend />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="text-sm font-semibold">
                                                                {
                                                                    detailReviewData
                                                                        .data
                                                                        .reply
                                                                        .content
                                                                }
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() =>
                                                                    handleDataEditReply(
                                                                        detailReviewData
                                                                            .data
                                                                            .reply
                                                                            ?.id ||
                                                                            0
                                                                    )
                                                                }
                                                                className="text-green-600"
                                                            >
                                                                <CiEdit
                                                                    size={16}
                                                                />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteReply(
                                                                        detailReviewData
                                                                            .data
                                                                            .id
                                                                    )
                                                                }
                                                                className="text-red-500"
                                                            >
                                                                <MdDeleteOutline
                                                                    size={16}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : isCretaeReply ? (
                                            <div className="flex justify-between items-center ml-4">
                                                <div className="mt-2 flex items-center space-x-4 py-6">
                                                    <div className="">
                                                        <img
                                                            className="w-12 h-12 rounded-full"
                                                            src="https://i.imgur.com/Th0n214.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs mt-6 font-bold">
                                                            Nhân viên
                                                        </span>
                                                        {isCretaeReply ? (
                                                            <div className="relative">
                                                                <input
                                                                    className={`text-sm font-semibold border min-w-[300px] w-full py-1 px-2 pr-8 rounded-md ${
                                                                        ValueReply ===
                                                                        ""
                                                                            ? "border-red-500"
                                                                            : "border-[#333] "
                                                                    }`}
                                                                    value={
                                                                        ValueReply
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setValueReply(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        handleCreateReviewReply(
                                                                            detailReviewData
                                                                                .data
                                                                                .id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        ValueReply ===
                                                                        ""
                                                                    }
                                                                    className="absolute top-1/2 -translate-y-1/2 right-2 text-red-600 disabled:text-custom-disable"
                                                                >
                                                                    <MdOutlineSend />
                                                                </button>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDetailReview(false)}
                                className="absolute top-4 right-4 text-red-600"
                            >
                                <MdOutlineClear size={28} />
                            </button>
                        </div>
                    }
                />
            ) : null}
            <Notification />
        </div>
    );
};

export default ReviewManager;

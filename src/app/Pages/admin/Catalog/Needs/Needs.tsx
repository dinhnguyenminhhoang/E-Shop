import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Paginations from "@/Components/Paginations/Paginations";
import { categoryType } from "@/common/catalog";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Filter from "../Filter";
import Table from "../Table";
import Notification from "@/Components/PageLoader/Notification";
import {
    adminCreateNeed,
    adminDeleteNeed,
    adminEditNeed,
    getNeedsByParams,
} from "@/app/action/adminAction/adminNeeds";
const initFormData = {
    id: 0,
    title: "",
    description: "",
};
const Needs = () => {
    const dispatch = useDispatch<any>();
    const adminNeedsData = useSelector(
        (state: any) => state.adminNeedsData.data
    ) as {
        data: { list: categoryType[]; paging: pagingType };
        success: boolean;
    };
    const [searchValue, setSearchValue] = useState<string>("");
    const [isNewNeed, setISNewNeed] = useState<boolean>(false);
    const [formData, setFormData] = useState<typeof initFormData>(initFormData);
    const [isUpdateNeed, setISUpdateNeed] = useState<boolean>(false);
    const handleSearchNeed = () => {
        if (searchValue.trim() !== "" && adminNeedsData.data.paging.pageIndex) {
            dispatch(
                getNeedsByParams({
                    pageSize: 6,
                    pageIndex: adminNeedsData.data.paging.pageIndex,
                    name: searchValue.trim(),
                })
            );
        }
    };
    useEffect(() => {
        dispatch(getNeedsByParams({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (searchValue.trim() !== "") {
                dispatch(
                    getNeedsByParams({
                        pageSize: 6,
                        pageIndex: newPage,
                        name: searchValue.trim(),
                    })
                );
            } else {
                dispatch(getNeedsByParams({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleResetNeed = () => {
        setSearchValue("");
        dispatch(
            getNeedsByParams({
                pageSize: 6,
                pageIndex: adminNeedsData.data.paging.pageIndex || 1,
            })
        );
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleAddOrUpdateNeed = async () => {
        if (
            formData.title.trim() !== "" &&
            formData.description.trim() !== ""
        ) {
            if (!isUpdateNeed) {
                const res = await dispatch(adminCreateNeed({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getNeedsByParams({
                                pageIndex:
                                    adminNeedsData.data.paging.pageIndex || 1,
                                pageSize:
                                    adminNeedsData.data.paging.pageSize || 6,
                            })
                        );
                        toast.success("tạo mới Nhu cầu thành công!");
                        setFormData(initFormData);
                        setISNewNeed(false);
                    } else {
                        toast.error(
                            `tạo mới Nhu cầu thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            } else {
                const res = await dispatch(adminEditNeed({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getNeedsByParams({
                                pageIndex:
                                    adminNeedsData.data.paging.pageIndex || 1,
                                pageSize:
                                    adminNeedsData.data.paging.pageSize || 6,
                            })
                        );
                        toast.success("Chỉnh sửa Nhu cầu thành công!");
                        setFormData(initFormData);
                        setISNewNeed(false);
                        setISUpdateNeed(false);
                    } else {
                        toast.error(
                            `Chỉnh sửa Nhu cầu thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            }
        }
    };
    const handleDeleteNeed = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(adminDeleteNeed(id));
            try {
                if (res.payload.success) {
                    toast.success("xóa Nhu cầu thành công!");
                    dispatch(
                        getNeedsByParams({
                            pageIndex:
                                adminNeedsData.data.paging.pageIndex || 1,
                            pageSize: adminNeedsData.data.paging.pageSize || 6,
                            name: searchValue,
                        })
                    );
                } else {
                    toast.error(
                        `tạo mới Nhu cầu thất bại! ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        }
    };
    const handleEditNeed = (category: any) => {
        setISNewNeed(true);
        setISUpdateNeed(true);
        setFormData({ ...category });
    };
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex items-center">
                        <div className="lg:flex md:flex flex-grow-0">
                            <button
                                onClick={() => setISNewNeed(true)}
                                className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
                            >
                                <CiExport size={22} />
                                <span className="text-xs">Tạo mới</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Filter
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                handleSearch={handleSearchNeed}
                handleReset={handleResetNeed}
                placeholder="tìm kiếm theo nhu cầu"
            />
            {adminNeedsData?.data?.list.length ? (
                <div className="w-full overflow-hidden border border-gray-700 rounded-lg mb-8 rounded-b-lg">
                    {adminNeedsData.data.list ? (
                        <Table
                            data={adminNeedsData.data.list}
                            handleDelete={handleDeleteNeed}
                            handleEdit={handleEditNeed}
                        />
                    ) : null}
                    {adminNeedsData?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage:
                                    adminNeedsData.data.paging.pageIndex || 0,
                                totalPage:
                                    adminNeedsData.data.paging.totalPages || 0,
                            }}
                            paging={adminNeedsData.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có sản phẩm nào hợp lệ
                </div>
            )}
            <CenterModal
                show={isNewNeed}
                setShow={setISNewNeed}
                showModalTitle={true}
                modalTitle={
                    <h1 className="text-2xl font-bold text-white">
                        {isUpdateNeed ? "Chỉnh sửa nhu cầu" : "Tạo nhu cầu mới"}
                    </h1>
                }
                bgAll="bg"
                mainContent={
                    <div className="flex justify-between gap-4">
                        <div className="w-1/2">
                            <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                tên :
                            </p>
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px]"
                                type="text"
                                value={formData.title}
                                name="title"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập tên Nhu cầu"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                mô tả :
                            </p>
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px]"
                                type="text"
                                value={formData.description}
                                name="description"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="mô tả"
                            />
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={handleAddOrUpdateNeed}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            {isUpdateNeed ? "Chỉnh sửa" : "Tạo"}
                        </button>
                        <button
                            onClick={() => {
                                setISNewNeed(false);
                                setISUpdateNeed(false);
                                if (formData.title) {
                                    setFormData(initFormData);
                                }
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            Đóng
                        </button>
                    </div>
                }
            />
            <Notification />
        </div>
    );
};

export default Needs;

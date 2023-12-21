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
    adminCreateCategory,
    adminDeleteCategory,
    adminEditCategory,
    getCategoriesByParams,
} from "@/app/action/adminAction/adminCategories";
const initFormData = {
    id: 0,
    name: "",
    description: "",
};
const Categories = () => {
    const dispatch = useDispatch<any>();
    const adminCategoriesData = useSelector(
        (state: any) => state.adminCategoriesData.data
    ) as {
        data: { list: categoryType[]; paging: pagingType };
        success: boolean;
    };
    const [searchValue, setSearchValue] = useState<string>("");
    const [isNewCategory, setISNewCategory] = useState<boolean>(false);
    const [formData, setFormData] = useState<typeof initFormData>(initFormData);
    const [isUpdateCategory, setISUpdateCategory] = useState<boolean>(false);
    const handleSearchCategory = () => {
        if (
            searchValue.trim() !== "" &&
            adminCategoriesData.data.paging.pageIndex
        ) {
            dispatch(
                getCategoriesByParams({
                    pageSize: 6,
                    pageIndex: adminCategoriesData.data.paging.pageIndex,
                    name: searchValue,
                })
            );
        }
    };
    useEffect(() => {
        dispatch(getCategoriesByParams({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (searchValue.trim() !== "") {
                dispatch(
                    getCategoriesByParams({
                        pageSize: 6,
                        pageIndex: newPage,
                        name: searchValue.trim(),
                    })
                );
            } else {
                dispatch(
                    getCategoriesByParams({ pageSize: 6, pageIndex: newPage })
                );
            }
        }
    };
    const handleResetCategory = () => {
        setSearchValue("");
        dispatch(
            getCategoriesByParams({
                pageSize: 6,
                pageIndex: adminCategoriesData.data.paging.pageIndex || 1,
            })
        );
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleAddOrUpdateCategory = async () => {
        if (formData.name.trim() !== "" && formData.description.trim() !== "") {
            if (!isUpdateCategory) {
                const res = await dispatch(
                    adminCreateCategory({ ...formData })
                );
                try {
                    if (res.payload.success) {
                        dispatch(
                            getCategoriesByParams({
                                pageIndex:
                                    adminCategoriesData.data.paging.pageIndex ||
                                    1,
                                pageSize:
                                    adminCategoriesData.data.paging.pageSize ||
                                    6,
                            })
                        );
                        toast.success("tạo mới loại hàng thành công!");
                        setFormData(initFormData);
                        setISNewCategory(false);
                    } else {
                        toast.error(
                            `tạo mới loại hàng thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            } else {
                const res = await dispatch(adminEditCategory({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getCategoriesByParams({
                                pageIndex:
                                    adminCategoriesData.data.paging.pageIndex ||
                                    1,
                                pageSize:
                                    adminCategoriesData.data.paging.pageSize ||
                                    6,
                            })
                        );
                        toast.success("Chỉnh sửa loại hàng thành công!");
                        setFormData(initFormData);
                        setISNewCategory(false);
                        setISUpdateCategory(false);
                    } else {
                        toast.error(
                            `Chỉnh sửa loại hàng thất bại! ${res.payload.message}`
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
    const handleDeleteCategory = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(adminDeleteCategory(id));
            try {
                if (res.payload.success) {
                    toast.success("xóa loại hàng thành công!");
                    dispatch(
                        getCategoriesByParams({
                            pageIndex:
                                adminCategoriesData.data.paging.pageIndex || 1,
                            pageSize:
                                adminCategoriesData.data.paging.pageSize || 6,
                            name: searchValue,
                        })
                    );
                } else {
                    toast.error(
                        `tạo mới loại hàng thất bại! ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        }
    };
    const handleEditCategory = (category: any) => {
        setISNewCategory(true);
        setISUpdateCategory(true);
        setFormData({ ...category });
    };
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex items-center">
                        <div className="lg:flex md:flex flex-grow-0">
                            <button
                                onClick={() => setISNewCategory(true)}
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
                handleSearch={handleSearchCategory}
                handleReset={handleResetCategory}
                placeholder="tìm kiếm theo danh mục"
            />
            {adminCategoriesData?.data?.list.length ? (
                <div className="w-full overflow-hidden border border-gray-700 rounded-lg mb-8 rounded-b-lg">
                    {adminCategoriesData.data.list ? (
                        <Table
                            data={adminCategoriesData.data.list}
                            handleDelete={handleDeleteCategory}
                            handleEdit={handleEditCategory}
                        />
                    ) : null}
                    {adminCategoriesData?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage:
                                    adminCategoriesData.data.paging.pageIndex ||
                                    0,
                                totalPage:
                                    adminCategoriesData.data.paging
                                        .totalPages || 0,
                            }}
                            paging={adminCategoriesData.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có sản phẩm nào hợp lệ
                </div>
            )}
            <CenterModal
                show={isNewCategory}
                setShow={setISNewCategory}
                showModalTitle={true}
                modalTitle={
                    <h1 className="text-2xl font-bold text-white">
                        {isUpdateCategory
                            ? "Chỉnh sửa danh mục"
                            : "Tạo danh mục mới"}
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
                                value={formData.name}
                                name="name"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập tên loại hàng"
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
                                placeholder="nhập mô tả loại hàng"
                            />
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={handleAddOrUpdateCategory}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            {isUpdateCategory ? "Chỉnh sửa" : "Tạo"}
                        </button>
                        <button
                            onClick={() => {
                                setISNewCategory(false);
                                setISUpdateCategory(false);
                                if (formData.name) {
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

export default Categories;

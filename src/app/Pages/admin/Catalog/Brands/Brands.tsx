import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Paginations from "@/Components/Paginations/Paginations";
import {
    adminCreateBrand,
    adminDeleteBrands,
    adminEditBrands,
    getBrandsByParams,
} from "@/app/action/adminAction/adminBrands";
import { brandType } from "@/common/catalog";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Filter from "../Filter";
import Table from "../Table";
import Notification from "@/Components/PageLoader/Notification";
const initFormData = {
    id: 0,
    name: "",
    description: "",
};
const Brands = () => {
    const dispatch = useDispatch<any>();
    const adminBrandsData = useSelector(
        (state: any) => state.adminBrandsData.data
    ) as { data: { list: brandType[]; paging: pagingType }; success: boolean };
    const [searchValue, setSearchValue] = useState<string>("");
    const [isNewBrand, setISNewBrand] = useState<boolean>(false);
    const [formData, setFormData] = useState<typeof initFormData>(initFormData);
    const [isUpdateBrand, setISUpdateBrand] = useState<boolean>(false);
    const handleSearchBrand = () => {
        if (
            searchValue.trim() !== "" &&
            adminBrandsData.data.paging.pageIndex
        ) {
            dispatch(
                getBrandsByParams({
                    pageSize: 6,
                    pageIndex: adminBrandsData.data.paging.pageIndex,
                    name: searchValue,
                })
            );
        }
    };
    useEffect(() => {
        dispatch(getBrandsByParams({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (searchValue.trim() !== "") {
                dispatch(
                    getBrandsByParams({
                        pageSize: 6,
                        pageIndex: newPage,
                        name: searchValue.trim(),
                    })
                );
            } else {
                dispatch(
                    getBrandsByParams({ pageSize: 6, pageIndex: newPage })
                );
            }
        }
    };
    const handleResetBrands = () => {
        setSearchValue("");
        dispatch(
            getBrandsByParams({
                pageSize: 6,
                pageIndex: adminBrandsData.data.paging.pageIndex || 1,
            })
        );
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleAddOrUpdateBrands = async () => {
        if (formData.name.trim() !== "" && formData.description.trim() !== "") {
            if (!isUpdateBrand) {
                const res = await dispatch(adminCreateBrand({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getBrandsByParams({
                                pageIndex:
                                    adminBrandsData.data.paging.pageIndex || 1,
                                pageSize:
                                    adminBrandsData.data.paging.pageSize || 6,
                            })
                        );
                        toast.success("tạo mới nhãn hàng thành công!");
                        setFormData(initFormData);
                        setISNewBrand(false);
                    } else {
                        toast.error(
                            `tạo mới nhãn hàng thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            } else {
                const res = await dispatch(adminEditBrands({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getBrandsByParams({
                                pageIndex:
                                    adminBrandsData.data.paging.pageIndex || 1,
                                pageSize:
                                    adminBrandsData.data.paging.pageSize || 6,
                            })
                        );
                        toast.success("Chỉnh sửa nhãn hàng thành công!");
                        setFormData(initFormData);
                        setISNewBrand(false);
                        setISUpdateBrand(false);
                    } else {
                        toast.error(
                            `Chỉnh sửa nhãn hàng thất bại! ${res.payload.message}`
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
    const handleDeleteBrand = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(adminDeleteBrands(id));
            try {
                if (res.payload.success) {
                    toast.success("xóa nhãn hàng thành công!");
                    dispatch(
                        getBrandsByParams({
                            pageIndex:
                                adminBrandsData.data.paging.pageIndex || 1,
                            pageSize: adminBrandsData.data.paging.pageSize || 6,
                            name: searchValue,
                        })
                    );
                } else {
                    toast.error(
                        `tạo mới nhãn hàng thất bại! ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        }
    };
    const handleEditBrand = (brand: any) => {
        setISNewBrand(true);
        setISUpdateBrand(true);
        setFormData({ ...brand });
    };
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex items-center">
                        <div className="lg:flex md:flex flex-grow-0">
                            <button
                                onClick={() => setISNewBrand(true)}
                                className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
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
                handleSearch={handleSearchBrand}
                handleReset={handleResetBrands}
                placeholder="tìm kiếm theo nhãn hàng"
            />
            {adminBrandsData?.data?.list.length ? (
                <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg mb-8 rounded-b-lg">
                    {adminBrandsData.data.list ? (
                        <Table
                            data={adminBrandsData.data.list}
                            handleDelete={handleDeleteBrand}
                            handleEdit={handleEditBrand}
                        />
                    ) : null}
                    {adminBrandsData?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage:
                                    adminBrandsData.data.paging.pageIndex || 0,
                                totalPage:
                                    adminBrandsData.data.paging.totalPages || 0,
                            }}
                            paging={adminBrandsData.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có sản phẩm nào hợp lệ
                </div>
            )}
            <CenterModal
                show={isNewBrand}
                setShow={setISNewBrand}
                showModalTitle={true}
                modalTitle={
                    <h1 className="text-2xl font-bold text-white">
                        {isUpdateBrand
                            ? "Chỉnh sửa nhãn hàng"
                            : "Tạo nhãn hàng mới"}
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
                                placeholder="nhập tên nhãn hàng"
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
                                placeholder="nhập mô tả nhãn hàng"
                            />
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={handleAddOrUpdateBrands}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            {isUpdateBrand ? "Chỉnh sửa" : "Tạo"}
                        </button>
                        <button
                            onClick={() => {
                                setISNewBrand(false);
                                setISUpdateBrand(false);
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

export default Brands;

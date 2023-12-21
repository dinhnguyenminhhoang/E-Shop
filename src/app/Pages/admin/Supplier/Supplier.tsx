import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import {
    createSupplier,
    deleteSupplier,
    getListSupplier,
    getSupplier,
    updateSupplier,
} from "@/app/action/adminAction/adminSupplier";
import { supplierType } from "@/common/getAllType";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlinePrinter } from "react-icons/ai";
import { CiEdit, CiExport } from "react-icons/ci";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Filter from "../Catalog/Filter";
const initFormData = {
    name: "",
    email: "",
    phoneNumber: "",
    address: {
        specificAddress: "",
        wards: "",
        districts: "",
        province: "",
    },
};
const Supplier = () => {
    const dispatch = useDispatch<any>();
    const listSuplierData = useSelector(
        (state: any) => state.listSuplierData.data
    ) as {
        data: { list: supplierType[]; paging: pagingType };
        success: boolean;
    };
    const [searchValue, setSearchValue] = useState<string>("");
    const [isNewSupplier, setISNewSupplier] = useState<boolean>(false);
    const [formData, setFormData] = useState<supplierType>(initFormData);
    const [isUpdateSupplier, setISUpdateSupplier] = useState<boolean>(false);
    const suplierDetailData = useSelector(
        (state: any) => state.suplierDetailData.data
    );
    const [paging, setPaging] = useState<pagingType>();
    const [dataSupplier, setDataSupplier] = useState<supplierType[]>();
    useEffect(() => {
        if (listSuplierData?.success && listSuplierData.data) {
            setPaging({ ...listSuplierData.data?.paging });
            setDataSupplier(listSuplierData?.data?.list);
        }
    }, [listSuplierData]);
    const handleSearchSupplier = () => {
        if (searchValue.trim() !== "" && paging?.pageIndex) {
            dispatch(
                getListSupplier({
                    pageSize: 6,
                    pageIndex: paging?.pageIndex,
                    name: searchValue,
                })
            );
        }
    };
    const handleResetSupplier = () => {
        setSearchValue("");
        dispatch(
            getListSupplier({
                pageSize: 6,
                pageIndex: paging?.pageIndex || 1,
            })
        );
    };
    useEffect(() => {
        dispatch(getListSupplier({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (searchValue.trim() !== "") {
                dispatch(
                    getListSupplier({
                        pageSize: 6,
                        pageIndex: newPage,
                        name: searchValue.trim(),
                    })
                );
            } else {
                dispatch(getListSupplier({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleOnchangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [e.target.name]: e.target.value,
            },
        });
    };
    const handleAddOrUpdateSuppliers = async () => {
        if (
            formData.name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.address &&
            formData.phoneNumber.trim() !== ""
        ) {
            if (!isUpdateSupplier) {
                const res = await dispatch(createSupplier({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getListSupplier({
                                pageIndex: paging?.pageIndex || 1,
                                pageSize: paging?.pageSize || 6,
                            })
                        );
                        toast.success("tạo mới nhà cung cấp thành công!");
                        setFormData(initFormData);
                        setISNewSupplier(false);
                    } else {
                        toast.error(
                            `tạo mới nhà cung cấp thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            } else {
                const res = await dispatch(updateSupplier({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getListSupplier({
                                pageIndex: paging?.pageIndex || 1,
                                pageSize: paging?.pageSize || 6,
                            })
                        );
                        toast.success("Chỉnh sửa nhà cung cấp thành công!");
                        setFormData(initFormData);
                        setISNewSupplier(false);
                    } else {
                        toast.error(
                            `Chỉnh sửa nhà cung cấp thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            }
        } else {
            toast.error("vui lòng nhập đầy đủ thông tin");
        }
    };
    const handleDeleteSupplier = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(deleteSupplier(id));
            try {
                if (res.payload.success) {
                    toast.success("xóa nhà cung cấp thành công!");
                    dispatch(
                        getListSupplier({
                            pageIndex: paging?.pageIndex || 1,
                            pageSize: paging?.pageSize || 6,
                            name: searchValue,
                        })
                    );
                } else {
                    toast.error(
                        `tạo mới nhà cung cấp thất bại! ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        }
    };
    const handleEditSupplier = async (supplier: supplierType) => {
        if (supplier.id) {
            const res = await dispatch(getSupplier(supplier.id));
            try {
                if (res.payload.success) {
                    setISNewSupplier(true);
                    setISUpdateSupplier(true);
                    setFormData({ ...res.payload.data });
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        }
    };
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex items-center">
                        <div className="lg:flex md:flex flex-grow-0">
                            <button
                                onClick={() => setISNewSupplier(true)}
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
                handleSearch={handleSearchSupplier}
                handleReset={handleResetSupplier}
            />
            {listSuplierData?.data?.list.length ? (
                <div className="w-full overflow-hidden border border-gray-700 rounded-lg mb-8 rounded-b-lg">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-leftuppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ID</td>
                                <td className="px-4 py-2">NAME</td>
                                <td className="px-4 py-2">EMAIL</td>
                                <td className="px-4 py-2">PHONENUMBER</td>
                                <td className="px-4 py-2 text-right">ACTION</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-400">
                            {dataSupplier?.length &&
                                dataSupplier.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">
                                                {item.id}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.name}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.email}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {item.phoneNumber}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-end text-right">
                                                <button
                                                    onClick={() =>
                                                        handleEditSupplier(item)
                                                    }
                                                    className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                                >
                                                    <CiEdit size={22} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteSupplier(
                                                            Number(item.id)
                                                        )
                                                    }
                                                    className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                                >
                                                    <AiOutlineDelete
                                                        size={22}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {listSuplierData?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage:
                                    listSuplierData.data.paging.pageIndex || 0,
                                totalPage:
                                    listSuplierData.data.paging.totalPages || 0,
                            }}
                            paging={listSuplierData.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có sản phẩm nào hợp lệ
                </div>
            )}
            <CenterModal
                show={isNewSupplier}
                setShow={setISNewSupplier}
                showModalTitle={true}
                modalTitle={
                    <h1 className="text-2xl font-bold text-white">
                        {isUpdateSupplier
                            ? "Chỉnh sửa nhà cung cấp"
                            : "Tạo nhà cung cấp mới"}
                    </h1>
                }
                bgAll="bg"
                mainContent={
                    <div className="flex flex-col gap-4">
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
                                    placeholder="nhập tên nhà cung cấp"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    email :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="email"
                                    value={formData.email}
                                    name="email"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="nhập mô tả nhà cung cấp"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    số điện thoại :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.phoneNumber}
                                    name="phoneNumber"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="nhập tên nhà cung cấp"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    tỉnh :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.address.province}
                                    name="province"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeAddress(e)}
                                    placeholder="nhập tên nhà cung cấp"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    huyện :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.address.districts}
                                    name="districts"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeAddress(e)}
                                    placeholder="nhập mô tả nhà cung cấp"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    phường :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.address.wards}
                                    name="wards"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeAddress(e)}
                                    placeholder="nhập mô tả nhà cung cấp"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    địa chỉ cụ thể :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.address.specificAddress}
                                    name="specificAddress"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeAddress(e)}
                                    placeholder="nhập tên nhà cung cấp"
                                />
                            </div>
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={handleAddOrUpdateSuppliers}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            {isUpdateSupplier ? "Chỉnh sửa" : "Tạo"}
                        </button>
                        <button
                            onClick={() => {
                                setISNewSupplier(false);
                                setISUpdateSupplier(false);
                                if (formData.email) setFormData(initFormData);
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

export default Supplier;

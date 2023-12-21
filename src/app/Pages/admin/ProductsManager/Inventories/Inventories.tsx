import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import {
    adminCreateImport,
    adminGetAllInventory,
} from "@/app/action/adminAction/adminInventory";
import { getListSupplier } from "@/app/action/adminAction/adminSupplier";
import { allInventoryType, importShipmentsgetType } from "@/common/Inventory";
import { getDisscountType, supplierType } from "@/common/getAllType";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const initFormData = {
    productVersionId: 0,
    quantity: 0,
    cost: 0,
};
const Inventories = () => {
    const dispatch = useDispatch<any>();
    const allInventory = useSelector((state: any) => state.allInventory.data);
    const listSuplierData = useSelector(
        (state: any) => state.listSuplierData.data
    ) as {
        data: { list: supplierType[]; paging: pagingType };
        success: boolean;
    };

    const [paging, setPaging] = useState<pagingType>();
    const [inventories, setInventories] = useState<allInventoryType[]>();
    const [idSupplier, setIdSupplier] = useState<number>(0);
    const [idProductVersion, setIdProductVersion] = useState<number>(0);
    const [formParam, setFormParam] = useState<getDisscountType>({
        pageIndex: 1,
        pageSize: 6,
    });
    const [formData, setFormData] =
        useState<importShipmentsgetType>(initFormData);
    const [isNewImport, setIsNewImport] = useState<boolean>(false);
    useEffect(() => {
        dispatch(adminGetAllInventory({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    useEffect(() => {
        if (isNewImport && !listSuplierData.success) {
            dispatch(getListSupplier({ pageIndex: 1, pageSize: 100 }));
        }
    }, [dispatch, isNewImport, listSuplierData]);
    useEffect(() => {
        if (allInventory.success) {
            setInventories(allInventory?.data?.list);
            setPaging(allInventory?.data?.paging);
        }
    }, [allInventory]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (formParam?.ProductName && formParam.ProductName.trim() !== "") {
                dispatch(
                    adminGetAllInventory({
                        pageSize: 6,
                        pageIndex: newPage,
                        Keyword: formParam.ProductName.trim(),
                    })
                );
            } else {
                dispatch(
                    adminGetAllInventory({ pageSize: 6, pageIndex: newPage })
                );
            }
        }
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormParam({ ...formParam, [e.target.name]: e.target.value });
    };
    const handleOnChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSearhInventories = () => {
        if (formParam.ProductName && formParam.ProductName.trim() !== "") {
            dispatch(
                adminGetAllInventory({
                    pageSize: paging?.pageSize || 6,
                    pageIndex: paging?.pageIndex || 1,
                    Keyword: formParam.ProductName.trim(),
                })
            );
        }
    };
    const handleResetSearchInventories = () => {
        setFormParam({ ...formParam, ProductName: "" });
        dispatch(
            adminGetAllInventory({
                pageSize: paging?.pageSize || 6,
                pageIndex: paging?.pageIndex || 1,
            })
        );
    };
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        setIdSupplier(option?.id);
    };
    const handleCreateImports = async () => {
        if (
            idProductVersion > 0 &&
            idSupplier > 0 &&
            formData.quantity > 0 &&
            formData.cost > 0
        ) {
            const res = await dispatch(
                adminCreateImport({
                    supplierId: idSupplier,
                    importShipments: [
                        { ...formData, productVersionId: idProductVersion },
                    ],
                })
            );
            try {
                if (res.payload.success) {
                    toast.success("thêm sản phẩm vào kho thành công");
                    setFormData(initFormData);
                    setIdProductVersion(0);
                    setIdSupplier(0);
                    setIsNewImport(false);
                    dispatch(
                        adminGetAllInventory({
                            pageIndex: paging?.pageIndex || 1,
                            pageSize: paging?.pageSize || 6,
                        })
                    );
                } else {
                    toast.error(
                        `thêm sản phẩm vào kho thất bại ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error("lỗi sảy ra vui lòng thử lại sau giây lát");
            }
        } else {
            toast.error("vui lòng nhập đúng thông tin");
        }
    };
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg  min-w-0 shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div>
                        <div className="flex justify-between items-center gap-4">
                            <input
                                className="flex-1 w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md   focus:bg-gray-700 border-gray-600 focus:border-gray-500 bg-gray-700"
                                type="search"
                                name="ProductName"
                                placeholder="Search by product Name"
                                value={formParam.ProductName}
                                onChange={handleOnChange}
                            />
                            <div className="flex items-center gap-1">
                                <div className="min-w-[120px]">
                                    <button
                                        disabled={
                                            formParam.ProductName?.trim() === ""
                                        }
                                        onClick={handleSearhInventories}
                                        className="disabled:bg-custom-disable disabled:border-custom-disable align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                    >
                                        Search
                                    </button>
                                </div>
                                <div className="min-w-[20%] mx-1">
                                    <button
                                        disabled={
                                            formParam.ProductName?.trim() === ""
                                        }
                                        className="disabled:bg-custom-disable disabled:border-custom-disable align-bottom leading-5 transition-colors duration-150 font-medium text-gray-400 focus:outline-none rounded-lg border border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm bg-gray-700"
                                        onClick={handleResetSearchInventories}
                                    >
                                        <span className="text-gray-200">
                                            Reset
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="w-full overflow-hidden border border-gray-700 rounded-lg rounded-b-lg">
                    {inventories?.length ? (
                        <table className="w-full whitespace-nowrap">
                            <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                <tr>
                                    <td className="px-4 py-2">
                                        ID PRODUCT VERSION
                                    </td>
                                    <td className="px-4 py-2">
                                        TÊN PRODUCT VESION
                                    </td>
                                    <td className="px-4 py-2">IMAGE</td>
                                    <td className="px-4 py-2">HÀNG TỒN KHO</td>
                                    <td className="px-4 py-2">GIÁ</td>
                                    <td className="px-4 py-2">TRẠNG THÁI</td>
                                    <td className="px-4 py-2 text-right">
                                        ACTION
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-800  text-gray-400">
                                {inventories?.length &&
                                    inventories.map((item, index: number) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">
                                                <span className="text-sm">
                                                    {item.productVersionId}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {item.productVersionName}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <img
                                                    src={item.imageUrl}
                                                    alt=""
                                                    className={`w-[30px] h-[30px] object-contain`}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {item.inventory}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {item.price || 1}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {!item.isOutOfStock
                                                        ? "còn hàng"
                                                        : "hết hàng"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-end text-right">
                                                    <button
                                                        onClick={() => {
                                                            setIsNewImport(
                                                                true
                                                            );
                                                            setIdProductVersion(
                                                                item.productVersionId
                                                            );
                                                        }}
                                                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                                    >
                                                        <MdOutlineAddBox
                                                            size={22}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex justify-center items-center text-white text-xl font-bold">
                            Không có nhà cung cấp nào hợp lệ
                        </div>
                    )}

                    {allInventory && paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage: paging.pageIndex || 0,
                                totalPage: paging.totalPages || 0,
                            }}
                            paging={paging}
                        />
                    )}
                </div>
                <CenterModal
                    show={isNewImport}
                    setShow={setIsNewImport}
                    bgAll="bg"
                    mainContent={
                        <div className="flex gap-4 justify-start items-start p-2">
                            <div className="flex flex-col gap-6 w-full">
                                <div className="flex flex-col justify-between items-start gap-4">
                                    <div className="w-full">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            chọn nhà cung cấp :
                                        </p>
                                        {listSuplierData?.data?.list?.length ? (
                                            <SelecterLab
                                                options={
                                                    listSuplierData?.data?.list
                                                }
                                                handleGetOptionBySelect={
                                                    handleGetOptionBySelect
                                                }
                                                typeId="Suplier"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            quantity:
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="number"
                                            value={formData.quantity}
                                            name="quantity"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChangeData(e)}
                                            placeholder="nhập số lượng"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            cost :
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="number"
                                            value={formData.cost}
                                            name="cost"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChangeData(e)}
                                            placeholder="cost"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    showButtons={true}
                    buttonComponent={
                        <div className="flex gap-2 justify-center mb-2">
                            <button
                                onClick={handleCreateImports}
                                className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                            >
                                Hoàn tất
                            </button>
                            <button
                                onClick={() => {
                                    setIsNewImport(false);
                                    setFormData(initFormData);
                                    setIdSupplier(0);
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
        </div>
    );
};

export default Inventories;

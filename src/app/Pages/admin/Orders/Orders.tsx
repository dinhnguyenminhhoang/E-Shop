import SelecterFilter from "@/Components/FormData/Selecter/SelecterFilter";
import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import { adminGetImportShipment } from "@/app/action/adminAction/adminInventory";
import {
    adminGetOrderDetail,
    adminListOrder,
    adminUpdateOrderDetail,
    adminUpdateStatus,
} from "@/app/action/adminAction/adminOrder";
import { orderDetailType, orderType } from "@/common/Order";
import { getOrderType } from "@/common/getAllType";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const initFormData = {
    CustomerName: "",
    Status: "",
    StartDate: "",
    EndDate: "",
    pageIndex: 0,
    pageSize: 0,
};
const Orders = () => {
    const router = useNavigate();
    const dispatch = useDispatch<any>();
    const [isImportsShipment, setIsImportsShipment] = useState<boolean>(false);
    const [formData, setFormData] = useState<getOrderType>(initFormData);
    const [isUpdateOrder, setISUpdateOrder] = useState<boolean>(false);
    const [pagi, setPagi] = useState<pagingType>({});
    const [dataOrder, setDataOrder] = useState<orderType[]>([]);
    const [importId, setImportId] = useState<number>(0);
    const [orderDetailId, setOrderDetailId] = useState<number>(0);
    const listOrderData = useSelector((state: any) => state.listOrderData.data);
    const importShipmentData = useSelector(
        (state: any) => state.importShipmentData.data
    );
    const orderDetailData = useSelector(
        (state: any) => state.orderDetailData.data
    );
    const handleSearchOrder = () => {
        if (formData.CustomerName && formData.CustomerName.trim() !== "") {
            dispatch(
                adminListOrder({
                    pageSize: 6,
                    pageIndex: listOrderData.data.paging.pageIndex,
                    CustomerName: formData.CustomerName.trim(),
                })
            );
        }
    };
    useEffect(() => {
        dispatch(adminListOrder({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    useEffect(() => {
        if (listOrderData?.success && listOrderData.data) {
            setPagi({ ...listOrderData.data?.paging });
            setDataOrder(listOrderData?.data?.list);
            setFormData({
                ...formData,
                pageIndex: listOrderData.data?.paging.pageIndex,
                pageSize: listOrderData.data?.paging.pageSize,
            });
        }
    }, [listOrderData]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (formData) {
                dispatch(
                    adminListOrder({
                        pageSize: 6,
                        pageIndex: newPage,
                        CustomerName: formData?.CustomerName?.trim(),
                        EndDate: formData?.EndDate,
                        StartDate: formData?.StartDate,
                        Status: formData?.Status,
                    })
                );
            } else {
                dispatch(adminListOrder({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleResetOrder = () => {
        setFormData(initFormData);
        dispatch(
            adminListOrder({
                pageSize: 6,
                pageIndex: listOrderData.data.paging.pageIndex || 1,
            })
        );
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleGetOptionBySelect = async (
        option: { title: string; id: number; defaultStatus?: string },
        typeId: string
    ) => {
        if (typeId === "filterStatus") {
            setFormData({ ...formData, Status: option.title });
        } else if (option.defaultStatus === "cancelled") {
            toast.error("không thể Cập nhật đơn hàng đã hủy");
        } else if (
            (option.defaultStatus === "delivering" ||
                option.defaultStatus === "shipped") &&
            (option.title === "cancelled" || option.title === "processing")
        ) {
            toast.error(
                "không thể hủy đơn hoặc sử lí hàng đang vận chuyển hoặc đang giao hàng"
            );
        } else if (option.title && option.id > 0) {
            const res = await dispatch(
                adminUpdateStatus({
                    status: option.title,
                    orderId: option.id,
                })
            );
            try {
                if (res.payload.success) {
                    toast.success("Cập nhật status thành công");
                    dispatch(
                        adminListOrder({
                            pageIndex: pagi.pageIndex || 1,
                            pageSize: pagi.pageSize || 6,
                        })
                    );
                } else {
                    toast.error(
                        `Cập nhật status thất bại! ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        } else {
            toast.error("vui lòng chọn đúng status và order");
        }
    };
    const handleFilterProduct = () => {
        dispatch(adminListOrder(formData));
    };
    const handleUpdateOrder = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(adminGetOrderDetail(id));
            try {
                if (res.payload.success) {
                    setISUpdateOrder(true);
                    setIsImportsShipment(false);
                }
            } catch (error) {}
        }
    };
    const handleSelectImportShipment = async (
        productVersionID: number,
        detailId: number
    ) => {
        setOrderDetailId(detailId);
        if (productVersionID > 0) {
            const res = await dispatch(
                adminGetImportShipment(productVersionID)
            );
            try {
                if (res.payload.success) {
                    setISUpdateOrder(false);
                    setIsImportsShipment(true);
                }
            } catch (error) {}
        }
    };
    const handleGetOptionBySelectLab = (option: any, typeId: string) => {
        setImportId(option.id);
    };
    const handleUpdatImportsShipment = async () => {
        if (importId > 0 && orderDetailId > 0) {
            const res = await dispatch(
                adminUpdateOrderDetail({
                    orderDetailId: orderDetailId,
                    importShipmentId: importId,
                })
            );
            try {
                if (res.payload.success) {
                    setImportId(0);
                    setIsImportsShipment(false);
                    toast.success(
                        `chọn lô hàng thành công ${res.payload.message}`
                    );
                } else {
                    toast.error(
                        `thao tác thất bại vui lòng thử lại ${res.payload.message}`
                    );
                }
            } catch (error) {}
        }
    };
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-white">Orders</h1>
            <div className="rounded-lg  min-w-0 shadow-xs  bg-gray-800 mb-5">
                <div className="p-4">
                    <div>
                        <div className="flex justify-between items-center gap-4">
                            <input
                                className="flex-1 w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md  focus:bg-gray-700   border-gray-600 focus:border-gray-500 bg-gray-700"
                                type="search"
                                name="CustomerName"
                                placeholder="Search by order Name"
                                value={formData.CustomerName}
                                onChange={handleOnChange}
                            />
                            <div className="min-w-[20%]">
                                <button
                                    onClick={handleSearchOrder}
                                    className="text-gray-100 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-around gap-2 mt-4">
                            <div className="w-1/5">
                                <label className="block text-sm text-custom-addmin_color">
                                    Start Date
                                </label>
                                <input
                                    className="block w-full h-12 text-custom-addmin_color border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus: focus:bg-gray-700   border-gray-600 focus:border-gray-500 bg-gray-700"
                                    type="date"
                                    name="startDate"
                                    value={formData?.StartDate}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="w-1/5">
                                <label className="block text-sm text-custom-addmin_color">
                                    End Date
                                </label>
                                <input
                                    className="placeholder:text-custom-addmin_color text-custom-addmin_color block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus: focus:bg-gray-700   border-gray-600 focus:border-gray-500 bg-gray-700"
                                    type="date"
                                    name="EndDate"
                                    value={formData?.EndDate}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="w-1/6">
                                <label className="block text-sm text-custom-addmin_color">
                                    status
                                </label>
                                <SelecterFilter
                                    handleGetOptionBySelect={
                                        handleGetOptionBySelect
                                    }
                                    options={[
                                        {
                                            id: 1,
                                            title: "processing",
                                        },
                                        {
                                            id: 2,
                                            title: "shipped",
                                        },
                                        {
                                            id: 3,
                                            title: "delivering",
                                        },
                                        {
                                            id: 4,
                                            title: "cancelled",
                                        },
                                    ]}
                                    typeId="filterStatus"
                                    h="48px"
                                />
                            </div>
                            <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <div className="w-full mx-1">
                                    <label className="block text-sm text-custom-addmin_color">
                                        Filter
                                    </label>
                                    <button
                                        className="text-gray-100 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                        onClick={handleFilterProduct}
                                    >
                                        Filter
                                    </button>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm text-custom-addmin_color">
                                        Reset
                                    </label>
                                    <button
                                        className="align-bottom leading-5 transition-colors duration-150 font-medium  text-gray-100 focus:outline-none rounded-lg border  px-4 w-full mr-3 flex items-center justify-center cursor-pointer h-12 md:py-1 py-3 text-sm bg-gray-700"
                                        onClick={handleResetOrder}
                                    >
                                        <span className="text-gray-100">
                                            Reset
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {dataOrder?.length ? (
                <div>
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  border-gray-700 bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ID</td>
                                <td className="px-4 py-2">Customer Name</td>
                                <td className="px-4 py-2">PRICE</td>
                                <td className="px-4 py-2">ADDRESS</td>
                                <td className="px-4 py-2">PHONENUMBER</td>
                                <td className="px-4 py-2">STATUS</td>
                                <td className="px-4 py-2">ACTION</td>
                                <td className="px-4 py-2 text-right">
                                    INVOICE
                                </td>
                            </tr>
                        </thead>
                        <tbody className=" divide-y divide-gray-700 bg-gray-800 text-custom-addmin_color">
                            {dataOrder?.length &&
                                dataOrder.map((order) => (
                                    <tr
                                        key={order.orderId}
                                        className="bg-custom-addmin_bg"
                                    >
                                        <td className="px-4 py-2">
                                            <span className="font-semibold uppercase text-xs">
                                                {order.orderId}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {
                                                    order.shippingInfo
                                                        .recipientName
                                                }
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">
                                                {order.totalAmount}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {order.shippingInfo.address}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm font-semibold">
                                                {order.shippingInfo.phoneNumber}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-xs">
                                            <span className="font-serif">
                                                <span
                                                    className="text-gray-100 inline-flex px-2 text-xs font-medium leading-5 rounded-full bg-opacity-50"
                                                    style={{
                                                        backgroundColor:
                                                            order.orderStatus ===
                                                            "processing"
                                                                ? "#e4a11b"
                                                                : order.orderStatus ===
                                                                  "shipped"
                                                                ? "#14a44d"
                                                                : order.orderStatus ===
                                                                  "cancelled"
                                                                ? "#dc4c64"
                                                                : "#54d4d3",
                                                    }}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <SelecterFilter
                                                handleGetOptionBySelect={
                                                    handleGetOptionBySelect
                                                }
                                                options={
                                                    order.orderStatus ===
                                                    "cancelled"
                                                        ? [
                                                              {
                                                                  id: order.orderId,
                                                                  title: "cancelled",
                                                                  defaultStatus:
                                                                      order.orderStatus,
                                                              },
                                                          ]
                                                        : [
                                                              {
                                                                  id: order.orderId,
                                                                  title: "processing",
                                                                  defaultStatus:
                                                                      order.orderStatus,
                                                              },
                                                              {
                                                                  id: order.orderId,
                                                                  title: "shipped",
                                                                  defaultStatus:
                                                                      order.orderStatus,
                                                              },
                                                              {
                                                                  id: order.orderId,
                                                                  title: "delivering",
                                                                  defaultStatus:
                                                                      order.orderStatus,
                                                              },
                                                              {
                                                                  id: order.orderId,
                                                                  title: "cancelled",
                                                                  defaultStatus:
                                                                      order.orderStatus,
                                                              },
                                                          ]
                                                }
                                                typeId="orderAction"
                                                defaultValue={order.orderStatus}
                                            />
                                        </td>

                                        <td className="px-4 py-2 text-right flex justify-end">
                                            <div className="flex justify-between items-center">
                                                <button
                                                    onClick={() =>
                                                        router(
                                                            `/admin/order-detail/${order.orderId}`
                                                        )
                                                    }
                                                    className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
                                                >
                                                    <AiOutlinePrinter
                                                        size={22}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleUpdateOrder(
                                                            order.orderId
                                                        )
                                                    }
                                                    className="p-2 cursor-pointer hover:text-emerald-600"
                                                >
                                                    <CiEdit size={22} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {orderDetailData.success ? (
                        <CenterModal
                            show={isUpdateOrder}
                            setShow={setISUpdateOrder}
                            showModalTitle
                            modalTitle={
                                <h1 className="font-bold text-2xl text-black select-none mt-2">
                                    Thông tin sản phẩm
                                </h1>
                            }
                            // bgAll="bg-custom-addmin_bg"
                            mainContent={
                                <div className="flex gap-4 justify-start items-start p-2">
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="flex justify-between gap-4">
                                            <div className="flex flex-col gap-2 w-full">
                                                {orderDetailData?.data
                                                    ?.orderDetails?.length &&
                                                    orderDetailData?.data?.orderDetails.map(
                                                        (
                                                            orderDetail: orderDetailType
                                                        ) => (
                                                            <div className="flex w-full">
                                                                <div className="flex-1 relative">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`react-option ${orderDetail.id}`}
                                                                        value=""
                                                                        className="hidden peer"
                                                                    />
                                                                    <label
                                                                        key={
                                                                            orderDetail.id
                                                                        }
                                                                        htmlFor={`react-option ${orderDetail.id}`}
                                                                        className={`gap-2 items-center inline-flex justify-start w-full p-5 border-2  rounded-lg cursor-pointer  border-gray-700 peer-checked:border-blue-600 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 bg-gray-800hover:bg-gray-700`}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                orderDetail.imageUrl
                                                                            }
                                                                            alt=""
                                                                            className="rounded-sm h-24"
                                                                        />
                                                                        <div className="flex gap-1 font-medium flex-col">
                                                                            <span>
                                                                                Tên:
                                                                                {
                                                                                    orderDetail.productVersionName
                                                                                }
                                                                            </span>
                                                                            <span>
                                                                                số
                                                                                lượng:
                                                                                {
                                                                                    orderDetail.quantity
                                                                                }
                                                                            </span>
                                                                            {orderDetail.price ===
                                                                            orderDetail.originPrice ? (
                                                                                <span>
                                                                                    giá
                                                                                    tiền:{" "}
                                                                                    {
                                                                                        orderDetail.price
                                                                                    }
                                                                                    VNĐ
                                                                                </span>
                                                                            ) : (
                                                                                <span className="flex gap-1">
                                                                                    giá
                                                                                    tiền:
                                                                                    <span className="line-through text-custom-disable">
                                                                                        {
                                                                                            orderDetail.originPrice
                                                                                        }
                                                                                    </span>
                                                                                    <span className="text-red-500">
                                                                                        {
                                                                                            orderDetail.price
                                                                                        }
                                                                                        VNĐ
                                                                                    </span>
                                                                                </span>
                                                                            )}

                                                                            <span>
                                                                                Thành
                                                                                tiền
                                                                                :{" "}
                                                                                {
                                                                                    orderDetail.totalPrice
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </label>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleSelectImportShipment(
                                                                                orderDetail.productVersionId,
                                                                                orderDetail.id
                                                                            )
                                                                        }
                                                                        className="text-custom-Colorprimary absolute top-4 right-4"
                                                                    >
                                                                        <CiEdit
                                                                            size={
                                                                                24
                                                                            }
                                                                        />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}

                                                <>
                                                    <h1 className="font-bold text-center text-2xl text-black select-none mt-2">
                                                        Thông tin đơn hàng
                                                    </h1>
                                                    <div className="flex gap-2 items-start p-2 border">
                                                        <div className="flex flex-col gap-2 text-lg w-2/5">
                                                            <span>
                                                                Trạng thái:
                                                                {
                                                                    orderDetailData
                                                                        .data
                                                                        .orderStatus
                                                                }
                                                            </span>
                                                            <span>
                                                                Tổng tiền:
                                                                {
                                                                    orderDetailData
                                                                        .data
                                                                        .totalAmount
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col gap-2 text-lg flex-1 pl-4 border-l">
                                                            <span>
                                                                Người nhận hàng:
                                                                {
                                                                    orderDetailData
                                                                        .data
                                                                        .shippingInfo
                                                                        .recipientName
                                                                }
                                                            </span>
                                                            <span>
                                                                Số điện thoại:
                                                                {
                                                                    orderDetailData
                                                                        .data
                                                                        .shippingInfo
                                                                        .phoneNumber
                                                                }
                                                            </span>{" "}
                                                            <span>
                                                                đại chỉ:
                                                                {
                                                                    orderDetailData
                                                                        .data
                                                                        .shippingInfo
                                                                        .address
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            showButtons
                            buttonComponent={
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => {
                                            setISUpdateOrder(false);
                                        }}
                                        className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            }
                        />
                    ) : null}
                    {isImportsShipment ? (
                        <CenterModal
                            show={isImportsShipment}
                            setShow={setIsImportsShipment}
                            showModalTitle
                            modalTitle={
                                <h1 className="font-bold text-2xl text-white select-none mt-2">
                                    Chọn nhà cung cấp
                                </h1>
                            }
                            bgAll="bg-custom-addmin_bg"
                            mainContent={
                                <div className="flex gap-4 justify-start items-start p-2">
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="flex justify-between gap-4">
                                            <div className="flex flex-col gap-2 w-full">
                                                <p className="text-gray-300 text-sm text-start">
                                                    chọn tên sản phẩm cần dặt :
                                                </p>
                                                {importShipmentData.success ? (
                                                    <SelecterLab
                                                        typeId="import"
                                                        handleGetOptionBySelect={
                                                            handleGetOptionBySelectLab
                                                        }
                                                        options={
                                                            importShipmentData.data
                                                        }
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            showButtons
                            buttonComponent={
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            setIsImportsShipment(false);
                                            setISUpdateOrder(true);
                                        }}
                                        className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        onClick={handleUpdatImportsShipment}
                                        className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                                    >
                                        Hoàn tất
                                    </button>
                                </div>
                            }
                        />
                    ) : null}
                    {dataOrder && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage: pagi.pageIndex || 0,
                                totalPage: pagi.totalPages || 0,
                            }}
                            paging={pagi}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center text-xl text-white">
                    Không có order nào hợp lệ
                </div>
            )}

            <Notification />
        </div>
    );
};

export default Orders;

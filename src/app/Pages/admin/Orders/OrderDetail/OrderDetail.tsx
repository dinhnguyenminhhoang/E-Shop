import { adminGetOrderDetail } from "@/app/action/adminAction/adminOrder";
import { orderDetailsType, shippingInfoType } from "@/common/Order";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdOutlineWarningAmber } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const OrderDetail = () => {
    const param = useParams();
    const router = useNavigate();
    const dispatch = useDispatch<any>();
    const [orderDetails, setOrderDetails] = useState<orderDetailsType[]>([]);
    const [shipingInfo, setshipingInfo] = useState<shippingInfoType>();
    const orderDetailData = useSelector(
        (state: any) => state.orderDetailData.data
    );
    useEffect(() => {
        if (param?.id) {
            dispatch(adminGetOrderDetail(Number(param.id)));
        }
    }, [dispatch, param]);
    useEffect(() => {
        if (orderDetailData.success) {
            setOrderDetails(orderDetailData?.data?.orderDetails);
            setshipingInfo(orderDetailData?.data?.shippingInfo);
        }
    }, [orderDetailData]);
    return (
        <div className="flex justify-center items-center bg-white flex-col gap-6 mb-10">
            <div className="min-h-[60px] w-full bg-custom-primary flex items-center px-8">
                <button
                    onClick={() => window.history.back()}
                    className="text-white"
                >
                    <MdArrowBackIosNew size={28} />
                </button>
                <span className="text-white text-2xl font-bold text-center align-middle w-full">{`#order ${param.id}`}</span>
            </div>

            <div className="flex flex-col gap-6 items-center">
                <span className="text-4xl font-bold text-black">
                    PHIẾU ĐƠN HÀNG
                </span>
                <div className="px-4 pt-8 border p-4">
                    <div className="flex flex-col gap-2 mb-4 pb-2 border-b border-[#ccc]">
                        <span className="text-xl font-bold text-black">
                            Thông tin khách hàng :
                        </span>
                        <span className="capitalize">
                            Tên người nhận: {shipingInfo?.recipientName}
                        </span>
                        <span className="capitalize">
                            Số điện thoại: {shipingInfo?.phoneNumber}
                        </span>
                        <span className="capitalize">
                            Địa chỉ: {shipingInfo?.address}
                        </span>
                    </div>
                    <div className="pt-2 pb-4 mb-2 border-b flex items-center gap-2">
                        <span className="text-xl font-bold text-black">
                            Trạng thái :
                        </span>
                        <span className="font-bold text-xs px-2 py-1 border border-custom-primary text-custom-primary rounded-md">
                            {orderDetailData?.data?.orderStatus}
                        </span>
                    </div>
                    <span className="text-xl font-bold text-black">
                        sản phẩm được chọn :
                    </span>
                    <div className="mt-8 space-y-3 rounded-lg bg-white px-2 py-4 sm:px-6">
                        {orderDetails?.length &&
                            orderDetails.map((order, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col rounded-lg bg-white sm:flex-row border-b last:border-none border-[#ccc]"
                                >
                                    <img
                                        className="m-2 h-24 w-28 p-2 rounded-md border object-contain"
                                        src={order.imageUrl}
                                        alt=""
                                    />
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="float-right text-gray-400 capitalize">
                                            tên sản phẩm:
                                            {order.productVersionName}
                                        </span>
                                        <span className="font-semibold capitalize">
                                            giá: {order.price}
                                        </span>
                                        <p className="text-lg font-bold capitalize">
                                            số lượng :{order.quantity}
                                        </p>
                                        <p className="text-lg font-bold capitalize">
                                            thành tiền:
                                            {order.totalPrice}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div>
                        <button
                            onClick={() => window.print()}
                            className="w-full text-center text-xl font-medium border-2 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200"
                        >
                            In Phiếu Hàng
                        </button>
                        <div className="flex gap-2 mt-4 items-center text-sm text-custom-disable">
                            <MdOutlineWarningAmber size={18} />
                            <span>
                                Vui lòng không in khi đang sử dụng điện thoại để
                                đăng nhập
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;

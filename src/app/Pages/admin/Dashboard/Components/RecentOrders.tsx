import { getOrderRecent } from "@/app/action/adminAction/adminDashboard";
import { orderRecentType } from "@/common/Order";
import { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleFomatDate } from "../Common/Utils";
import DropDownDateRange, { DateRangeType } from "./DropDownDateRange";
const initFormParam = {
    StartDate: "",
    EndDate: "",
};
const RecentOrders = () => {
    const router = useNavigate();
    const [formParam, setFormParam] =
        useState<typeof initFormParam>(initFormParam);
    const dispatch = useDispatch<any>();
    const orderRecentData = useSelector(
        (state: any) => state.orderRecentData.data
    );
    useEffect(() => {
        dispatch(getOrderRecent({ Limit: 10 }));
    }, [dispatch]);
    useEffect(() => {
        if (formParam.StartDate !== "" && formParam.EndDate !== "") {
            dispatch(
                getOrderRecent({
                    Limit: 10,
                    StartDate: formParam.StartDate,
                    EndDate: formParam.EndDate,
                })
            );
        }
    }, [formParam, dispatch]);
    const onChanged = (dateRage: DateRangeType) => {
        if (dateRage.startDate && dateRage.endDate) {
            const startDate = handleFomatDate(dateRage.startDate);
            const endDate = handleFomatDate(dateRage.endDate);
            setFormParam({ EndDate: endDate, StartDate: startDate });
        }
    };
    const handleDate = (time: string) => {
        const date = new Date(time);
        return `${
            date.getDay() + 1
        } / ${date.getMonth()} / ${date.getFullYear()}`;
    };
    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Recent Order
                </h1>
                <div className="flex gap-1 items-center">
                    <DropDownDateRange onChanged={onChanged} />
                    <button
                        onClick={() => dispatch(getOrderRecent({ Limit: 10 }))}
                        className="border px-2 rounded-md text-lg text-white"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2 mb-2"></div>
            <div className="overflow-auto">
                {orderRecentData &&
                orderRecentData?.success &&
                orderRecentData?.data?.length > 0 ? (
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b  border-gray-700 text-gray-400bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ORDER ID</td>
                                <td className="px-4 py-2">ORDER DATE</td>
                                <td className="px-4 py-2">CUSTOMER</td>
                                <td className="px-4 py-2">AMOUNT</td>
                                <td className="px-4 py-2">STATUS</td>
                                <td className="px-4 py-2 text-right">
                                    INVOICE
                                </td>
                            </tr>
                        </thead>
                        <tbody className="divide-y  divide-gray-700 bg-gray-800 text-gray-400">
                            {orderRecentData?.data &&
                                orderRecentData.data?.map(
                                    (orderRecent: orderRecentType) => (
                                        <tr
                                            className="bg-custom-addmin_bg"
                                            key={orderRecent.id}
                                        >
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold uppercase">
                                                    #{orderRecent.id}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm">
                                                    {handleDate(
                                                        orderRecent.date
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full overflow-hidden h-7 w-7">
                                                        <img
                                                            src={
                                                                orderRecent.customerAvatarUrl
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="text-sm">
                                                        {
                                                            orderRecent.customerName
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {orderRecent.totalPrice} VND
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-xs">
                                                <span className="font-serif">
                                                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-white bg-yellow-600">
                                                        {orderRecent.status}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-end">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                router(
                                                                    `/admin/order-detail/${orderRecent.id}`
                                                                )
                                                            }
                                                        >
                                                            <AiOutlinePrinter
                                                                size={22}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="flex justify-center items-center text-white">
                        Không có sản phẩm nào
                    </h1>
                )}
            </div>
        </div>
    );
};

export default RecentOrders;

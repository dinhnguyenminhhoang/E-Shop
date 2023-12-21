import { FaRegStar } from "react-icons/fa";
import DropDownDateRange, { DateRangeType } from "./DropDownDateRange";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductSeling } from "@/app/action/adminAction/adminDashboard";
import { productSeling } from "@/common/product";
import { handleFomatDate } from "../Common/Utils";
const initFormParam = {
    StartDate: "",
    EndDate: "",
};
const BestSellingProducts = () => {
    const [formParam, setFormParam] =
        useState<typeof initFormParam>(initFormParam);
    const dispatch = useDispatch<any>();
    const productSelingData = useSelector(
        (state: any) => state.productSelingData.data
    );
    useEffect(() => {
        dispatch(getProductSeling({ Limit: 10 }));
    }, [dispatch]);
    useEffect(() => {
        if (formParam.StartDate !== "" && formParam.EndDate !== "") {
            dispatch(
                getProductSeling({
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
    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Best Selling Products
                </h1>
                <div className="flex gap-1 items-center">
                    <DropDownDateRange onChanged={onChanged} />
                    <button
                        onClick={() =>
                            dispatch(getProductSeling({ Limit: 10 }))
                        }
                        className="border px-2 rounded-md text-lg text-white"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2 mb-2"></div>
            <div className="overflow-auto">
                {productSelingData &&
                productSelingData?.success &&
                productSelingData?.data?.length > 0 ? (
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700  text-gray-400 bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">PRODUCT</td>
                                <td className="px-4 py-2">PRICE</td>
                                <td className="px-4 py-2">QUANTITY SOLD</td>
                                <td className="px-4 py-2">INVENTORY</td>
                                <td className="px-4 py-2">RATING</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-400">
                            {productSelingData?.data &&
                                productSelingData.data?.map(
                                    (productSealing: productSeling) => (
                                        <tr
                                            className="bg-custom-addmin_bg"
                                            key={productSealing.id}
                                        >
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-md overflow-hidden h-9 w-9">
                                                        <img
                                                            src={
                                                                productSealing.imageUrl
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="text-sm">
                                                        {productSealing.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm">
                                                    {productSealing.price} VND
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-xs text-center">
                                                <span className="text-sm font-semibold">
                                                    {
                                                        productSealing.inventoryDto
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {productSealing.totalQuantitySold <=
                                                0 ? (
                                                    <span className="bg-red-100 text-red-800 text-xs text-center font-medium me-2 px-2 py-0.5 rounded border border-red-400">
                                                        Out of stock
                                                    </span>
                                                ) : (
                                                    <span className="text-sm font-semibold">
                                                        {
                                                            productSealing.totalQuantitySold
                                                        }
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex gap-1">
                                                    <FaRegStar color="#f6b749" />
                                                    <span className="text-sm font-semibold">
                                                        {productSealing.rating}{" "}
                                                        (
                                                        {
                                                            productSealing.rattingAmount
                                                        }{" "}
                                                        vote)
                                                    </span>
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

export default BestSellingProducts;

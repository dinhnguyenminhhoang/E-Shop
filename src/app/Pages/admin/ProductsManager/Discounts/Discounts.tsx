import Notification from "@/Components/PageLoader/Notification";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit, CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    adminDeleteDiscount,
    getAllDiscount,
} from "@/app/action/adminAction/adminDiscount";
import Paginations from "@/Components/Paginations/Paginations";
import { pagingType } from "@/common/paging";
import { adminDiscountType, discounttype } from "@/common/discount";
import { getDisscountType } from "@/common/getAllType";
import { toast } from "react-toastify";
import DiscountModal from "@/Components/Modal/DiscountModal/DiscountModal";
const Discounts = () => {
    const dispatch = useDispatch<any>();
    const allDiscountData = useSelector(
        (state: any) => state.allDiscountData.data
    );
    const [paging, setPaging] = useState<pagingType>();
    const [discount, setDiscount] = useState<adminDiscountType[]>();
    const [updateDiscont, setUpdateDiscont] = useState<boolean>(false);
    const [dataUpdateDiscont, setDataUpdateDiscont] = useState<discounttype>();
    const [formParam, setFormParam] = useState<getDisscountType>({
        pageIndex: 1,
        pageSize: 6,
    });
    useEffect(() => {
        dispatch(getAllDiscount({ pageIndex: 1, pageSize: 6 }));
    }, [dispatch]);
    useEffect(() => {
        if (allDiscountData.success) {
            setDiscount(allDiscountData?.data?.list);
            setPaging(allDiscountData?.data?.paging);
        }
    }, [allDiscountData]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (formParam?.ProductName && formParam.ProductName.trim() !== "") {
                dispatch(
                    getAllDiscount({
                        pageSize: 6,
                        pageIndex: newPage,
                        ProductName: formParam.ProductName.trim(),
                    })
                );
            } else {
                dispatch(getAllDiscount({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleDate = (time: string) => {
        const date = new Date(time);
        return `${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}`;
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormParam({ ...formParam, [e.target.name]: e.target.value });
    };
    const handleSearhDiscount = () => {
        if (formParam.ProductName && formParam.ProductName.trim() !== "") {
            dispatch(
                getAllDiscount({
                    pageSize: paging?.pageSize || 6,
                    pageIndex: paging?.pageIndex || 1,
                    ProductName: formParam.ProductName.trim(),
                })
            );
        }
    };
    const handleResetSearchDiscount = () => {
        setFormParam({ ...formParam, ProductName: "" });
        dispatch(
            getAllDiscount({
                pageSize: paging?.pageSize || 6,
                pageIndex: paging?.pageIndex || 1,
            })
        );
    };
    const handleDeleteDiscount = async (id: number) => {
        const response = await dispatch(adminDeleteDiscount(id));

        if (response.payload?.success) {
            toast.success(
                "xóa giảm giá thành công! vui lòng xem lại danh sách"
            );
            dispatch(
                getAllDiscount({
                    pageSize: paging?.pageSize || 6,
                    pageIndex: paging?.pageIndex || 1,
                    ProductName: formParam?.ProductName,
                })
            );
        } else {
            toast.error(
                "xóa giảm giá thất bại! vui lòng kiểm tra lại dánh sách giảm giá"
            );
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
                                        onClick={handleSearhDiscount}
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
                                        className="disabled:bg-custom-disable disabled:border-custom-disable align-bottom leading-5 transition-colors duration-150 font-medium   text-gray-400 focus:outline-none rounded-lg border  border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm bg-gray-700"
                                        onClick={handleResetSearchDiscount}
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
            {discount?.length ? (
                <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                    <div className="w-full overflow-hidden border  border-gray-700 rounded-lg rounded-b-lg">
                        <table className="w-full whitespace-nowrap">
                            <thead className="text-xs font-semibold tracking-wide text-left  uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                <tr>
                                    <td className="px-4 py-2">ID</td>
                                    <td className="px-4 py-2">
                                        SẢN PHẨM GIẢM GIÁ
                                    </td>
                                    <td className="px-4 py-2">SỐ LƯỢNG</td>
                                    <td className="px-4 py-2">NGÀY BẮT ĐẦU</td>
                                    <td className="px-4 py-2">NGÀY KẾT THÚC</td>
                                    <td className="px-4 py-2">trạng thái</td>
                                    <td className="px-4 py-2">
                                        PHẦN TRĂM GIẢM GIÁ
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        ACTION
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-400">
                                {discount?.length &&
                                    discount.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-2">
                                                <span className="text-sm">
                                                    {item.id}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {item.productName}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {handleDate(item.startDate)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {handleDate(item.endDate)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                {(
                                                    Number(
                                                        item.discountPercent
                                                    ) * 100
                                                ).toFixed(2)}{" "}
                                                %
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {item.active
                                                        ? "Hoạt động"
                                                        : "Không hoạt động"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-end text-right">
                                                    <button
                                                        onClick={() => {
                                                            setUpdateDiscont(
                                                                true
                                                            );
                                                            setDataUpdateDiscont(
                                                                item
                                                            );
                                                        }}
                                                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                                    >
                                                        <CiEdit size={22} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteDiscount(
                                                                item.id
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
                        {allDiscountData && paging && (
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
                    {updateDiscont && paging ? (
                        <DiscountModal
                            show={updateDiscont}
                            setShow={setUpdateDiscont}
                            data={dataUpdateDiscont}
                            pagin={paging}
                        />
                    ) : null}
                    <Notification />
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có giảm giá nào hợp lệ
                </div>
            )}
        </div>
    );
};

export default Discounts;

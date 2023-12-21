import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import {
    adminCreateDiscount,
    adminUpdateDiscount,
    getAllDiscount,
} from "@/app/action/adminAction/adminDiscount";
import { discounttype } from "@/common/discount";
import { pagingType } from "@/common/paging";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
interface DiscountModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
    data?: discounttype;
    pagin: pagingType;
    type?: string;
    idProduct?: number;
}
const initFormData = {
    productId: 0,
    discountPercent: 0,
    startDate: "",
    endDate: "",
    quantity: 0,
    active: false,
};
const DiscountModal: React.FC<DiscountModalProps> = ({
    show,
    setShow,
    data,
    pagin,
    type,
    idProduct,
}) => {
    const dispatch = useDispatch<any>();
    const [formData, setFormData] = useState<discounttype>(
        data || initFormData
    );
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "discountPercent" && parseFloat(value) > 1) {
            toast.warning("vui lòng nhập giá trị giảm giá dưới 1");
            return;
        }

        setFormData({ ...formData, [name]: value });
    };
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        setFormData({
            ...formData,
            [typeId]: option.id,
        });
    };
    const handleAddNewOrUpdateDiscount = async () => {
        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            toast.warning(
                "vui lòng nhập thời gian kết thúc lơn hơn thời gian bắt dầu"
            );
            setFormData({ ...formData, endDate: "" });
            return;
        } else if (!type) {
            const res = await dispatch(adminUpdateDiscount(formData));
            try {
                if (res.payload.success) {
                    toast.success("Cập nhật giảm giá thành công");
                    setFormData(initFormData);
                    dispatch(
                        getAllDiscount({
                            pageIndex: pagin.pageIndex || 1,
                            pageSize: pagin.pageSize || 6,
                        })
                    );
                    setShow(false);
                } else {
                    toast.success(
                        `Cập nhật giảm giá thất bại : ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error("lỗi máy chủ vui lòng quay lại sau");
            }
        } else if (idProduct) {
            const res = await dispatch(
                adminCreateDiscount({ ...formData, productId: idProduct || 0 })
            );
            try {
                if (res.payload.success) {
                    toast.success(`tạo giảm giá thành công`);
                    setFormData(initFormData);
                    dispatch(
                        getAllDiscount({
                            pageIndex: pagin.pageIndex || 1,
                            pageSize: pagin.pageSize || 6,
                        })
                    );
                    setShow(false);
                } else {
                    toast.error(`tạo giảm giá thất bại ${res.payload.message}`);
                }
            } catch (error) {
                toast.error("lỗi máy chủ vui lòng quay lại sau");
            }
        }
    };
    return (
        <CenterModal
            bgAll="bg-custom-addmin_bg"
            show={show}
            setShow={setShow}
            mainContent={
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-4">
                        <div className="w-1/2">
                            <p className="text-gray-300 text-sm text-start capitalize">
                                phầm năm giảm giá:
                            </p>
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px]"
                                type="text"
                                value={formData.discountPercent}
                                name="discountPercent"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập  phầm năm giảm giá"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-300 text-sm text-start capitalize">
                                số lượng :
                            </p>
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px]"
                                type="number"
                                value={formData.quantity}
                                name="quantity"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập số lượng giảm giá"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="w-1/2">
                            <p className="text-gray-300 text-sm text-start capitalize">
                                ngày bắt đầu:
                            </p>
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px]"
                                type="date"
                                value={formData.startDate.split("T")[0]}
                                name="startDate"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập ngày bắt đầu"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-300 text-sm text-start capitalize">
                                ngày kết thúc:
                            </p>
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px]"
                                type="date"
                                value={formData.endDate.split("T")[0]}
                                name="endDate"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập ngày kết thúc"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="w-full">
                            <p className="text-gray-300 text-sm text-start capitalize">
                                kích hoạt:
                            </p>
                            <SelecterLab
                                options={[
                                    { id: true, title: "đang kích hoạt" },
                                    { id: false, title: "ngừng kích hoạt" },
                                ]}
                                handleGetOptionBySelect={
                                    handleGetOptionBySelect
                                }
                                typeId="active"
                                valueUpdate={
                                    formData.active
                                        ? ["đang kích hoạt"]
                                        : ["ngừng kích hoạt"]
                                }
                            />
                        </div>
                    </div>
                </div>
            }
            showModalTitle
            modalTitle={
                <h1 className="font-bold text-2xl text-white">
                    {type ? "Tạo mã giảm giá" : "Chỉnh sửa giảm giá"}
                </h1>
            }
            showButtons
            buttonComponent={
                <div className="flex gap-2 justify-center mb-2">
                    <button
                        onClick={handleAddNewOrUpdateDiscount}
                        className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                    >
                        {type ? "Tạo mới" : "Chỉnh sửa"}
                    </button>

                    <button
                        onClick={() => {
                            setFormData(initFormData);
                            setShow(false);
                        }}
                        className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                    >
                        Đóng
                    </button>
                </div>
            }
        />
    );
};

export default DiscountModal;

import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import UploadImg from "@/Components/UploadImg/UploadImg";
import { setImgUrl } from "@/app/Slices/user/UploadSlice";
import {
    adminCreateCustomer,
    adminUpdateCustomer,
    getListCustomer,
} from "@/app/action/adminAction/adminCustomer";
import { profileType } from "@/common/user";
import React, { Fragment, useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface AddAndUpdateCustomerProps {
    isNewCustomer: boolean;
    setIsNewCustomer: (isShow: boolean) => void;
    setCustomerDataUpdate: (data: profileType) => void;
    customerDataUpdate?: profileType;
}
const initFormData = {
    firstName: "",
    lastName: "",
    dayOfBirth: "",
    email: "",
    phoneNumber: "",
    password: "",
    avatarUrl: "https://i.imgur.com/Th0n214.jpg",
    gender: false,
};
const AddAndUpdateCustomer: React.FC<AddAndUpdateCustomerProps> = ({
    isNewCustomer,
    setIsNewCustomer,
    customerDataUpdate,
    setCustomerDataUpdate,
}) => {
    const dispatch = useDispatch<any>();
    const listRolesAdmin = useSelector(
        (state: any) => state.listRolesAdmin.data
    );
    const uploadFileData = useSelector(
        (state: any) => state.uploadFileData.imgUrl
    );
    const [formData, setFormData] = useState<profileType>(initFormData);
    const [listError, setListError] = useState({ Email: [] });
    const [typePassword, setTypePassword] = useState(true);
    const [isCreateAddress, setIsCreateAddress] = useState(false);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        if (customerDataUpdate?.id) {
            setFormData(customerDataUpdate);
        }
    }, [customerDataUpdate]);
    useEffect(() => {
        if (uploadFileData !== "") {
            setFormData({ ...formData, avatarUrl: uploadFileData });
        }
    }, [uploadFileData]);
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        if (typeId === "gender") {
            setFormData({
                ...formData,
                [typeId]: option.id === 1 ? true : false,
            });
        } else {
            setFormData({
                ...formData,
                [typeId]: option.id,
            });
        }
    };
    const handleAddNewOrUpdateCustomer = async () => {
        if (
            formData.avatarUrl !== "" &&
            formData.avatarUrl.trim() !== "" &&
            formData.email !== "" &&
            formData.email.trim() !== "" &&
            formData.firstName !== "" &&
            formData.firstName.trim() !== "" &&
            formData.lastName !== "" &&
            formData.lastName.trim() !== "" &&
            formData.phoneNumber !== "" &&
            formData.phoneNumber.trim() !== "" &&
            formData.password !== "" &&
            formData?.password?.trim() !== ""
        ) {
            if (!customerDataUpdate?.id) {
                const response = await dispatch(adminCreateCustomer(formData));
                if (response.payload?.success) {
                    toast.success("tạo nhân viên thành công");
                    setFormData(initFormData);
                    setIsNewCustomer(false);
                    await dispatch(
                        getListCustomer({ pageIndex: 1, pageSize: 6 })
                    );
                    dispatch(setImgUrl(""));
                } else {
                    toast.error(
                        response.payload.message ||
                            "Có lỗi xảy ra, vui lòng kiểm tra lại"
                    );
                }
            } else {
                const response = await dispatch(
                    adminUpdateCustomer({
                        ...formData,
                        id: formData.id,
                    })
                );

                if (response.payload?.success) {
                    toast.success("Cập nhật nhân viên thành công");
                    setFormData(initFormData);
                    setIsNewCustomer(false);
                    await dispatch(
                        getListCustomer({ pageIndex: 1, pageSize: 10 })
                    );
                    dispatch(setImgUrl(""));
                } else {
                    toast.error(
                        response.payload.message ||
                            "Có lỗi xảy ra, vui lòng kiểm tra lại"
                    );
                }
            }
        } else {
            toast.error("vui lòng xem lại thông tin");
            setIsCreateAddress(false);
        }
    };
    const handleShowModal = () => {
        setFormData(initFormData);
        setIsNewCustomer(false);
        setCustomerDataUpdate(initFormData);
        if (uploadFileData !== "") {
            dispatch(setImgUrl(""));
        }
    };
    return (
        <Fragment>
            {isNewCustomer && !isCreateAddress ? (
                <CenterModal
                    show={isNewCustomer}
                    setShow={handleShowModal}
                    showModalTitle={true}
                    modalTitle={
                        <h1 className="font-bold text-2xl text-white select-none mt-2">
                            {!customerDataUpdate?.id
                                ? "Thêm khách hàng mới"
                                : "Chỉnh sửa khách hàng"}
                        </h1>
                    }
                    mainContent={
                        <div className="flex gap-4 justify-start items-start p-2">
                            <div className="flex flex-col gap-6 w-full">
                                <UploadImg imgUrl={formData.avatarUrl} />
                                <div className="flex justify-between gap-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start">
                                            firstName:
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="text"
                                            value={formData.firstName}
                                            name="firstName"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChange(e)}
                                            placeholder="nhập họ và tên lót"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm text-start">
                                            lastName :
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="text"
                                            value={formData.lastName}
                                            name="lastName"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChange(e)}
                                            placeholder="nhập tên"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start">
                                            email:
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="email"
                                            value={formData.email}
                                            name="email"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChange(e)}
                                            placeholder="nhập email"
                                        />
                                        {listError.Email?.length ? (
                                            <p className="text-custom-Colorprimary text-sm text-start mt-1">
                                                vui lòng nhập đúng địa chỉ email
                                                (*)
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm text-start">
                                            chọn giới tính :
                                        </p>
                                        <SelecterLab
                                            options={[
                                                {
                                                    id: 1,
                                                    title: "nam",
                                                },
                                                {
                                                    id: 2,
                                                    title: "nữ",
                                                },
                                            ]}
                                            handleGetOptionBySelect={
                                                handleGetOptionBySelect
                                            }
                                            typeId="gender"
                                            valueUpdate={
                                                formData.gender
                                                    ? ["nam"]
                                                    : ["nữ"]
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start">
                                            password:
                                        </p>
                                        <div className="relative">
                                            <input
                                                className="w-full h-[48px] px-2 rounded-[8px] outline-none"
                                                type={
                                                    typePassword
                                                        ? "password"
                                                        : "text"
                                                }
                                                value={formData.password}
                                                name="password"
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => handleOnChange(e)}
                                                placeholder="nhập password"
                                            />

                                            {typePassword ? (
                                                <button
                                                    onClick={() =>
                                                        setTypePassword(false)
                                                    }
                                                    className="absolute top-1/2 -translate-y-1/2 right-3"
                                                >
                                                    <MdOutlineRemoveRedEye
                                                        size={18}
                                                    />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        setTypePassword(true)
                                                    }
                                                    className="absolute top-1/2 -translate-y-1/2 right-3"
                                                >
                                                    <FaRegEyeSlash size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm text-start">
                                            phoneNumber :
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="text"
                                            value={formData.phoneNumber}
                                            name="phoneNumber"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChange(e)}
                                            placeholder="nhập số điện thoại"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <div className="w-full">
                                        <p className="text-gray-300 text-sm text-start">
                                            birthday:
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="date"
                                            value={
                                                formData.dayOfBirth?.split(
                                                    "T"
                                                )[0]
                                            }
                                            name="dayOfBirth"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChange(e)}
                                            placeholder="birthday"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    bgAll="bg-custom-addmin_bg"
                    showButtons={true}
                    buttonComponent={
                        <div className="flex gap-2 justify-center mb-2">
                            {
                                <button
                                    onClick={handleAddNewOrUpdateCustomer}
                                    className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                                >
                                    Hoàn tất
                                </button>
                            }
                            <button
                                onClick={handleShowModal}
                                className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                            >
                                Đóng
                            </button>
                        </div>
                    }
                />
            ) : null}
        </Fragment>
    );
};

export default AddAndUpdateCustomer;

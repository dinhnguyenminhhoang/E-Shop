import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import UploadImg from "@/Components/UploadImg/UploadImg";
import { setImgUrl } from "@/app/Slices/user/UploadSlice";
import {
    adminAllEmployees,
    adminCreateEmployee,
    adminGetEmployeeById,
    adminUpdateEmployee,
} from "@/app/action/adminAction/adminEmployees";
import { emlpoyeeAddress, employeeType } from "@/common/employee";
import { Fragment, useEffect, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface AddAndUpdateEmployeeProps {
    isNewEmployee: boolean;
    setIsNewEmployee: (isShow: boolean) => void;
    setEmployeeIdUpdate: (id: number | null) => void;
    employeeIdUpdate?: number | null;
}
const initFormData = {
    firstName: "",
    lastName: "",
    gender: true,
    dayOfBirth: "",
    email: "",
    phoneNumber: "",
    password: "",
    avatarUrl: "https://i.imgur.com/Th0n214.jpg",
    active: true,
    roleId: -1,
};
const initFormDataAddress = {
    specificAddress: "",
    wards: "",
    districts: "",
    province: "",
};
const AddAndUpdateEmployee: React.FC<AddAndUpdateEmployeeProps> = ({
    isNewEmployee,
    setIsNewEmployee,
    employeeIdUpdate,
    setEmployeeIdUpdate,
}) => {
    const dispatch = useDispatch<any>();
    const adminRole = useSelector(
        (state: any) => state.adminRole.allRoles
    ) as [];
    const listRolesAdmin = useSelector(
        (state: any) => state.listRolesAdmin.data
    );
    const adminGetEmployeeByIdData = useSelector(
        (state: any) => state.adminGetEmployeeByIdData.data
    ) as { data?: employeeType; success: boolean };
    const uploadFileData = useSelector(
        (state: any) => state.uploadFileData.imgUrl
    );
    const [formData, setFormData] = useState<employeeType>(initFormData);
    const [optionRoles, setOptionRoles] = useState<{}[]>();
    const [listError, setListError] = useState({ Email: [] });
    const [formDataAddress, setFormDataAddress] =
        useState<emlpoyeeAddress>(initFormDataAddress);
    const [typePassword, setTypePassword] = useState(true);
    const [isCreateAddress, setIsCreateAddress] = useState(false);
    useEffect(() => {
        if (uploadFileData !== "") {
            setFormData({ ...formData, avatarUrl: uploadFileData });
        }
    }, [uploadFileData]);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleOnChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataAddress({
            ...formDataAddress,
            [e.target.name]: e.target.value,
        });
    };
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
    const handleAddNewOrUpdateEmployee = async () => {
        const cpFormData = {
            ...formData,
            address: { ...formDataAddress },
        } as employeeType;
        if (
            cpFormData.avatarUrl !== "" &&
            cpFormData.avatarUrl.trim() !== "" &&
            cpFormData.dayOfBirth !== "" &&
            cpFormData.dayOfBirth.trim() !== "" &&
            cpFormData.email !== "" &&
            cpFormData.email.trim() !== "" &&
            cpFormData.firstName !== "" &&
            cpFormData.firstName.trim() !== "" &&
            cpFormData.lastName !== "" &&
            cpFormData.lastName.trim() !== "" &&
            cpFormData.phoneNumber !== "" &&
            cpFormData.phoneNumber.trim() !== "" &&
            cpFormData.password !== "" &&
            cpFormData.password.trim() !== "" &&
            cpFormData.address?.districts !== "" &&
            cpFormData.address?.districts.trim() !== "" &&
            cpFormData.address?.province !== "" &&
            cpFormData.address?.province.trim() !== "" &&
            cpFormData.address?.specificAddress !== "" &&
            cpFormData.address?.specificAddress.trim() !== "" &&
            cpFormData.address?.wards !== "" &&
            cpFormData.address?.wards.trim() !== ""
        ) {
            if (employeeIdUpdate === null) {
                const response = await dispatch(
                    adminCreateEmployee(cpFormData)
                );

                if (response.payload?.success) {
                    toast.success("Tạo nhân viên thành công");
                    setFormData(initFormData);
                    setFormDataAddress(initFormDataAddress);
                    setIsNewEmployee(false);
                    await dispatch(
                        adminAllEmployees({ pageIndex: 1, pageSize: 10 })
                    );
                    if (uploadFileData) {
                        dispatch(setImgUrl(""));
                    }
                } else {
                    toast.error(
                        response.payload.message ||
                            "Có lỗi xảy ra, vui lòng kiểm tra lại"
                    );
                }
            } else {
                const response = await dispatch(
                    adminUpdateEmployee({ ...cpFormData, id: employeeIdUpdate })
                );

                if (response.payload?.success) {
                    toast.success("Cập nhật nhân viên thành công");
                    setFormData(initFormData);
                    setFormDataAddress(initFormDataAddress);
                    setIsNewEmployee(false);
                    await dispatch(
                        adminAllEmployees({ pageIndex: 1, pageSize: 10 })
                    );
                    if (uploadFileData) {
                        dispatch(setImgUrl(""));
                    }
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
    useEffect(() => {
        if (listRolesAdmin?.success && listRolesAdmin?.data?.list) {
            setOptionRoles(listRolesAdmin.data?.list);
        }
    }, [listRolesAdmin]);
    useEffect(() => {
        if (employeeIdUpdate) {
            dispatch(adminGetEmployeeById(employeeIdUpdate));
        }
    }, [dispatch, employeeIdUpdate]);
    useEffect(() => {
        if (
            adminGetEmployeeByIdData.success &&
            adminGetEmployeeByIdData.data?.address &&
            employeeIdUpdate !== null
        ) {
            setFormData({
                ...adminGetEmployeeByIdData.data,
                password: "",
            });
            setFormDataAddress({ ...adminGetEmployeeByIdData.data.address });
        }
    }, [adminGetEmployeeByIdData, employeeIdUpdate]);
    const handleShowModal = () => {
        setFormData(initFormData);
        setFormDataAddress(initFormDataAddress);
        setIsNewEmployee(false);
        if (setEmployeeIdUpdate) {
            setEmployeeIdUpdate(null);
        }
        if (uploadFileData) {
            dispatch(setImgUrl(""));
        }
    };
    return (
        <Fragment>
            {isNewEmployee && !isCreateAddress ? (
                <CenterModal
                    show={isNewEmployee}
                    setShow={handleShowModal}
                    showModalTitle={true}
                    modalTitle={
                        <h1 className="font-bold text-2xl text-white select-none mt-2">
                            {!employeeIdUpdate
                                ? "Thêm nhân viên mới"
                                : "Chỉnh sửa nhân viên mới"}
                        </h1>
                    }
                    mainContent={
                        <div className="flex gap-4 justify-start items-start p-2">
                            <div className="flex flex-col gap-6 w-full">
                                <UploadImg imgUrl={formData.avatarUrl} />

                                <div className="flex justify-between gap-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            firstName :
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
                                        <p className="text-gray-300 text-sm text-start capitalize">
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
                                        <p className="text-gray-300 text-sm text-start capitalize">
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
                                        <p className="text-gray-300 text-sm text-start capitalize">
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
                                        <p className="text-gray-300 text-sm text-start capitalize">
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
                                        <p className="text-gray-300 text-sm text-start capitalize">
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
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            birthday:
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="date"
                                            value={formData.dayOfBirth}
                                            name="dayOfBirth"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChange(e)}
                                            placeholder="birthday"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            chọn quyền hạng :
                                        </p>
                                        {adminRole && optionRoles?.length ? (
                                            <SelecterLab
                                                options={optionRoles}
                                                handleGetOptionBySelect={
                                                    handleGetOptionBySelect
                                                }
                                                typeId="roleId"
                                                valueUpdateOj={
                                                    formData.roleId > 0
                                                        ? formData
                                                        : undefined
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    bgAll="bg-custom-addmin_bg"
                    showButtons={true}
                    buttonComponent={
                        <div className="flex gap-2 justify-center mb-2">
                            <button
                                onClick={() => {
                                    setIsCreateAddress(true);
                                }}
                                className="px-4 py-2 border-b-4 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-200"
                            >
                                {employeeIdUpdate
                                    ? "Cập nhật đỉa chỉ"
                                    : "tới nhập đỉa chỉ"}
                            </button>
                            {employeeIdUpdate && (
                                <button
                                    onClick={handleAddNewOrUpdateEmployee}
                                    className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                                >
                                    Hoàn tất
                                </button>
                            )}
                            <button
                                onClick={handleShowModal}
                                className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                            >
                                Đóng
                            </button>
                        </div>
                    }
                />
            ) : (
                <CenterModal
                    show={isCreateAddress}
                    setShow={setIsCreateAddress}
                    showModalTitle={true}
                    modalTitle={
                        <h1 className="font-bold text-2xl text-white select-none mt-2">
                            Tạo địa chỉ mới
                        </h1>
                    }
                    mainContent={
                        <div className="flex gap-4 justify-start items-start p-2">
                            <div className="flex flex-col gap-6 w-full">
                                <div className="flex justify-between gap-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            districts:
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="text"
                                            value={formDataAddress.districts}
                                            name="districts"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChangeAddress(e)}
                                            placeholder="nhập districts"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            province :
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="text"
                                            value={formDataAddress.province}
                                            name="province"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChangeAddress(e)}
                                            placeholder="nhập province"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <div className="w-1/2">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            specificAddress:
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="text"
                                            value={
                                                formDataAddress.specificAddress
                                            }
                                            name="specificAddress"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChangeAddress(e)}
                                            placeholder="nhập specificAddress"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 text-sm text-start capitalize">
                                            wards :
                                        </p>
                                        <input
                                            className="w-full h-[48px] px-2 rounded-[8px]"
                                            type="text"
                                            value={formDataAddress.wards}
                                            name="wards"
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => handleOnChangeAddress(e)}
                                            placeholder="nhập wards"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    bgAll="bg-custom-addmin_bg"
                    showButtons={true}
                    buttonComponent={
                        <div className="flex gap-2 justify-center mb-2 pt-2">
                            <button
                                onClick={() => {
                                    setIsCreateAddress(false);
                                }}
                                className="px-4 py-2 border-b-4 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-200"
                            >
                                qua trở về
                            </button>
                            <button
                                onClick={handleAddNewOrUpdateEmployee}
                                className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                            >
                                Hoàn tất
                            </button>
                            <button
                                onClick={() => setIsNewEmployee(false)}
                                className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                            >
                                Đóng
                            </button>
                        </div>
                    }
                />
            )}
        </Fragment>
    );
};

export default AddAndUpdateEmployee;

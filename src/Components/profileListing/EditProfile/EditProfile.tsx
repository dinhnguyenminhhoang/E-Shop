import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import { profileType } from "@/common/user";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useState, ChangeEvent, useEffect } from "react";
import InputForm from "@/Components/FormData/InputForm/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, uploadFile } from "@/app/action/UserAction";
import axios from "axios";
import UploadImg from "@/Components/UploadImg/UploadImg";
import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import { setImgUrl } from "@/app/Slices/user/UploadSlice";
import { toast } from "react-toastify";
interface EditProfileProps {
    data: profileType;
    showUpdateAccount: boolean;
    setShowUpdateAccount: (check: boolean) => void;
    setReloadData: (isReload: boolean) => void;
}
const EditProfile: React.FC<EditProfileProps> = ({
    data,
    showUpdateAccount,
    setShowUpdateAccount,
    setReloadData,
}) => {
    const dispatch = useDispatch<any>();
    const uploadFileData = useSelector(
        (state: any) => state.uploadFileData.imgUrl
    );
    const [formData, setFormData] = useState<profileType>(data);
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
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
    const handleUpdateAccount = async () => {
        const res = await dispatch(updateUserProfile(formData));
        try {
            console.log(res);
            if (res?.payload?.success) {
                toast.success("thông tin đã được Cập nhật");
                dispatch(setImgUrl(""));
                setReloadData(true);
                setShowUpdateAccount(false);
            }
        } catch (error) {
            toast.error("có lỗi sảy ra vui lòng đợi trong giây lát");
        }
    };
    console.log(data);
    return (
        <CenterModal
            showButtons={true}
            show={showUpdateAccount}
            setShow={() => setShowUpdateAccount(!showUpdateAccount)}
            showModalTitle={true}
            isBorder={false}
            modalTitle={
                <div className="flex gap-2 justify-center items-center">
                    <AiOutlineEdit
                        className="text-custom-Colorprimary"
                        size={26}
                    />
                    <h1 className="text-2xl font-bold">Chỉnh sửa tài khoản</h1>
                </div>
            }
            mainContent={
                <div>
                    <div className="flex flex-col gap-6 items-center">
                        <UploadImg imgUrl={data.avatarUrl} />
                        <div className="flex items-center gap-8">
                            <InputForm
                                w="300px"
                                lable="email"
                                placeholder="nhập email"
                                value={formData.email}
                                name="email"
                                onChange={handleOnChange}
                                type="text"
                            />
                            <InputForm
                                w="300px"
                                lable="phoneNumber"
                                placeholder="nhập phoneNumber"
                                value={formData.phoneNumber}
                                name="phoneNumber"
                                onChange={handleOnChange}
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-8">
                            <InputForm
                                w="300px"
                                lable="firstName"
                                placeholder="nhập firstName"
                                value={formData.firstName}
                                name="firstName"
                                onChange={handleOnChange}
                                type="text"
                            />
                            <InputForm
                                w="300px"
                                lable="lastName"
                                placeholder="nhập lastName"
                                value={formData.lastName}
                                name="lastName"
                                onChange={handleOnChange}
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-8">
                            <InputForm
                                w="300px"
                                lable="birthDay"
                                placeholder="nhập dayOfBirth"
                                value={formData.dayOfBirth?.split("T")[0]}
                                name="dayOfBirth"
                                onChange={handleOnChange}
                                type="date"
                            />
                            <SelecterLab
                                valueUpdate={formData.gender ? ["nam"] : ["nữ"]}
                                w="300px"
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
                            />
                        </div>
                    </div>
                    <div
                        onClick={() => setShowUpdateAccount(false)}
                        className="absolute top-8 right-8 text-custom-Colorprimary cursor-pointer"
                    >
                        <AiOutlineClose size={28} />
                    </div>
                </div>
            }
            buttonComponent={
                <div className="flex justify-center items-center pb-2">
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={handleUpdateAccount}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            Hoàn tất
                        </button>
                        <button
                            onClick={() => {
                                setShowUpdateAccount(false);
                                dispatch(setImgUrl(""));
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            }
        />
    );
};

export default EditProfile;

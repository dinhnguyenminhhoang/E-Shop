import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useState, ChangeEvent } from "react";
import InputForm from "@/Components/FormData/InputForm/InputForm";
import { addressType } from "@/common/Address";
import { useDispatch, useSelector } from "react-redux";
import { addToAddress, updateAddress } from "@/app/action/address";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/Components/Loader/componentlevel";
import { setComponentLevelLoading } from "@/app/Slices/common/componentLeveLoadingSlice";
interface EditAddressProps {
    data?: addressType;
    showUpdateAddress: boolean;
    handleSetShowUpdateAddress: (check: boolean) => void;
    setReloadData: (isReload: boolean) => void;
}
const initFormData = {
    id: 0,
    specificAddress: "",
    province: "",
    districts: "",
    wards: "",
    recipientName: "",
    phoneNumber: "",
    isDefault: false,
} as addressType;
const EditAddress: React.FC<EditAddressProps> = ({
    data,
    showUpdateAddress,
    handleSetShowUpdateAddress,
    setReloadData,
}) => {
    const [formData, setFormData] = useState<addressType>(data || initFormData);
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateAddressData = useSelector(
        (state: any) => state.updateAddressData.data
    );
    const addToAddressData = useSelector(
        (state: any) => state.addToAddressData.data
    );
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const dispatch = useDispatch<any>();
    const handleUpdateAddress = () => {
        if (formData) {
            dispatch(setComponentLevelLoading({ loading: true, id: "" }));
            dispatch(updateAddress(formData)).then(() => {
                if (updateAddressData) {
                    toast.success("chỉnh sữa địa chỉ thành công");
                    setReloadData(true);
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    handleSetShowUpdateAddress(false);
                }
            });
        }
    };
    const handleCreateAddress = () => {
        if (formData) {
            dispatch(setComponentLevelLoading({ loading: true, id: "" }));
            dispatch(addToAddress(formData)).then(() => {
                if (addToAddressData) {
                    toast.success("tạo địa chỉ thành công");
                    setReloadData(true);
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    handleSetShowUpdateAddress(false);
                }
            });
        }
    };
    return (
        <CenterModal
            showButtons={true}
            show={showUpdateAddress}
            setShow={() => handleSetShowUpdateAddress(!showUpdateAddress)}
            showModalTitle={true}
            modalTitle={
                <div className="flex gap-2 justify-center items-center mb-4">
                    <AiOutlineEdit
                        className="text-custom-Colorprimary"
                        size={26}
                    />
                    <h1 className="text-2xl font-bold">
                        {data ? "Cập nhật địa chỉ" : "tạo mới địa chỉ"}
                    </h1>
                </div>
            }
            mainContent={
                <div>
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex items-center gap-8">
                            <InputForm
                                lable="name"
                                placeholder="nhập name"
                                value={formData.recipientName}
                                name="recipientName"
                                onChange={handleOnChange}
                                type="text"
                            />
                            <InputForm
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
                                lable="tỉnh"
                                placeholder="nhập tỉnh"
                                value={formData.province}
                                name="province"
                                onChange={handleOnChange}
                                type="text"
                            />
                            <InputForm
                                lable="huyện"
                                placeholder="nhập huyện"
                                value={formData.districts}
                                name="districts"
                                onChange={handleOnChange}
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-8">
                            <InputForm
                                lable="phường"
                                placeholder="nhập phường"
                                value={formData.wards}
                                name="wards"
                                onChange={handleOnChange}
                                type="text"
                            />
                            <InputForm
                                lable="địa chỉ cụ thể"
                                placeholder="nhập địa chỉ cụ thể"
                                value={formData.specificAddress}
                                name="specificAddress"
                                onChange={handleOnChange}
                                type="text"
                            />
                        </div>
                    </div>
                    <div
                        onClick={() => handleSetShowUpdateAddress(false)}
                        className="absolute top-8 right-8 text-custom-Colorprimary cursor-pointer"
                    >
                        <AiOutlineClose size={28} />
                    </div>
                </div>
            }
            buttonComponent={
                <div
                    onClick={data ? handleUpdateAddress : handleCreateAddress}
                    className="flex justify-center items-center pb-2"
                >
                    <button
                        disabled={componentLoading.loading}
                        className="disabled:border-custom-disable disabled:bg-custom-disable disabled:text-custom-addmin_bg uppercase border-2 border-green-600 rounded-lg px-6 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200 transition-all duration-200"
                    >
                        {componentLoading.loading === true ? (
                            <ComponentLevelLoader
                                text={data ? "đang Cập nhật" : "đang tạo mới"}
                                color={"green"}
                                loading={componentLoading.loading}
                            />
                        ) : data ? (
                            "Cập nhật"
                        ) : (
                            "tạo mới"
                        )}
                    </button>
                </div>
            }
        />
    );
};

export default EditAddress;

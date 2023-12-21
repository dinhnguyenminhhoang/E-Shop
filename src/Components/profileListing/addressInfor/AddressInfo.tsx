import { deleteAddress, updateDefaultAddress } from "@/app/action/address";
import { addressType } from "@/common/Address";
import { Fragment } from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { BsPhoneFlip, BsPinMapFill } from "react-icons/bs";
import { FaJediOrder } from "react-icons/fa";
import { LiaAddressBookSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface addressInforProps {
    data: addressType;
    width?: number;
    getAddressIdByClick: (id: number) => void;
    setReloadData: (isReload: boolean) => void;
}
const AddressInfo: React.FC<addressInforProps> = ({
    data,
    width,
    getAddressIdByClick,
    setReloadData,
}) => {
    const deleteAddressData = useSelector(
        (state: any) => state.deleteAddressData.data
    );
    const updateDefaultAddressData = useSelector(
        (state: any) => state.updateDefaultAddress.data
    );
    const dispatch = useDispatch<any>();
    const handleDeleteAddress = () => {
        dispatch(deleteAddress(data.id)).then(() => {
            if (deleteAddressData) {
                toast.success("xóa địa chỉ thành công");
                setReloadData(true);
            }
        });
    };
    const handleSetIsDefault = () => {
        dispatch(updateDefaultAddress({ id: data.id, isDefault: true })).then(
            () => {
                if (updateDefaultAddressData) {
                    toast.success("bạn vừa sét lại địa chỉ mặc định");
                    setReloadData(true);
                }
            }
        );
    };
    return (
        <div
            className={`relative ${
                width ? "w-full" : "w-[49%] mx-1"
            }   h-[325px] mb-2 shadow-custom bg-white p-4 pb-8 flex flex-col items-center justify-center gap-2 rounded-borderContnet`}
        >
            <h1 className="text-2xl select-none font-bold text-slate-600">
                {`địa chỉ nhận hàng ${data.isDefault ? "mặc định" : data.id}`}
            </h1>
            <LiaAddressBookSolid
                className="text-custom-Colorprimary"
                size={60}
            />
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 border-t p-4">
                    <div className="flex flex-col justify-center items-center gap-2 text-sm flex-1 pr-2 border-r text-center">
                        <BsPinMapFill />
                        <span>{`${data.specificAddress} - ${data.districts} - ${data.wards} - ${data.province}`}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <FaJediOrder />
                        <span>{`người nhận ${data.recipientName}`}</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 border-t pt-2">
                    <BsPhoneFlip />
                    <span>{`SĐT ${data.phoneNumber}`}</span>
                </div>
            </div>
            <div className="absolute top-2 right-2 cursor-pointer text-custom-Colorprimary">
                <div className="flex gap-2 relative group">
                    <AiOutlineMore size={20} />
                    <div className="hidden group-hover:flex flex-col gap-1 absolute right-4 top-0 bg-white shadow-md rounded-md p-2 text-sm font-medium">
                        {!data.isDefault ? (
                            <Fragment>
                                <span
                                    onClick={handleSetIsDefault}
                                    className="hover:opacity-100 opacity-80 hover:text-custom-primary border-b p-1 flex items-center gap-1"
                                >
                                    <BiBadgeCheck size={20} />
                                    default
                                </span>
                                <span
                                    onClick={handleDeleteAddress}
                                    className="hover:opacity-100  border-b opacity-80 hover:text-custom-primary p-1 flex items-center gap-1"
                                >
                                    <MdDeleteOutline size={20} />
                                    delete
                                </span>
                            </Fragment>
                        ) : null}
                        <span
                            onClick={() => getAddressIdByClick(data.id)}
                            className="hover:opacity-100 opacity-80 hover:text-custom-primary p-1 flex items-center gap-1"
                        >
                            <AiOutlineEdit size={20} />
                            edit
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressInfo;

import { checkoutProductType } from "@/common/Cart";
import CenterModal from "../Modal/CenterModal/CenterModal";
import { useState, useEffect } from "react";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useDispatch, useSelector } from "react-redux";
import { productVersion } from "@/common/product";
import { toast } from "react-toastify";
import { setComponentLevelLoading } from "@/app/Slices/common/componentLeveLoadingSlice";
import { Router, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import {
    CheckoutProduct,
    checkoutWidthproductWithAuthentication,
} from "@/app/action/checkout";
import { getAllAddresses } from "@/app/action/address";
import { addressType } from "@/common/Address";
import { CiCirclePlus } from "react-icons/ci";
import EditAddress from "../profileListing/EditAddress/EditAddress";
interface CheckoutWithProductProps {
    show: boolean;
    setShow: (show: boolean) => void;
    productVersion: productVersion;
}
const initFormData = {
    deliveryInfo: {
        recipientName: "",
        phoneNumber: "",
        email: "",
        specificAddress: "",
        province: "",
        districts: "",
        wards: "",
    },
    items: [
        {
            productVersionId: 0,
            quantity: 0,
        },
    ],
};
const CheckoutWithProduct: React.FC<CheckoutWithProductProps> = ({
    show,
    setShow,
    productVersion,
}) => {
    const route = useNavigate();
    const dispatch = useDispatch<any>();
    const [isCheckoutProduct, setIsCheckoutProduct] = useState<boolean>(false);
    const [isAddressForm, setIsAddressForm] = useState<boolean>(false);
    const [IdAddress, setIdAddress] = useState<number>(0);
    const [formData, setFormData] = useState<checkoutProductType>(initFormData);
    const [numberProductbuy, setNumberProductbuy] = useState<number>(1);
    const [addNewAddress, setAddNewAddress] = useState<boolean>(false);
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const allAddresses = useSelector(
        (state: any) => state.allAddresses.data
    ) as addressType[];
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            deliveryInfo: {
                ...formData.deliveryInfo,
                [e.target.name]: e.target.value,
            },
        });
    };
    const handleCheckoutWithAuthen = () => {
        dispatch(setComponentLevelLoading({ loading: true, id: "" }));
        if (productVersion && numberProductbuy > 0) {
            dispatch(
                checkoutWidthproductWithAuthentication({
                    items: [
                        {
                            productVersionId: Number(productVersion.id),
                            quantity: numberProductbuy,
                        },
                    ],
                    shippingAddressesId: IdAddress > 0 ? IdAddress : undefined,
                })
            ).then((response: any) => {
                if (response.payload.success) {
                    toast.success(
                        "đặt hàng thành công. chúc bạn có 1 trãi nghiệm tuyệt vời"
                    );
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    setShow(false);
                    setTimeout(() => {
                        route("/profile/order/processing");
                    }, 1000);
                } else {
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    toast.error(
                        "đặt hàng thất bại. vui lòng quay lại sau vài phút!"
                    );
                }
            });
        }
    };
    const handleCheckOutWithProduct = async () => {
        dispatch(setComponentLevelLoading({ loading: true, id: "" }));
        if (
            productVersion &&
            numberProductbuy > 0 &&
            formData.deliveryInfo.email.trim() !== "" &&
            formData.deliveryInfo.phoneNumber.trim() !== "" &&
            formData.deliveryInfo.province.trim() !== "" &&
            formData.deliveryInfo.specificAddress.trim() !== "" &&
            formData.deliveryInfo.wards.trim() !== "" &&
            formData.deliveryInfo.districts.trim() !== "" &&
            formData.deliveryInfo.recipientName.trim() !== ""
        ) {
            const res = await dispatch(
                CheckoutProduct({
                    ...formData,
                    items: [
                        {
                            productVersionId: Number(productVersion.id),
                            quantity: numberProductbuy,
                        },
                    ],
                })
            );
            try {
                if (res.payload.success) {
                    setFormData(initFormData);
                    toast.success(
                        "bạn vừa đặt hàng thành công! vui lòng chờ trong giây phút để nhân viên liên lạc"
                    );
                    setIsCheckoutProduct(false);
                    setShow(false);
                } else {
                    toast.error(
                        "mua hàng thất bại, vui lòng kiểm tra lại đơn hàng"
                    );
                }
                dispatch(setComponentLevelLoading({ loading: false, id: "" }));
            } catch (error) {
                dispatch(setComponentLevelLoading({ loading: false, id: "" }));
                toast.error("lỗi hệ thống vui lòng chờ trong giây lát");
            }
        } else {
            toast.error("vui lòng nhập đầy đủ thông tin");
            dispatch(setComponentLevelLoading({ loading: false, id: "" }));
        }
    };
    const handleChooseAddress = async () => {
        const res = await dispatch(getAllAddresses());
        try {
            if (res?.payload?.length) {
                setIsAddressForm(true);
                setShow(false);
            }
        } catch (error) {}
    };
    useEffect(() => {
        const defaultAddress = allAddresses.find(
            (address) => address.isDefault
        );

        if (defaultAddress) {
            setIdAddress(defaultAddress.id);
        }
    }, [allAddresses]);

    return (
        <>
            <CenterModal
                show={show}
                setShow={setShow}
                showModalTitle
                showButtons
                modalTitle={
                    <h1 className=" relative font-bold text-2xl">
                        Thông sản phẩm cần mua
                    </h1>
                }
                mainContent={
                    <div className="flex justify-center border-t border-b">
                        <div>
                            <img
                                src={productVersion?.imageUrl}
                                alt=""
                                className="w-60 object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="font-medium text-lg text-slate-600">
                                Tên : {productVersion?.name}
                            </span>
                            <span className="font-medium text-lg text-slate-600">
                                Màu : {productVersion?.color}
                            </span>
                            {Number(productVersion?.originPrice) -
                                Number(productVersion?.price) >
                            0 ? (
                                <div className="flex gap-1">
                                    <span className="font-medium text-lg text-slate-600">
                                        giá :{" "}
                                    </span>
                                    <span className="font-medium text-lg text-slate-600 line-through">
                                        {`${
                                            Number(
                                                productVersion?.originPrice
                                            ) * numberProductbuy
                                        }`}
                                    </span>
                                    <span className="font-medium text-lg text-custom-Colorprimary">
                                        {`${
                                            Number(productVersion?.price) *
                                            numberProductbuy
                                        }`}
                                    </span>
                                </div>
                            ) : (
                                <span className="font-medium text-lg text-custom-Colorprimary">
                                    giá :{" "}
                                    {`${
                                        Number(productVersion?.price) *
                                        numberProductbuy
                                    }`}
                                </span>
                            )}
                            <div className="flex gap-1">
                                <span>Số lượng: </span>
                                <input
                                    value={
                                        numberProductbuy > 0
                                            ? numberProductbuy
                                            : 1
                                    }
                                    onChange={(e) =>
                                        setNumberProductbuy(
                                            Number(e.target.value)
                                        )
                                    }
                                    type="number"
                                    className="border-2 text-center border-slate-600 rounded-md w-12"
                                />
                            </div>
                        </div>
                        <button
                            className="absolute top-6 right-6 text-custom-bg_button"
                            onClick={() => setShow(false)}
                        >
                            <AiOutlineClose size={22} />
                        </button>
                    </div>
                }
                buttonComponent={
                    <div className="flex justify-center w-full pt-2">
                        {!isLoggedIn ? (
                            <button
                                onClick={() => {
                                    setShow(false);
                                    setIsCheckoutProduct(true);
                                }}
                                className="mb-2 text-lg bg-custom-bg_button text-white p-2 rounded-md px-4 opacity-90 transition-all duration-150 hover:opacity-100"
                            >
                                {componentLoading.loading === true ? (
                                    <ComponentLevelLoader
                                        text={"đang tới nhập thông tin"}
                                        color={"red"}
                                        loading={componentLoading.loading}
                                    />
                                ) : (
                                    "nhập thông tin"
                                )}
                            </button>
                        ) : (
                            <div className="flex gap-1 items-center">
                                <button
                                    onClick={() => setShow(false)}
                                    className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                                >
                                    Đóng
                                </button>
                                <button
                                    onClick={handleChooseAddress}
                                    className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                                >
                                    {componentLoading.loading === true ? (
                                        <ComponentLevelLoader
                                            text={"đang chọn địa chỉ"}
                                            color={"red"}
                                            loading={componentLoading.loading}
                                        />
                                    ) : (
                                        "chọn địa chỉ"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                }
            />
            <CenterModal
                bgAll="bg-custom-addmin_bg"
                mainContent={
                    <div className="flex gap-4 justify-start items-start p-2">
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <p className="text-gray-300 text-sm text-start">
                                        email:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="email"
                                        value={formData.deliveryInfo.email}
                                        name="email"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập email"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        phoneNumber :
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={
                                            formData.deliveryInfo.phoneNumber
                                        }
                                        name="phoneNumber"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập phoneNumber"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <p className="text-gray-300 text-sm text-start">
                                        wards:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={formData.deliveryInfo.wards}
                                        name="wards"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập wards"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        province:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={formData.deliveryInfo.province}
                                        name="province"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập province"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="w-1/2">
                                    <p className="text-gray-300 text-sm text-start">
                                        recipientName:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={
                                            formData.deliveryInfo.recipientName
                                        }
                                        name="recipientName"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập recipientName"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        districts:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={formData.deliveryInfo.districts}
                                        name="districts"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập districts"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start">
                                        specificAddress:
                                    </p>
                                    <input
                                        className="w-full h-[48px] px-2 rounded-[8px]"
                                        type="text"
                                        value={
                                            formData.deliveryInfo
                                                .specificAddress
                                        }
                                        name="specificAddress"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => handleOnChange(e)}
                                        placeholder="nhập specificAddress"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                show={isCheckoutProduct}
                setShow={setIsCheckoutProduct}
                showModalTitle
                modalTitle={
                    <h1 className="font-bold text-2xl text-white">
                        Nhập thông tin khách hàng
                    </h1>
                }
                showButtons
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2 pt-2">
                        <button
                            onClick={() => {
                                setShow(true);
                                setIsCheckoutProduct(false);
                            }}
                            className="px-4 py-2 border-b-4 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-200"
                        >
                            qua trở về
                        </button>
                        <button
                            onClick={handleCheckOutWithProduct}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            {componentLoading.loading === true ? (
                                <ComponentLevelLoader
                                    text={"đang mua hàng"}
                                    color={"green"}
                                    loading={componentLoading.loading}
                                />
                            ) : (
                                "mua hàng"
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setFormData(initFormData);
                                setShow(false);
                                setIsCheckoutProduct(false);
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            Đóng
                        </button>
                    </div>
                }
            />
            <CenterModal
                show={isAddressForm}
                setShow={setIsAddressForm}
                showModalTitle
                showButtons
                modalTitle={
                    <h1 className=" relative font-bold text-2xl border-b text-center w-full pb-4">
                        Chọn địa chỉ mua hàng
                    </h1>
                }
                mainContent={
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 p-2 flex-wrap">
                            {allAddresses?.length ? (
                                allAddresses.map((address, index: number) => (
                                    <div
                                        key={address.id}
                                        className={`${
                                            IdAddress === address.id
                                                ? "border p-2 border-custom-primary"
                                                : " border p-2"
                                        } ${
                                            index % 2 === 0 ? "flex-1" : "w-1/2"
                                        } flex flex-col gap-2 items-start justify-start rounded-sm w-1/2`}
                                    >
                                        <div className="flex space-x-4 items-center">
                                            <input
                                                onChange={() =>
                                                    setIdAddress(address.id)
                                                }
                                                defaultChecked={
                                                    address.isDefault
                                                }
                                                checked={
                                                    IdAddress > 0
                                                        ? address.id ===
                                                          IdAddress
                                                        : address.isDefault
                                                }
                                                id="red-checkbox"
                                                type="checkbox"
                                                className="w-4 h-4 text-red-600 rounded  ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                            />
                                            <span className="text-lg border-r pr-4">
                                                {address.recipientName}
                                            </span>
                                            <span className="text-sm text-custom-addmin_color">
                                                {address.phoneNumber}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap space-x-2 items-center">
                                            <span className="text-sm text-custom-addmin_color">
                                                {address.province} -
                                            </span>
                                            <span className="text-sm text-custom-addmin_color">
                                                {address.districts} -
                                            </span>
                                            <span className="text-sm text-custom-addmin_color">
                                                {address.wards}
                                            </span>
                                        </div>
                                        <div className="flex space-x-4 items-center">
                                            <span className="text-sm text-custom-addmin_color">
                                                {address.specificAddress}
                                            </span>
                                        </div>
                                        {address.isDefault ? (
                                            <button className="hover:bg-backgroundHover px-2 py-1 border border-custom-primary rounded-md text-custom-primary mt-2 text-xs">
                                                Mặc định
                                            </button>
                                        ) : null}
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col gap-6 justify-center items-center w-full">
                                    <h1 className="font-bold text-xl text-center">
                                        Chưa có địa chỉ nào được tạo
                                    </h1>
                                    <img
                                        src="https://ucarecdn.com/1f9ddd37-94db-4442-8119-e69c7f1dff08/-/preview/1024x1024/-/quality/smart_retina/-/format/auto/"
                                        alt=""
                                        className="w-60 rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                setAddNewAddress(true);
                                setIsAddressForm(false);
                            }}
                            className="inline-flex gap-1 items-center hover:text-custom-primary transition-all text-xs font-bold border-t pt-2"
                        >
                            <CiCirclePlus size={24} />
                            Thêm mới địa chỉ
                        </button>
                    </div>
                }
                buttonComponent={
                    <div className="flex justify-center w-full pt-2">
                        {!isLoggedIn ? (
                            <button
                                onClick={() => {
                                    setShow(false);
                                    setIsCheckoutProduct(true);
                                }}
                                className="mb-2 text-lg bg-custom-bg_button text-white p-2 rounded-md px-4 opacity-90 transition-all duration-150 hover:opacity-100"
                            >
                                {componentLoading.loading === true ? (
                                    <ComponentLevelLoader
                                        text={"đang tới nhập thông tin"}
                                        color={"red"}
                                        loading={componentLoading.loading}
                                    />
                                ) : (
                                    "nhập thông tin"
                                )}
                            </button>
                        ) : (
                            <div className="flex gap-1 items-center">
                                <button
                                    onClick={() => {
                                        setIsAddressForm(false);
                                    }}
                                    className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                                >
                                    Đóng
                                </button>{" "}
                                <button
                                    onClick={handleCheckoutWithAuthen}
                                    className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                                >
                                    {componentLoading.loading === true ? (
                                        <ComponentLevelLoader
                                            text={"Đang đặt hàng"}
                                            color={"green"}
                                            loading={componentLoading.loading}
                                        />
                                    ) : (
                                        "Đặt hàng"
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAddressForm(false);
                                        setShow(true);
                                    }}
                                    className="px-4 py-2 border-b-4 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-200"
                                >
                                    Quay lại
                                </button>
                            </div>
                        )}
                    </div>
                }
            />
            {addNewAddress && (
                <EditAddress
                    setReloadData={(isReload: boolean) => {
                        if (isReload) {
                            dispatch(getAllAddresses());
                            setIsAddressForm(true);
                        }
                    }}
                    showUpdateAddress={addNewAddress}
                    handleSetShowUpdateAddress={(show: boolean) => {
                        setAddNewAddress(show);
                    }}
                />
            )}
        </>
    );
};

export default CheckoutWithProduct;

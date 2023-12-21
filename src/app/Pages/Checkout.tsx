import ComponentLevelLoader from "@/Components/Loader/componentlevel";
import Notification from "@/Components/PageLoader/Notification";
import { addressType } from "@/common/Address";
import { CartType } from "@/common/Cart";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setComponentLevelLoading } from "../Slices/common/componentLeveLoadingSlice";
import { getAllCart } from "../action/CartActon";
import { getAllAddresses } from "../action/address";
import { CheckOutWidthCart } from "../action/checkout";
const Checkout = () => {
    const [cartItems, setCartItems] = useState<CartType[]>([]);
    const [addressSiping, setAddressShipping] = useState<addressType>();
    const [IdAddress, setIdAddress] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const allAddresses = useSelector(
        (state: any) => state.allAddresses.data as addressType[]
    );
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const dispatch = useDispatch<any>();
    const route = useNavigate();

    useEffect(() => {
        const cartItemsLocal = localStorage.getItem("selectedCart");
        if (typeof cartItemsLocal === "string") {
            setCartItems(JSON.parse(cartItemsLocal));
        }
        dispatch(getAllAddresses());
    }, [dispatch]);
    useEffect(() => {
        if (allAddresses) {
            const addressSiping = allAddresses.filter(
                (address) => address.isDefault
            );
            setAddressShipping(addressSiping[0]);
        }
    }, [allAddresses]);
    useEffect(() => {
        let subPrice = 0;
        if (cartItems) {
            cartItems.forEach((price) => {
                subPrice += Number(price.prices.price) * Number(price.quantity);
            });
        }
        setTotalPrice(subPrice);
    }, [cartItems]);
    const handleCheckout = () => {
        dispatch(setComponentLevelLoading({ loading: true, id: "" }));
        const listIdCart: number[] = [];
        cartItems.forEach((cartItem: CartType) => {
            listIdCart.push(Number(cartItem.id));
        });
        if (listIdCart.length > 0) {
            dispatch(
                CheckOutWidthCart({
                    cartItemsIds: listIdCart,
                    shippingAddressesId: addressSiping?.id || undefined,
                })
            ).then((response: any) => {
                if (response.payload.success) {
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );

                    toast.success(
                        "đặt hàng thành công. chúc bạn có 1 trãi nghiệm tuyệt vời"
                    );
                    dispatch(getAllCart());
                    setTimeout(() => {
                        route("/profile/order/processing");
                    }, 2000);
                } else {
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    toast.error(
                        "đặt hàng thất bại. vui lòng quay lại sau vài phút!"
                    );
                }
            });
        } else {
            dispatch(setComponentLevelLoading({ loading: false, id: "" }));
            toast.error("vui lòng chọn sản phẩm để đặt hàng");
        }
    };
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-start justify-center">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">sản phẩm được chọn</p>
                    <p className="text-gray-400">Kiểm tra các mục của bạn.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4">
                        {cartItems?.length &&
                            cartItems.map((cart) => (
                                <div
                                    key={cart.id}
                                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                                >
                                    <img
                                        className="m-2 h-24 w-28 rounded-md border object-contain"
                                        src={cart.image}
                                        alt=""
                                    />
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold">
                                            {cart.name}
                                        </span>
                                        <span className="float-right text-gray-400">
                                            {cart.quantity}
                                        </span>
                                        <p className="text-lg font-bold">
                                            {Number(cart.prices.price) *
                                                Number(cart.quantity)}
                                            VNĐ
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <>
                        <div className="flex flex-col gap-4">
                            {addressSiping ? (
                                <div className="flex w-full mt-8 flex-col p-2 gap-2 items-start justify-start rounded-md border border-custom-primary">
                                    <h1 className="font-bold text-lg">
                                        Địa chỉ nhận hàng
                                    </h1>
                                    <div className="flex space-x-4 items-center">
                                        <span className="text-lg border-r pr-4">
                                            {addressSiping.recipientName}
                                        </span>
                                        <span className="text-sm text-custom-addmin_color">
                                            {addressSiping.phoneNumber}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap space-x-2 items-center">
                                        <span className="text-sm text-custom-addmin_color">
                                            {addressSiping.province} -
                                        </span>
                                        <span className="text-sm text-custom-addmin_color">
                                            {addressSiping.districts} -
                                        </span>
                                        <span className="text-sm text-custom-addmin_color">
                                            {addressSiping.wards}
                                        </span>
                                    </div>
                                    <div className="flex space-x-4 items-center">
                                        <span className="text-sm text-custom-addmin_color">
                                            {addressSiping.specificAddress}
                                        </span>
                                    </div>
                                    {addressSiping.isDefault ? (
                                        <button className="hover:bg-backgroundHover px-2 py-1 border border-custom-primary rounded-md text-custom-primary mt-2 text-xs">
                                            Mặc định
                                        </button>
                                    ) : null}
                                </div>
                            ) : null}
                            <div className="flex gap-4 flex-wrap">
                                {allAddresses?.length ? (
                                    allAddresses.map(
                                        (address, index: number) => {
                                            return (
                                                <div
                                                    key={address.id}
                                                    className={`
                                        ${index % 2 === 0 ? "flex-1" : "w-1/2"}
                                       flex flex-col p-2 gap-2 items-start justify-start rounded-md w-1/2 border`}
                                                >
                                                    <div className="flex space-x-4 items-center">
                                                        <input
                                                            onChange={() => {
                                                                setIdAddress(
                                                                    address.id
                                                                );
                                                                setAddressShipping(
                                                                    address
                                                                );
                                                            }}
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
                                                        <span className="text-sm border-r pr-4">
                                                            {
                                                                address.recipientName
                                                            }
                                                        </span>
                                                        <span className="text-xs text-custom-addmin_color">
                                                            {
                                                                address.phoneNumber
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap space-x-2 items-center">
                                                        <span className="text-xs text-custom-addmin_color">
                                                            {address.province} -
                                                        </span>
                                                        <span className="text-xs text-custom-addmin_color">
                                                            {address.districts}{" "}
                                                            -
                                                        </span>
                                                        <span className="text-xs text-custom-addmin_color">
                                                            {address.wards}
                                                        </span>
                                                    </div>
                                                    <div className="flex space-x-4 items-center">
                                                        <span className="text-xs text-custom-addmin_color">
                                                            {
                                                                address.specificAddress
                                                            }
                                                        </span>
                                                    </div>
                                                    {address.isDefault ? (
                                                        <button className="hover:bg-backgroundHover px-2 py-1 border border-custom-primary rounded-md text-custom-primary mt-2 text-xs">
                                                            Mặc định
                                                        </button>
                                                    ) : null}
                                                </div>
                                            );
                                        }
                                    )
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
                        </div>
                    </>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <div className="flex flex-col">
                        <div className="self-center">
                            <img
                                src="https://th.bing.com/th/id/OIG.G_MVCJ4bdFyXQex9Ncul?pid=ImgGn"
                                alt=""
                                className="w-60 object-contain text-center border p-1 mb-8"
                            />
                        </div>
                        <div>
                            <p className="text-xl font-medium">
                                Chi tiết thanh toán
                            </p>
                            <p className="text-gray-400">
                                Hoàn tất đơn đặt hàng của bạn bằng cách cung cấp
                                chi tiết thanh toán của bạn.
                            </p>
                        </div>
                        <div>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        tổng tiền
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {totalPrice}đ
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        Shipping
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        100000
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                    Total
                                </p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {totalPrice + 100000}đ
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="mt-4 mb-8 w-full rounded-md px-6 py-3 font-medium text-custom-primary border border-custom-primary hover:bg-backgroundHover text-center flex justify-center"
                    >
                        {componentLoading.loading === true ? (
                            <ComponentLevelLoader
                                text={"Đang đặt hàng"}
                                color={"red"}
                                loading={componentLoading.loading}
                            />
                        ) : (
                            "Đặt hàng"
                        )}
                    </button>
                </div>
            </div>
            <Notification />
        </div>
    );
};

export default Checkout;

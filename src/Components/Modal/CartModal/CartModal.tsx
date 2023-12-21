import ComponentLevelLoader from "@/Components/Loader/componentlevel";
import { setComponentLevelLoading } from "@/app/Slices/common/componentLeveLoadingSlice";
import { setshowCart } from "@/app/Slices/common/showCartSlice";
import { deleteCart, getAllCart } from "@/app/action/CartActon";
import { CartType } from "@/common/Cart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommonModal from "../ComonModal/ComonModal";
const CartModal = () => {
    const [cartItems, setCartItems] = useState([]);
    const showCart = useSelector((state: any) => state.showCart.showCart);
    const allCart = useSelector((state: any) => state.allCart.data);
    const deleteRes = useSelector((state: any) => state.deleteCart.data);
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const dispatch = useDispatch<any>();
    const router = useNavigate();
    useEffect(() => {
        const cartLocal = localStorage.getItem("cart");
        if (allCart) {
            setCartItems(allCart.items);
        } else if (cartLocal) {
            try {
                const parsedCart = JSON.parse(cartLocal);
                if (typeof parsedCart === "object") {
                    setCartItems(parsedCart);
                }
            } catch (error) {
                console.error("Lỗi trong quá trình phân tích JSON:", error);
            }
        }
    }, [allCart]);
    const handleShowCart = () => {
        dispatch(setshowCart(!showCart));
    };
    const handleDeleteCartItem = (id: number | string) => {
        if (id) {
            dispatch(setComponentLevelLoading({ loading: true, id: id }));
            dispatch(deleteCart(id)).then((response: any) => {
                if (response.payload.success) {
                    handleToast("xóa sản phẩm thành công", 0);
                } else {
                    handleToast("xóa sản phẩm thất bài", 1);
                }
                return dispatch(getAllCart());
            });
        }
    };
    const handleToast = (message: string, type: number) => {
        if (type === 0) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };
    return (
        <CommonModal
            showButtons={true}
            show={showCart}
            setShow={handleShowCart}
            showModalTitle={true}
            modalTitle={
                <div className="flex justify-center w-full mt-4">
                    <h1 className="w-full text-center font-bold text-2xl">
                        sản phẩm trong giỏ hàng
                    </h1>
                </div>
            }
            mainContent={
                cartItems && cartItems.length ? (
                    <ul className="-my-6 divide-y divide-gray-300">
                        {cartItems.map((cartItem: CartType) => (
                            <li key={cartItem.id} className="flex py-6">
                                <div
                                    onClick={() => {
                                        dispatch(setshowCart(false));
                                    }}
                                    className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                                >
                                    <img
                                        src={cartItem.image}
                                        alt="Cart Item"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col gap-1">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <span>{cartItem.name}</span>
                                            </h3>
                                        </div>
                                        {cartItem.prices.price <
                                        cartItem.prices.originalPrice ? (
                                            <div className="flex gap-2">
                                                <p className="mt-1 text-sm text-gray-400 font-medium line-through">
                                                    $
                                                    {
                                                        cartItem.prices
                                                            .originalPrice
                                                    }
                                                </p>
                                                <p className="mt-1 text-sm text-red-500 font-medium">
                                                    ${cartItem.prices.price}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <p className="mt-1 text-sm text-black font-medium">
                                                    $
                                                    {
                                                        cartItem.prices
                                                            .originalPrice
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">
                                            số lượng:
                                            {cartItem.quantity}
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <button
                                            type="button"
                                            className="font-medium text-yellow-600 sm:order-2"
                                            onClick={() =>
                                                handleDeleteCartItem(
                                                    cartItem.id
                                                )
                                            }
                                        >
                                            {componentLoading &&
                                            componentLoading.loading &&
                                            componentLoading.id ===
                                                cartItem.id ? (
                                                <ComponentLevelLoader
                                                    text={"ĐANG XÓA"}
                                                    color={"black"}
                                                    loading={
                                                        componentLoading &&
                                                        componentLoading.loading
                                                    }
                                                />
                                            ) : (
                                                "XÓA"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex h-full justify-center items-center text-center text-xl">
                        <h1 className="">Giỏ hàng trống</h1>
                    </div>
                )
            }
            buttonComponent={
                <>
                    <button
                        type="button"
                        className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-sm font-medium uppercase tracking-wide"
                        onClick={() => {
                            handleShowCart();
                            router("/cart");
                        }}
                    >
                        đi tới giỏ hàng
                    </button>
                    <button
                        disabled={cartItems?.length < 1}
                        type="button"
                        onClick={() => {
                            handleShowCart();
                            router("/checkout");
                        }}
                        className="disabled:opacity-50 mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-sm font-medium uppercase tracking-wide"
                    >
                        đi tới thanh toán
                    </button>
                    <div
                        onClick={() => {
                            handleShowCart();
                        }}
                        className="mt-6 flex justify-center text-center text-sm text-gray-600 cursor-pointer"
                    >
                        <button className="font-medium text-gray mr-2">
                            tiếp tục mua sắm
                        </button>
                        <span aria-hidden="true">&rarr;</span>
                    </div>
                </>
            }
        />
    );
};

export default CartModal;

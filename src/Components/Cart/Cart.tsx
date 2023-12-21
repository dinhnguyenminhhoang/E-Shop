import { deleteCart, getAllCart } from "@/app/action/CartActon";
import { CartType } from "@/common/Cart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackPage from "./backPage";
import CartItem from "./cartItem";
import TotalPrice from "./totalPrice";
import EmptyCart from "./EmptyCart/EmptyCart";
import { FaCartPlus } from "react-icons/fa";
interface CartProps {}
const Cart: React.FC<CartProps> = () => {
    const [cartItems, setCartItems] = useState<CartType[]>();
    const [checkUpdate, setCheckUpdate] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<CartType[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const allCart = useSelector((sate: any) => sate.allCart.data);

    useEffect(() => {
        dispatch(getAllCart());
    }, [dispatch]);
    useEffect(() => {
        if (allCart && allCart?.items?.length) {
            setCartItems(allCart.items);
        }
    }, [allCart]);
    useEffect(() => {
        if (checkUpdate) {
            dispatch(getAllCart());
            setCheckUpdate(false);
        }
    }, [dispatch, checkUpdate]);
    const updateCartProps = (checkUpdate: boolean) => {
        setCheckUpdate(checkUpdate);
    };
    const handleDeleteCartItem = (id: number | string) => {
        if (id) {
            dispatch(deleteCart(id)).then((response: any) => {
                if (response.payload.success) {
                    toast.success("xóa sản phẩm thành công");
                    dispatch(getAllCart());
                } else {
                    toast.error("xóa sản phẩm thất bài");
                }
            });
        }
    };
    return (
        <div className="my-4 flex flex-col gap-2 border-[3px] border-black rounded-borderContnet">
            {cartItems && cartItems.length ? (
                <>
                    <div className="flex items-start gap-4">
                        <BackPage />
                        {cartItems && cartItems.length ? (
                            <div className="flex-1 p-4">
                                <div className="flex justify-between items-center  ">
                                    <span className="md:text-3xl text-xl font-bold font-serif text-black ">
                                        giỏ hàng của bạn:
                                    </span>
                                    <div className="flex items-center gap-2 md:text-xl text-lg text-custom-primary">
                                        <FaCartPlus />
                                        <span>Sản phẩm</span>
                                    </div>
                                </div>
                                <table className="border-collapse w-full mt-6">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 py-2 px-4">
                                                {/* <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAllChange}
                                    /> */}
                                            </th>
                                            <th className="border border-gray-300 py-2 px-4">
                                                Sản phẩm
                                            </th>
                                            <th className="border border-gray-300 py-2 px-4">
                                                Số lượng
                                            </th>
                                            <th className="border border-gray-300 py-2 px-4">
                                                Giá tiền
                                            </th>
                                            <th className="border border-gray-300 py-2 px-4">
                                                Xóa
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems?.map((item) => (
                                            <CartItem
                                                setSelectedItems={
                                                    setSelectedItems
                                                }
                                                selectedItems={selectedItems}
                                                key={item.id}
                                                data={item}
                                                updateCartProps={
                                                    updateCartProps
                                                }
                                                handleDeleteCartItem={
                                                    handleDeleteCartItem
                                                }
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : null}
                    </div>
                    {cartItems && cartItems?.length > 0 ? (
                        <TotalPrice
                            data={cartItems}
                            selectedCart={selectedItems}
                        />
                    ) : null}
                </>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
};

export default Cart;

import { updateCart } from "@/app/action/CartActon";
import { CartType } from "@/common/Cart";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
interface CartItemProps {
    data: CartType;
    updateCartProps: (check: boolean) => void;
    handleDeleteCartItem: (id: number | string) => void;
    setSelectedItems: (cart: CartType[]) => void;
    selectedItems: CartType[];
}
const CartItem: React.FC<CartItemProps> = ({
    data,
    updateCartProps,
    handleDeleteCartItem,
    setSelectedItems,
    selectedItems,
}) => {
    const [quantity, setQuantity] = useState(data.quantity);
    const dispatch = useDispatch<any>();
    const handleUpdateCart = (value: string | number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const newQuantity = value;
        if (newQuantity !== data.quantity) {
            dispatch(updateCart({ quantity: newQuantity, id: data.id })).then(
                () => updateCartProps(true)
            );
        }
    };
    const handleChangeQuantity = (value: number | string) => {
        setQuantity(value);
        handleUpdateCart(value);
    };
    const handleCheckboxChange = (cart: CartType) => {
        const tempCart = [...selectedItems];

        if (tempCart?.length > 0) {
            const check = tempCart.find((item) => item.id === cart.id);

            if (check) {
                const updatedTempCart = tempCart.filter(
                    (item) => item.id !== cart.id
                );
                setSelectedItems(updatedTempCart);
            } else {
                setSelectedItems([...selectedItems, cart]);
            }
        } else {
            setSelectedItems([cart]);
        }
    };
    return (
        <tr>
            <td className="border border-gray-300 py-2 px-4 text-center">
                <input
                    defaultChecked={true}
                    id="red-checkbox"
                    type="checkbox"
                    value=""
                    checked={selectedItems.includes(data)}
                    onChange={() => handleCheckboxChange(data)}
                    className="w-4 h-4 text-red-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                />
            </td>
            <td className="border border-gray-300 py-2 md:px-4 mx-2">
                <div className="flex gap-2 items-center">
                    <img
                        src={data.image}
                        alt=""
                        className="p-2 border rounded-borderContnet object-cover md:w-24 md:h-24 w-16 h-16"
                    />
                    <div className="flex flex-col items-start">
                        <span className="md:text-xl text-xs font-medium">
                            {data.name}
                        </span>
                        <span>{data.color}</span>
                    </div>
                </div>
            </td>
            <td className="border border-gray-300 py-2 md:px-4 text-center">
                <button
                    disabled={Number(quantity) === 1}
                    className="disabled:text-custom-disable"
                    onClick={() => {
                        handleChangeQuantity(Number(quantity) - 1);
                    }}
                >
                    <FaChevronLeft />
                </button>
                <input
                    className="md:px-2 py-1 border border-black w-1/4 text-center"
                    value={quantity}
                    name="quantity"
                    onChange={(e) => handleChangeQuantity(e.target.value)}
                />
                <button
                    onClick={() => handleChangeQuantity(Number(quantity) + 1)}
                >
                    <FaChevronRight />
                </button>
            </td>
            <td className="border border-gray-300 py-2 md:px-4 px-1 ">
                <span className="text-[12px] font-medium md:text-lg">
                    {Number(data.prices.price) * Number(data.quantity)}đ
                </span>
            </td>
            <td className="border border-gray-300 py-2 md:px-4 text-center">
                <Tippy
                    content="xóa"
                    placement="bottom"
                    className=" text-red-500"
                >
                    <button
                        onClick={() => handleDeleteCartItem(data.id)}
                        className="text-end text-red-500"
                    >
                        <AiOutlineDelete size={20} />
                    </button>
                </Tippy>
            </td>
        </tr>
    );
};

export default CartItem;

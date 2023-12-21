import { Link } from "react-router-dom";
import BackPage from "../backPage";

const EmptyCart = () => {
    return (
        <div className="flex-1 p-4 flex items-center justify-center flex-col gap-6">
            <img
                src="https://ucarecdn.com/aa7f306e-f6ff-473d-9f3a-a41536c57476/-/preview/1024x1024/-/quality/smart_retina/-/format/auto/"
                alt=""
                className="object-cover w-80 border"
            />
            <div className="flex flex-col gap-2 text-center">
                <span>Giỏ hàng của bạn đang trống.</span>
                <span>Hãy chọn thêm sản phẩm để mua sắm nhé.</span>
            </div>
            <button className="py-2 px-4 rounded-borderContnet bg-custom-bg_button font-semibold text-xl text-white mt-4">
                <Link to="/">Let's shop</Link>
            </button>
        </div>
    );
};

export default EmptyCart;

import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../../common/product";
import { FaHeart } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
interface ProductProps {
    data: ProductType;
    col?: number;
    link?: string;
}
const Product: React.FC<ProductProps> = ({ data, col = 2 }) => {
    const [isLike, setIsLike] = useState(false);
    const handleLike = () => {
        setIsLike(!isLike);
    };
    return (
        <div
            className={`border shadow-custom  relative font-bold bg-white rounded-borderContnet mx-1 flex flex-col p-2  col-span-${col} cursor-pointer`}
        >
            <Link to={`/product/${data.id}`} className="flex flex-col">
                <div className="center">
                    <img
                        src={data.imageUrl}
                        alt=""
                        className="mt-3 w-[160px] h-[200px] object-contain"
                    />
                </div>
                <div className="my-2 text-custom-colorProduct lg:h-12 md:h-10 h-8 md:text-start text-center">
                    <span>{data.name}</span>
                </div>
                <div className="flex md:justify-start justify-center gap-4 my-4 md:text-start text-center">
                    {data.discountPercent ? (
                        <span className="font-bold text-custom-primary">
                            {data.price}đ
                        </span>
                    ) : null}
                    <span
                        className="font-bold  md:text-start text-cente"
                        style={{
                            color: data.discountPercent ? "#707070" : "#d70018",
                            textDecorationLine: data.discountPercent
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {data.originPrice}đ
                    </span>
                </div>
                {data.discountPercent ? (
                    <div className="absolute top-0 -left-1 bg_img ">
                        <span className="text-white text-xs font-semibold mb-2 block w-80 h-full pl-1 py-2">
                            Giảm {Number(data.discountPercent)}%
                        </span>
                    </div>
                ) : null}
            </Link>
            <div className="flex items-center justify-end gap-2 font-normal mt-1">
                <span className="text-custom-disable text-xs">Yêu thích</span>
                {isLike ? (
                    <button onClick={handleLike}>
                        <FaHeart className="text-custom-primary" />
                    </button>
                ) : (
                    <button onClick={handleLike}>
                        <BsHeart className="text-custom-primary" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;

import { ProductType } from "@/common/product";
import { useNavigate } from "react-router-dom";
interface SearchModalProps {
    data: ProductType[];
}
const SearchModal: React.FC<SearchModalProps> = ({ data }) => {
    const router = useNavigate();
    return (
        <div className="absolute top-0 right-0 left-0 pt-12 bg-white rounded-md -z-10">
            <div className="flex flex-col shadow-md max-h-[400px] overflow-y-auto">
                <div className="flex justify-between items-center p-3 text-md font-medium">
                    <span className="text-[#4a4a4a]">Kết quả</span>
                </div>
                {data?.length ? (
                    data.map((product) => (
                        <div
                            onClick={() => router(`/product/${product.id}`)}
                            key={product.id}
                            className="flex gap-2 px-2 py-4  cursor-pointer hover:bg-slate-100 rounded-md border-b justify-start"
                        >
                            <img
                                src={product.imageUrl}
                                alt=""
                                className="w-12  h-12 rounded-full object-contain object-center border"
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col items-start">
                                    <span>{product.name}</span>
                                    {product.price < product.originPrice ? (
                                        <div className="flex gap-2">
                                            <p className="mt-1 text-sm text-gray-400 font-medium line-through">
                                                {product.originPrice}đ
                                            </p>
                                            <p className="mt-1 text-sm text-red-500 font-medium">
                                                {product.price}đ
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <p className="mt-1 text-sm text-black font-medium">
                                                {product.originPrice}đ
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center pb-2">
                        <span className="font-bold text-xl text-[#333]">
                            Không có sản phẩm hợp lệ
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;

import { brandType } from "@/common/catalog";
import { useNavigate } from "react-router-dom";

interface HeaderProductProps {
    heading: string;
    listProduct: string[];
    brand?: brandType[];
}
const HeaderProduct: React.FC<HeaderProductProps> = ({
    heading,
    listProduct,
    brand,
}) => {
    const router = useNavigate();
    return (
        <div className="flex justify-between items-center my-4">
            <h1 className="font-bold text-2xl">{heading}</h1>
            <div className="flex gap-2">
                {brand &&
                    brand.length > 0 &&
                    Array.from({ length: 8 }, (_, index) => (
                        <button
                            onClick={() =>
                                router(
                                    `/product/brand/${brand[index].name}/${brand[index].id}`
                                )
                            }
                            key={index}
                            className="hover:bg-backgroundHover py-1 px-3 rounded-border text-xs lg:block hidden border"
                        >
                            {brand[index].name}
                        </button>
                    ))}
                <button className="hover:bg-backgroundHover hover:underline border py-1 px-3 rounded-border text-xs lg:block hidden">
                    xem tất cả
                </button>
            </div>
        </div>
    );
};
export default HeaderProduct;

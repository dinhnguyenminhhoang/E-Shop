import { ProductType } from "../../../common/product";
import Product from "../Product/Product";
import Slide from "../../Slide/Slide";
import HeaderSale from "./headerSale";

interface HotSaleProps {
    data: ProductType[];
    handleChangeData: (link: string) => void;
}
const HotSale: React.FC<HotSaleProps> = ({ data, handleChangeData }) => {
    return (
        <div>
            <HeaderSale handleChangeData={handleChangeData} />
            {data && (
                <div className="mt-4">
                    <Slide data={data} ItemSlide={Product} />
                </div>
            )}
        </div>
    );
};

export default HotSale;

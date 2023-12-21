import { useState } from "react";
import SaleItem from "./saleItem";
import TimeSale from "./timeSale";
interface HeaderSaleProps {
    handleChangeData: (link: string) => void;
}
const HeaderSale: React.FC<HeaderSaleProps> = ({ handleChangeData }) => {
    const data = [
        {
            title: "Điện thoại,TV",
            link: "mobile",
        },
        {
            title: "Laptop",
            link: "labtop",
        },
    ];
    const [content, setContent] = useState(data[0].link);
    const handleActiveSale = (link: string) => {
        setContent(link);
        handleChangeData(link);
    };
    return (
        <div className="flex justify-between text-center items-center">
            <div className="flex gap-3">
                {data?.length > 0 &&
                    data.map((item, index) =>
                        item.link === content ? (
                            <SaleItem
                                key={index}
                                link={item.link}
                                title={item.title}
                                handleActiveSale={handleActiveSale}
                                active
                            />
                        ) : (
                            <SaleItem
                                key={index}
                                title={item.title}
                                link={item.link}
                                handleActiveSale={handleActiveSale}
                            />
                        )
                    )}
            </div>
            <div>
                <img
                    src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/Gif_hotsale_cu_i_tu_n_1.gif"
                    alt=""
                    className="object-cover md:max-w-sm lg:max-w-md hidden md:block"
                />
            </div>
            <div>
                <TimeSale />
            </div>
        </div>
    );
};

export default HeaderSale;

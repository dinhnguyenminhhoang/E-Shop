import { productVersion } from "@/common/product";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
interface BoxProductProps {
    data: productVersion[];
    handleGetProductVersion: (data: productVersion) => void;
}
const BoxProduct: React.FC<BoxProductProps> = ({
    data,
    handleGetProductVersion,
}) => {
    const [active, setActive] = useState<string | number>("");
    const handlerActive = (
        id: string | number,
        productVersion: productVersion
    ) => {
        setActive(id);
        handleGetProductVersion(productVersion);
    };
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                {data?.length > 0 &&
                    data?.map((item, index) => (
                        <Tippy
                            content={item.name}
                            key={index}
                            placement="right-end"
                            delay={200}
                        >
                            <div
                                onClick={() => handlerActive(item.id, item)}
                                className={`relative p-2 flex gap-2 mr-1 mt-1 items-center  border-[1px] justify-center rounded-borderContnet h-auto cursor-pointer ${
                                    active === item.id
                                        ? "border-custom-primary relative"
                                        : ""
                                }`}
                            >
                                {item?.imageUrl && (
                                    <img
                                        src={item.imageUrl}
                                        alt=""
                                        className="w-[30px] h-[30px]"
                                    />
                                )}
                                <div className="flex flex-col gap-1 text-center p-2">
                                    <span className="text-[12px] font-semibold">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px]">
                                        {item.price}đ
                                    </span>
                                </div>
                                {active === item.id && (
                                    <div className="absolute top-0 left-0 bg-custom-primary rounded-br-borderContnet rounded-tl-borderContnet p-[1px]">
                                        <FaCheck className="text-sm text-white" />
                                    </div>
                                )}
                            </div>
                        </Tippy>
                    ))}
            </div>
            <div className="flex flex-col gap-2 mt-4 font-bold">
                <h1>Chọn màu để xem giá và chi nhánh có hàng</h1>
                <div className="flex flex-wrap">
                    {data?.length > 0 &&
                        data?.map((item, index) => (
                            <Tippy
                                content={item.name}
                                key={index}
                                placement="right-end"
                                delay={200}
                            >
                                <div
                                    onClick={() => handlerActive(item.id, item)}
                                    className={`relative p-2 flex gap-2 mr-1 mt-1 items-center  border-[1px] justify-center rounded-borderContnet h-auto cursor-pointer ${
                                        active === item.id
                                            ? "border-custom-primary relative"
                                            : ""
                                    }  ${
                                        item.isOutOfStock
                                            ? "pointer-events-none border-x-custom-disable"
                                            : null
                                    }`}
                                >
                                    {item?.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt=""
                                            className="w-[30px] h-[30px]"
                                        />
                                    )}
                                    <div className="flex flex-col gap-1 text-center p-2">
                                        <span className="text-[12px] font-semibold">
                                            {item.color}
                                        </span>
                                    </div>
                                    {active === item.id && (
                                        <div className="absolute top-0 left-0 bg-custom-primary rounded-br-borderContnet rounded-tl-borderContnet p-[1px]">
                                            <FaCheck className="text-sm text-white" />
                                        </div>
                                    )}
                                    {item.isOutOfStock && (
                                        <div className="absolute right-1 -top-8">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-a8235.appspot.com/o/ecommerce%2Fpng.monster-215.png-1699048341080-7jqemfvq97?alt=media&token=931e1bb1-456f-4f4d-88a1-c16f64373eb1"
                                                alt=""
                                                className="w-16 h-16 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </Tippy>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BoxProduct;

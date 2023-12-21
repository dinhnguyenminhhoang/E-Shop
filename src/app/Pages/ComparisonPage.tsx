import { ProductType } from "@/common";
import {
    MdOutlineArrowBack,
    MdOutlineClear,
    MdOutlineLibraryAdd,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCompariProduct } from "../Slices/common/ProductComparison";

const ComparisonPage = () => {
    const dispatch = useDispatch<any>();
    const productComparisonData = useSelector(
        (sate: any) =>
            sate.productComparisonData.data as ProductType.ProductType[]
    );
    const handleRemoveProductCompa = (id: number) => {
        const data = productComparisonData.filter(
            (product) => product.id !== id
        );
        dispatch(setCompariProduct(data));
    };
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-4">
                <button onClick={() => window.history.back()}>
                    <MdOutlineArrowBack size={26} />
                </button>
                <h1 className="font-medium text-xl uppercase">{`Bạn đang so sáng các sản phẩm sau : ${productComparisonData
                    .map((product) => product.name)
                    .join(" và ")}`}</h1>
            </div>
            <div className="flex gap-4 items-start justify-center">
                {Array.from({ length: 3 }, (_, index) => {
                    if (
                        productComparisonData?.length &&
                        productComparisonData[index]
                    ) {
                        return (
                            <div className="relative flex flex-col items-center w-1/3 p-4 mt-5">
                                <img
                                    src={productComparisonData[index].imageUrl}
                                    alt=""
                                    className="h-60 w-60 object-contain"
                                />
                                <div className="flex flex-col gap-1">
                                    <Link
                                        to={`/product/${productComparisonData[index].id}`}
                                        className="flex items-center gap-1 hover:underline cursor-pointer"
                                    >
                                        <span className="font-medium text-lg">
                                            Tên:
                                        </span>
                                        <span>
                                            {productComparisonData[index].name}
                                        </span>
                                    </Link>
                                    <div className="flex flex-col gap-1 text-xs">
                                        <span className="font-medium text-lg">
                                            Phiên bản:{" "}
                                        </span>
                                        {productComparisonData[index]
                                            ?.productVersions?.length &&
                                            productComparisonData[
                                                index
                                            ]?.productVersions?.map(
                                                (productVersion) => (
                                                    <div className="last:border-none border-b pb-2">
                                                        <span className="ml-2 font-bold">
                                                            Tên:{" "}
                                                            {
                                                                productVersion.name
                                                            }
                                                        </span>
                                                        <div className="flex gap-2 items-center ml-2 mt-2 font-bold">
                                                            <span className="">
                                                                màu:
                                                            </span>
                                                            <span className="text-custom-primary">
                                                                {
                                                                    productVersion.color
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2 items-center ml-2 mt-2 font-bold">
                                                            <span className="">
                                                                giá:
                                                            </span>
                                                            <span className="text-custom-primary">
                                                                {
                                                                    productVersion.price
                                                                }
                                                                VND
                                                            </span>
                                                        </div>
                                                        <span className="ml-2 flex flex-col gap-2">
                                                            <span className="mt-2 font-bold">
                                                                chi tiết:
                                                            </span>
                                                            {productVersion
                                                                ?.specifications
                                                                ?.os && (
                                                                <span>{` Hệ điều hành: ${productVersion.specifications.os}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.cpu && (
                                                                <span>{` CPU: ${productVersion.specifications.cpu}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.gpu && (
                                                                <span>{` GPU: ${productVersion.specifications.gpu}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.ram && (
                                                                <span>{` RAM: ${productVersion.specifications.ram}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.storage && (
                                                                <span>{` Bộ nhớ: ${productVersion.specifications.storage}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.display && (
                                                                <span>{` Màn hình: ${productVersion.specifications.display}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.webcam && (
                                                                <span>{` Webcam: ${productVersion.specifications.webcam}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.connectivityPorts && (
                                                                <span>{` Cổng kết nối: ${productVersion.specifications.connectivityPorts}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.wirelessConnectivity && (
                                                                <span>{` Kết nối không dây: ${productVersion.specifications.wirelessConnectivity}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.weight && (
                                                                <span>{` Trọng lượng: ${productVersion.specifications.weight}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.battery && (
                                                                <span>{` Pin: ${productVersion.specifications.battery}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.releaseYear && (
                                                                <span>{` Năm ra mắt: ${productVersion.specifications.releaseYear}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.rearCamera && (
                                                                <span>{` Camera sau: ${productVersion.specifications.rearCamera}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.frontCamera && (
                                                                <span>{` Camera trước: ${productVersion.specifications.frontCamera}`}</span>
                                                            )}
                                                            {productVersion
                                                                ?.specifications
                                                                ?.batteryCapacity && (
                                                                <span>{` Dung lượng pin: ${productVersion.specifications.batteryCapacity}`}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveProductCompa(
                                            Number(
                                                productComparisonData[index].id
                                            )
                                        )
                                    }
                                    className="absolute top-2 right-2 text-custom-primary"
                                >
                                    <MdOutlineClear size={22} />
                                </button>
                            </div>
                        );
                    } else {
                        return (
                            <div className="flex flex-col items-center justify-center w-1/3 p-4">
                                <span className="font-medium text-md mb-4 text-black">
                                    chọn thêm sản phẩm để so sánh
                                </span>
                                <img
                                    src="https://cdn2.cellphones.com.vn/x/media/icon/icon-phtb-2.png"
                                    alt=""
                                    className="h-56 w-56 object-contain"
                                />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default ComparisonPage;

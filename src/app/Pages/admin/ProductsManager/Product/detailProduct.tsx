import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import { AdminProductType } from "@/common/adminType/AdminProduct";
import { useState } from "react";
import { MdClear } from "react-icons/md";
interface DetailProductProps {
    productInfor: AdminProductType;
    showModalDetail: boolean;
    setShowModalDetail: (show: boolean) => void;
}
const DetailProduct: React.FC<DetailProductProps> = ({
    productInfor,
    showModalDetail,
    setShowModalDetail,
}) => {
    return (
        <CenterModal
            show={showModalDetail}
            setShow={setShowModalDetail}
            mainContent={
                <div className="text-gray-700 bg-white relative">
                    <div className="py-2 mx-auto">
                        <div className="w-4/5 mx-auto flex gap-6">
                            <div className="w-1/2">
                                <img
                                    alt="product"
                                    className="w-full h-full object-contain object-center rounded border border-gray-200"
                                    src={productInfor.imageUrl}
                                />
                            </div>
                            <div className="lg:w-1/2">
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    {productInfor?.name}
                                </h1>
                                <p className="leading-relaxed">
                                    {productInfor.description}
                                </p>
                                <div className="title-font font-medium mt-2 text-2xl text-custom-Colorprimary">
                                    bảo hành : {productInfor.warranty}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModalDetail(false)}
                        className="absolute -top-4 right-2 text-custom-Colorprimary"
                    >
                        <MdClear size={30} />
                    </button>
                </div>
            }
        />
    );
};

export default DetailProduct;

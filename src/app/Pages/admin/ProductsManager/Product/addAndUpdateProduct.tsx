import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import UploadImg from "@/Components/UploadImg/UploadImg";
import { setComponentLevelLoading } from "@/app/Slices/common/componentLeveLoadingSlice";
import { setImgUrl } from "@/app/Slices/user/UploadSlice";
import {
    adminAllProduct,
    adminCreateProduct,
    adminUpdateProduct,
} from "@/app/action/adminAction/adminProduct";
import {
    AdminProductType,
    addProductType,
} from "@/common/adminType/AdminProduct";
import { categoryType, needType } from "@/common/catalog";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
interface AddAndUpdateProductProps {
    isNewProduct: boolean;
    setIsNewProduct: (isShow: boolean) => void;
    productInfor?: addProductType;
    isUpdateProduct?: boolean;
}
const initFormData = {
    name: "",
    description: "",
    imageUrl:
        "https://ucarecdn.com/ce1b0c8c-b828-4700-8bd3-c90f021f4c58/-/preview/1024x1024/-/quality/smart_retina/-/format/auto/",
    warranty: "",
    categoryId: 0,
    brandId: 0,
    needId: 0,
};
const AddAndUpdateProduct: React.FC<AddAndUpdateProductProps> = ({
    isNewProduct,
    setIsNewProduct,
    productInfor,
    isUpdateProduct,
}) => {
    const dispatch = useDispatch<any>();
    const [formData, setFormData] = useState<addProductType>(
        productInfor ? productInfor : initFormData
    );
    const uploadFileData = useSelector(
        (state: any) => state.uploadFileData.imgUrl
    );
    const branchData = useSelector((state: any) => state.branchData.data);
    const categoriesData = useSelector(
        (state: any) => state.categoriesData.data as categoryType[]
    );
    const needsData = useSelector(
        (state: any) => state.needsData.data as needType[]
    );
    useEffect(() => {
        if (uploadFileData !== "") {
            setFormData({ ...formData, imageUrl: uploadFileData });
        }
    }, [uploadFileData]);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        setFormData({ ...formData, [typeId]: option.id });
    };
    const handleAddNewOrUpdateProduct = () => {
        if (!isUpdateProduct) {
            if (
                formData.name.trim() !== "" &&
                formData.warranty.trim() !== "" &&
                formData.description.trim() !== "" &&
                formData.brandId > 0 &&
                formData.categoryId > 0
            ) {
                dispatch(setComponentLevelLoading({ isLoading: true, id: "" }));
                dispatch(adminCreateProduct(formData)).then((res: any) => {
                    if (res.payload?.success) {
                        toast.success("tạo sản phẩm thành công");
                        dispatch(
                            adminAllProduct({
                                pageSize: 6,
                                pageIndex: 1,
                            })
                        );
                        dispatch(setImgUrl(""));
                        setFormData(initFormData);
                        setIsNewProduct(false);
                    }
                });
            } else {
                toast.error("vui lòng nhập đầy đủ thông tin cần thiết !");
            }
        } else {
            if (
                formData.name.trim() !== "" &&
                formData.warranty.trim() !== "" &&
                formData.description.trim() !== "" &&
                formData.brandId > 0 &&
                formData.categoryId > 0
            ) {
                dispatch(setComponentLevelLoading({ isLoading: true, id: "" }));
                dispatch(adminUpdateProduct(formData)).then((res: any) => {
                    if (res.payload?.success) {
                        dispatch(setImgUrl(""));
                        toast.success("Cập nhật sản phẩm thành công");
                        dispatch(
                            adminAllProduct({
                                pageSize: 6,
                                pageIndex: 1,
                            })
                        );
                        setFormData(initFormData);
                        setIsNewProduct(false);
                    }
                });
            } else {
                toast.error("vui lòng nhập đầy đủ thông tin cần thiết !");
            }
        }
    };
    return (
        <CenterModal
            show={isNewProduct}
            setShow={setIsNewProduct}
            showModalTitle={true}
            modalTitle={
                <h1 className="font-bold text-2xl text-white select-none mt-2">
                    {isUpdateProduct
                        ? "Chỉnh sửa sản phẩm"
                        : "Thêm sản phẩm mới"}
                </h1>
            }
            mainContent={
                <div className="flex gap-4 justify-start items-start p-2">
                    <div className="flex flex-col gap-6 w-full">
                        <UploadImg imgUrl={formData.imageUrl} />

                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize">
                                    tên:
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    // lable="tên"
                                    type="text"
                                    value={formData.name}
                                    name="name"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="nhập tên sản phẩm"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize">
                                    chọn nhu cầu sản phẩm :
                                </p>
                                {needsData?.length ? (
                                    <SelecterLab
                                        valueUpdateOj={formData}
                                        options={needsData}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        typeId="needId"
                                        defaultValue={formData.needId}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize">
                                    bảo hành :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    // lable="bảo hành"
                                    type="text"
                                    value={formData.warranty}
                                    name="warranty"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="nhập bảo hành sản phẩm"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize">
                                    chọn loại sản phẩm :
                                </p>
                                {categoriesData?.length ? (
                                    <SelecterLab
                                        valueUpdateOj={formData}
                                        options={categoriesData}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        typeId="categoryId"
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize">
                                    mô tả :
                                </p>
                                <input
                                    className="w-full h-[48px] px-2 rounded-[8px]"
                                    // lable="mô tả"
                                    type="text"
                                    value={formData.description}
                                    name="description"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="nhập mô tả sản phẩm"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize">
                                    chọn nhà cung cấp :
                                </p>
                                {branchData?.length ? (
                                    <SelecterLab
                                        valueUpdateOj={formData}
                                        options={branchData}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        typeId="brandId"
                                    />
                                ) : null}
                            </div>
                        </div>
                        {isUpdateProduct ? (
                            <div className="flex justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-gray-300 text-sm text-start capitalize">
                                        Hoạt động :
                                    </p>
                                    <SelecterLab
                                        options={[
                                            {
                                                id: true,
                                                title: "Đang hoạt động",
                                            },
                                            {
                                                id: false,
                                                title: "Ngừng hoạt động",
                                            },
                                        ]}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        typeId="viewable"
                                        valueUpdate={
                                            formData.viewable
                                                ? ["Đang hoạt động"]
                                                : ["Ngừng hoạt động"]
                                        }
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            }
            bgAll="bg-custom-addmin_bg"
            showButtons={true}
            buttonComponent={
                <div className="flex gap-2 justify-center mb-2">
                    <button
                        onClick={handleAddNewOrUpdateProduct}
                        className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                    >
                        {isUpdateProduct ? "Chỉnh sửa" : "Tạo"}
                    </button>
                    <button
                        onClick={() => {
                            setIsNewProduct(false);
                            if (uploadFileData) dispatch(setImgUrl(""));
                        }}
                        className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                    >
                        Đóng
                    </button>
                </div>
            }
        />
    );
};

export default AddAndUpdateProduct;

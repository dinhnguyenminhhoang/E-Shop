import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import { getProductById } from "@/app/action/product";
import { ProductType, cretaeProductVersionType } from "@/common/product";
import { useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TableVersion from "./TableVersion";
import {
    adminCreateProductVersion,
    adminDeleteProductVersion,
    adminUpadateProductVersion,
} from "@/app/action/adminAction/adminProduct";
import UploadImg from "@/Components/UploadImg/UploadImg";
import { setImgUrl } from "@/app/Slices/user/UploadSlice";
const AdminProductVersion = () => {
    const param = useParams();
    const date = new Date();
    const initFormData = {
        productVersionId: 0,
        productId: Number(param?.id) || 0,
        name: "",
        imageUrl:
            "https://ucarecdn.com/ce1b0c8c-b828-4700-8bd3-c90f021f4c58/-/preview/1024x1024/-/quality/smart_retina/-/format/auto/",
        color: "",
        price: 0,
        specifications: {
            releaseYear: date.getFullYear(),
        },
    };
    const dispatch = useDispatch<any>();
    const productDetail = useSelector(
        (state: any) => state.productDetail.data as ProductType
    );
    const uploadFileData = useSelector(
        (state: any) => state.uploadFileData.imgUrl
    );
    const [isNewProductVersion, setISNewProductVersion] =
        useState<boolean>(false);
    const [formData, setFormData] =
        useState<cretaeProductVersionType>(initFormData);
    const [isInfomation, setIsInfomation] = useState<boolean>(false);
    const [isUpdateProductVersion, setISUpdateProductVersion] =
        useState<boolean>(false);
    useEffect(() => {
        if (param.id) {
            dispatch(getProductById(param?.id));
        }
    }, [param, dispatch]);
    useEffect(() => {
        if (uploadFileData !== "") {
            setFormData({ ...formData, imageUrl: uploadFileData });
        }
    }, [uploadFileData]);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleOnchangeSpec = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            specifications: {
                ...formData.specifications,
                [e.target.name]: e.target.value,
            },
        });
    };
    const handleAddOrUpdateProductVersion = async () => {
        if (
            formData.name.trim() !== "" &&
            formData.color.trim() !== "" &&
            formData.price > 0 &&
            (formData.productId > 0 ||
                (formData.productVersionId && formData.productVersionId > 0)) &&
            formData.imageUrl.trim() !== ""
        ) {
            if (!isUpdateProductVersion) {
                const res = await dispatch(adminCreateProductVersion(formData));
                try {
                    if (res.payload.success) {
                        dispatch(getProductById(Number(param?.id)));
                        toast.success("tạo mới sản phẩm thành công!");
                        setFormData(initFormData);
                        setISNewProductVersion(false);
                        dispatch(setImgUrl(""));
                        setIsInfomation(false);
                    } else {
                        toast.error(
                            `tạo mới sản phẩm thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            } else {
                const res = await dispatch(
                    adminUpadateProductVersion({
                        formData: formData,
                        productVersionId: formData.productVersionId || 0,
                    })
                );

                try {
                    if (res.payload.success) {
                        dispatch(getProductById(Number(param?.id)));
                        toast.success("Chỉnh sửa sản phẩm thành công!");
                        setFormData(initFormData);
                        setISNewProductVersion(false);
                        dispatch(setImgUrl(""));
                        setISUpdateProductVersion(false);
                        setIsInfomation(false);
                    } else {
                        toast.error(
                            `Chỉnh sửa sản phẩm thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            }
        } else {
            toast.error("vui lòng kiểm tra lại thông tin");
        }
    };
    const handleDeleteProductVersion = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(adminDeleteProductVersion(id));
            try {
                if (res.payload.success) {
                    toast.success("xóa sản phẩm thành công!");
                    dispatch(getProductById(Number(param?.id)));
                } else {
                    toast.error(
                        `tạo mới sản phẩm thất bại! ${res.payload.message}`
                    );
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        }
    };
    const handleEditProductVersion = (ProductVersion: any) => {
        setISNewProductVersion(true);
        setISUpdateProductVersion(true);
        setFormData({
            ...ProductVersion,
            productVersionId: ProductVersion.id,
        });
    };
    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex items-center">
                        <div className="lg:flex md:flex flex-grow-0">
                            <button
                                onClick={() => setISNewProductVersion(true)}
                                className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
                            >
                                <CiExport size={22} />
                                <span className="text-xs">Tạo mới</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {productDetail?.productVersions?.length ? (
                <div className="w-full overflow-hidden border border-gray-700 rounded-lg mb-8 rounded-b-lg">
                    {productDetail?.productVersions ? (
                        <TableVersion
                            data={productDetail?.productVersions}
                            handleDelete={handleDeleteProductVersion}
                            handleEdit={handleEditProductVersion}
                        />
                    ) : null}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có sản phẩm nào hợp lệ
                </div>
            )}
            <CenterModal
                show={isNewProductVersion}
                setShow={setISNewProductVersion}
                showModalTitle={true}
                modalTitle={
                    <h1 className="text-2xl font-bold text-white">
                        {isUpdateProductVersion
                            ? "Cập nhật sản phẩm"
                            : "tạo mới sản phẩm"}
                    </h1>
                }
                bgAll="bg"
                mainContent={
                    <div className="flex flex-col gap-2">
                        <UploadImg imgUrl={formData.imageUrl} />
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    Tên :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.name}
                                    name="name"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="Nhập tông tin sản phẩm"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    màu :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.color}
                                    name="color"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="nhập thông tin sản phẩm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    giá :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.price}
                                    name="price"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnChange(e)}
                                    placeholder="nhập thông tin sản phẩm"
                                />
                            </div>
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={() => {
                                setISNewProductVersion(false);
                                setIsInfomation(true);
                            }}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            Tới nhập thông tin
                        </button>
                        <button
                            onClick={() => {
                                setISNewProductVersion(false);
                                if (isUpdateProductVersion) {
                                    setISUpdateProductVersion(false);
                                }
                                if (uploadFileData !== "") {
                                    dispatch(setImgUrl(""));
                                }
                                setFormData(initFormData);
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            Đóng
                        </button>
                    </div>
                }
            />
            <CenterModal
                show={isInfomation}
                setShow={setIsInfomation}
                showModalTitle={true}
                modalTitle={
                    <h1 className="text-2xl font-bold text-white">
                        {isUpdateProductVersion
                            ? "Cập nhật thông tin sản phẩm"
                            : "tạo mới thông tin sản phẩm"}
                    </h1>
                }
                bgAll="bg"
                mainContent={
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    Cpu :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.cpu}
                                    name="cpu"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="Nhập tông tin cpu"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    Ram :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.ram}
                                    name="ram"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="nhập thông tin ram"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    Battery :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.battery}
                                    name="battery"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="Nhập tông tin battery"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    battery capacity:
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={
                                        formData.specifications.batteryCapacity
                                    }
                                    name="batteryCapacity"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="nhập thông tin batterry capacity"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    connectivity Ports :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={
                                        formData.specifications
                                            .connectivityPorts
                                    }
                                    name="connectivityPorts"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="Nhập tông tin connectivity Ports"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    display:
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.display}
                                    name="display"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="nhập thông tin display"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    frontCamera :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.frontCamera}
                                    name="frontCamera"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="Nhập tông tin front camera"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    gpu:
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.gpu}
                                    name="gpu"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="nhập thông tin gpu"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    os :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.os}
                                    name="os"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="Nhập tông tin os"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    rearCamera:
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.rearCamera}
                                    name="rearCamera"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="nhập thông tin rear camera"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    releaseYear :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.releaseYear}
                                    name="releaseYear"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="Nhập tông tin release year"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    storage:
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.storage}
                                    name="storage"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="nhập thông tin storage"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    webcam :
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.webcam}
                                    name="webcam"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="Nhập tông tin webcam"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                    weight:
                                </p>
                                <input
                                    className="w-full h-[42px] px-2 rounded-[8px]"
                                    type="text"
                                    value={formData.specifications.weight}
                                    name="weight"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => handleOnchangeSpec(e)}
                                    placeholder="nhập thông tin weight"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-300 text-sm text-start capitalize mb-1">
                                wireless Connectivity :
                            </p>
                            <input
                                className="w-full h-[42px] px-2 rounded-[8px]"
                                type="text"
                                value={
                                    formData.specifications.wirelessConnectivity
                                }
                                name="wirelessConnectivity"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnchangeSpec(e)}
                                placeholder="Nhập tông tin wireless Connectivity"
                            />
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={() => {
                                setIsInfomation(false);
                                setISNewProductVersion(true);
                            }}
                            className="px-4 py-2 border-b-4 border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-all duration-200"
                        >
                            Quay lại
                        </button>
                        <button
                            onClick={handleAddOrUpdateProductVersion}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            Tạo mới
                        </button>
                        <button
                            onClick={() => {
                                setIsInfomation(false);
                                if (isUpdateProductVersion) {
                                    setISUpdateProductVersion(false);
                                }
                                if (uploadFileData !== "") {
                                    dispatch(setImgUrl(""));
                                }
                                setFormData(initFormData);
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            Đóng
                        </button>
                    </div>
                }
            />
            <Notification />
        </div>
    );
};

export default AdminProductVersion;

import SelecterFilter from "@/Components/FormData/Selecter/SelecterFilter";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import DiscountModal from "@/Components/Modal/DiscountModal/DiscountModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import {
    adminAllProduct,
    adminDeleteProduct,
} from "@/app/action/adminAction/adminProduct";
import {
    getAllBrands,
    getAllCategories,
    getAllNeeds,
} from "@/app/action/catalogs";
import {
    AdminProductType,
    addProductType,
} from "@/common/adminType/AdminProduct";
import { FiltersType } from "@/common/getAllType";
import { pagingType } from "@/common/paging";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiBookmarkPlus, CiDiscount1, CiEdit, CiFilter } from "react-icons/ci";
import { LiaSearchPlusSolid } from "react-icons/lia";
import {
    MdClear,
    MdOutlineDeleteOutline,
    MdOutlineReviews,
} from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddAndUpdateProduct from "./addAndUpdateProduct";
import DetailProduct from "./detailProduct";
const ProductsManager = () => {
    const router = useNavigate();
    const dispatch = useDispatch<any>();
    const adminAllProductData = useSelector(
        (state: any) =>
            state.adminAllProduct.data as {
                data: { list: AdminProductType[]; paging: pagingType };
            }
    );
    const branchData = useSelector((state: any) => state.branchData.data);
    const categoriesData = useSelector(
        (state: any) => state.categoriesData.data
    );
    const needsData = useSelector((state: any) => state.needsData.data);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPage: 1,
        pageSize: 6,
    });
    const [listFilter, setListFilter] = useState<FiltersType>();
    const [isReset, setIsReset] = useState<boolean>(false);
    const [allProduct, setAllProduct] = useState<AdminProductType[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [zoomImg, setZoomImg] = useState<string>("");
    const [isNewProduct, setIsNewProduct] = useState<boolean>(false);
    const [isUpdateProduct, setIsUpdateProduct] = useState<boolean>(false);
    const [modalDelete, setIsModaleDelete] = useState<boolean>(false);
    const [idProductDelete, setIdProductDelete] = useState<number>(0);
    const [idProductDiscount, setIdProductDiscount] = useState<number>(0);
    const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
    const [isCreateDiscount, setIsCreateDiscount] = useState<boolean>(false);
    const [detailProduct, setDetailProduct] = useState<AdminProductType>();
    const [productUpdate, setProductUpdate] = useState<AdminProductType>();
    const [confirmationDelete, setConfirmationDelete] =
        useState<boolean>(false);
    useEffect(() => {
        dispatch(adminAllProduct({ pageSize: 6, pageIndex: 1 }));
        dispatch(getAllBrands());
        dispatch(getAllNeeds());
        dispatch(getAllCategories());
    }, [dispatch]);
    useEffect(() => {
        if (adminAllProductData && adminAllProductData?.data?.paging) {
            setPagination({
                currentPage: adminAllProductData.data.paging.pageIndex || 1,
                totalPage: adminAllProductData.data.paging.totalPages || 1,
                pageSize: adminAllProductData.data.paging.pageSize || 1,
            });
        }
        if (adminAllProductData?.data?.list) {
            setAllProduct(adminAllProductData?.data?.list);
        }
    }, [adminAllProductData]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (searchValue.trim() !== "" || listFilter) {
                dispatch(
                    adminAllProduct({
                        pageSize: 6,
                        pageIndex: newPage,
                        Keyword: searchValue || "",
                        Filters: { ...listFilter },
                    })
                );
            } else {
                dispatch(adminAllProduct({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleZoomImg = (img: string) => {
        if (zoomImg === "") {
            setZoomImg(img);
        } else {
            setZoomImg("");
        }
    };
    useEffect(() => {
        if (zoomImg) {
            const checkImg = setTimeout(() => {
                setZoomImg("");
            }, 2000);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            () => clearTimeout(checkImg);
        }
    }, [zoomImg]);
    const handleSearchProduct = () => {
        if (searchValue.trim() !== "") {
            dispatch(
                adminAllProduct({
                    pageSize: 6,
                    pageIndex: pagination.currentPage,
                    Keyword: searchValue,
                })
            );
        } else {
            toast.error("vui lòng nhập tên điện thoại cần tìm");
        }
    };
    const handleResetSearchProduct = () => {
        setIsReset(true);
        dispatch(
            adminAllProduct({
                pageSize: 6,
                pageIndex: pagination.currentPage,
            })
        );
        setSearchValue("");
        setListFilter(undefined);
    };
    const handleResetProductDetailAndShowDetail = (show: boolean) => {
        setShowModalDetail(show);
        if (show === false) {
            setDetailProduct(undefined);
        }
    };
    const handleConfirmDeleteProduct = (id: number) => {
        setIsModaleDelete(true);
        setIdProductDelete(id);
    };
    useEffect(() => {
        if (confirmationDelete && idProductDelete > 0) {
            dispatch(adminDeleteProduct(idProductDelete)).then((res: any) => {
                if (res.payload?.success) {
                    toast.success(
                        "xóa sản phẩm thành công! vui lòng kiểm tra lại dánh sách sản phẩm"
                    );
                    setConfirmationDelete(false);
                    setIdProductDelete(0);
                    dispatch(
                        adminAllProduct({
                            pageSize: 6,
                            pageIndex: pagination.currentPage,
                        })
                    );
                } else {
                    toast.success(
                        "xóa sản phẩm thất bại! vui lòng kiểm tra lại dánh sách sản phẩm"
                    );
                    setConfirmationDelete(false);
                    setIdProductDelete(0);
                }
            });
        }
    }, [confirmationDelete, idProductDelete]);
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        if (
            typeId === "CategoryId" ||
            typeId === "NeedId" ||
            typeId === "BrandId"
        ) {
            setListFilter({ ...listFilter, [typeId]: option.id });
        } else if (typeId === "Viewable" || typeId === "OutOfStock") {
            setListFilter({ ...listFilter, [typeId]: option.value });
        }
    };
    const handleFilterProduct = () => {
        dispatch(
            adminAllProduct({
                pageSize: pagination.pageSize,
                pageIndex: 1,
                Filters: { ...listFilter },
            })
        );
    };
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold  text-gray-300">
                ProductsManager
            </h1>
            <div className="rounded-lg shadow-xs  bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                        <div className="items-center">
                            <div className="lg:flex md:flex flex-grow-0">
                                <div className="flex">
                                    <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                                        <button
                                            onClick={() =>
                                                setIsNewProduct(true)
                                            }
                                            className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 text-gray-300 cursor-pointer h-10 min-w-[120px] rounded-md focus:outline-none"
                                        >
                                            <CiBookmarkPlus size={22} />
                                            <span className="text-xs">
                                                Thêm mới (+)
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg shadow-xs  bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="flex flex-col gap-2">
                        <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <input
                                    className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md   focus:bg-gray-700 border-gray-600 focus:border-gray-500 bg-gray-700"
                                    type="search"
                                    name="search"
                                    placeholder="tìm kím theo tên sản phẩm"
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <div className="w-full mx-1">
                                    <button
                                        className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                        onClick={handleSearchProduct}
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>
                                <div className="w-full mx-1">
                                    <button
                                        className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-400 focus:outline-none rounded-lg border  border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm bg-gray-700"
                                        onClick={handleResetSearchProduct}
                                    >
                                        <span className="text-gray-200">
                                            Reset
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4 lg:gap-4 xl:gap-6 md:gap-2 md:grid-cols-5 py-2">
                            <div>
                                <SelecterFilter
                                    isReset={isReset}
                                    setIsReset={setIsReset}
                                    handleGetOptionBySelect={
                                        handleGetOptionBySelect
                                    }
                                    options={[
                                        {
                                            name: "có thể xem",
                                            value: true,
                                        },
                                        {
                                            name: "không thể xem",
                                            value: false,
                                        },
                                    ]}
                                    typeId="Viewable"
                                    placeholder="Lựa chọn hiển thị"
                                />
                            </div>
                            <div className="capitalize">
                                <SelecterFilter
                                    isReset={isReset}
                                    setIsReset={setIsReset}
                                    handleGetOptionBySelect={
                                        handleGetOptionBySelect
                                    }
                                    options={[
                                        {
                                            name: "còn hàng",
                                            value: false,
                                        },
                                        {
                                            name: "hết hàng",
                                            value: true,
                                        },
                                    ]}
                                    typeId="OutOfStock"
                                    placeholder="Hàng có sẳn"
                                />
                            </div>
                            <div className="capitalize">
                                {categoriesData.length ? (
                                    <SelecterFilter
                                        isReset={isReset}
                                        setIsReset={setIsReset}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        options={categoriesData}
                                        typeId="CategoryId"
                                        placeholder="chọn danh mục"
                                    />
                                ) : null}
                            </div>
                            <div className="capitalize">
                                {branchData.length ? (
                                    <SelecterFilter
                                        isReset={isReset}
                                        setIsReset={setIsReset}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        options={branchData}
                                        typeId="BrandId"
                                        placeholder="chọn nhãn hàng"
                                    />
                                ) : null}
                            </div>
                            <div className="capitalize">
                                {needsData.length ? (
                                    <SelecterFilter
                                        isReset={isReset}
                                        setIsReset={setIsReset}
                                        handleGetOptionBySelect={
                                            handleGetOptionBySelect
                                        }
                                        options={needsData}
                                        typeId="NeedId"
                                        placeholder="chọn nhu cầu"
                                    />
                                ) : null}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleFilterProduct}
                                    className="flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600"
                                >
                                    Filter
                                    <span className="ml-2 text-base">
                                        <CiFilter size={22} />
                                    </span>
                                </button>
                                <div className="w-full mx-1">
                                    <button
                                        className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-400 focus:outline-none rounded-lg border  border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm bg-gray-700"
                                        onClick={handleResetSearchProduct}
                                    >
                                        Reset
                                        <span className="text-gray-200 ml-2">
                                            <RxReset size={22} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {allProduct?.length ? (
                <div style={{ overflowY: "auto" }}>
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b  border-gray-700  text-gray-400 bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ID</td>
                                <td className="px-4 py-2">NAME</td>
                                <td className="px-4 py-2">IMAGE</td>
                                <td className="px-4 py-2">DESCRIPTION</td>
                                <td className="px-4 py-2">REVIEWSCORE</td>
                                <td className="px-4 py-2">CATALOGS</td>
                                <td className="px-4 py-2">WARRANTY</td>
                                <td className="px-4 py-2 text-right">ACTION</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y  divide-gray-700 bg-gray-800 text-gray-400">
                            {allProduct?.length > 0 &&
                                allProduct.map((product) => (
                                    <tr
                                        className="bg-custom-addmin_bg"
                                        key={product.id}
                                    >
                                        <td className="px-4 py-2 ">
                                            <span className="font-semibold uppercase text-xs">
                                                {product.id}
                                            </span>
                                        </td>
                                        <td
                                            className="px-4 py-2"
                                            style={{
                                                maxWidth: "200px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            <span className="text-sm">
                                                {product.name}
                                            </span>
                                        </td>
                                        <td
                                            className={`px-4 py-2 cursor-pointer ${
                                                zoomImg === product.imageUrl
                                                    ? "fixed top-0 left-0 w-full h-full bg-slate-950 flex justify-center items-center z-30"
                                                    : null
                                            }`}
                                            onClick={() =>
                                                handleZoomImg(product.imageUrl)
                                            }
                                        >
                                            <img
                                                src={product.imageUrl}
                                                alt=""
                                                className={`w-[30px] h-[30px] object-contain ${
                                                    zoomImg
                                                        ? "w-full h-full"
                                                        : null
                                                }`}
                                            />
                                        </td>
                                        <td
                                            className="px-4 py-2"
                                            style={{
                                                maxWidth: "200px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            <span className="text-sm">
                                                {product.description}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {product.reviewsScore}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {`categoryId :${
                                                    product.categoryId || 0
                                                } -brandId :${
                                                    product.brandId || 0
                                                } -needId :${
                                                    product.needId || 0
                                                }`}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {product.warranty}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <div className="flex justify-end">
                                                <div className="flex justify-between items-center gap-2">
                                                    <Tippy
                                                        content="review"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                router(
                                                                    `/admin/reviews/${product.id}`
                                                                )
                                                            }
                                                            className="hover:text-custom-bg_button"
                                                        >
                                                            <MdOutlineReviews
                                                                size={22}
                                                            />
                                                        </button>
                                                    </Tippy>
                                                    <Tippy
                                                        content="giảm giá"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                setIsCreateDiscount(
                                                                    true
                                                                );
                                                                setIdProductDiscount(
                                                                    product?.id ||
                                                                        0
                                                                );
                                                            }}
                                                            className="hover:text-custom-bg_button"
                                                        >
                                                            <CiDiscount1
                                                                size={22}
                                                            />
                                                        </button>
                                                    </Tippy>
                                                    <Tippy
                                                        content="Chỉnh sửa"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                setIsUpdateProduct(
                                                                    true
                                                                );
                                                                setIsNewProduct(
                                                                    false
                                                                );
                                                                setProductUpdate(
                                                                    product
                                                                );
                                                            }}
                                                            className="hover:text-custom-Colorprimary transition-all"
                                                        >
                                                            <CiEdit size={22} />
                                                        </button>
                                                    </Tippy>
                                                    <Tippy
                                                        content="chi tiết"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                router(
                                                                    `/admin/products-detail/${product.id}`
                                                                );
                                                            }}
                                                        >
                                                            <LiaSearchPlusSolid
                                                                size={22}
                                                            />
                                                        </button>
                                                    </Tippy>
                                                    <Tippy
                                                        content="xóa"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleConfirmDeleteProduct(
                                                                    product.id ||
                                                                        0
                                                                )
                                                            }
                                                            className="hover:text-custom-bg_button"
                                                        >
                                                            <AiOutlineDelete
                                                                size={22}
                                                            />
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {pagination && adminAllProductData?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={pagination}
                            paging={adminAllProductData.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có sản phẩm nào hợp lệ
                </div>
            )}
            {isNewProduct && !isUpdateProduct && (
                <AddAndUpdateProduct
                    isNewProduct={isNewProduct}
                    setIsNewProduct={setIsNewProduct}
                />
            )}
            {isUpdateProduct && !isNewProduct && (
                <AddAndUpdateProduct
                    isNewProduct={isUpdateProduct}
                    setIsNewProduct={setIsUpdateProduct}
                    isUpdateProduct={true}
                    productInfor={productUpdate as addProductType}
                />
            )}
            {detailProduct && showModalDetail && (
                <DetailProduct
                    productInfor={detailProduct}
                    showModalDetail={showModalDetail}
                    setShowModalDetail={handleResetProductDetailAndShowDetail}
                />
            )}
            <CenterModal
                show={modalDelete}
                setShow={setIsModaleDelete}
                isBorder={false}
                bgAll="h"
                mainContent={
                    <div className="relative w-full h-full md:h-auto m-auto">
                        <div className="relative p-4 text-center rounded-lg shadow bg-gray-800 sm:p-5">
                            <button
                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                                onClick={() => setIsModaleDelete(false)}
                            >
                                <MdClear />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <MdOutlineDeleteOutline className=" text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                            <p className="mb-4  text-gray-300">
                                Bạn có chắc muốn xóa sản phẩm này không ?
                            </p>
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => setIsModaleDelete(false)}
                                    className="py-2 px-3 text-sm font-medium rounded-lg border  focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                                >
                                    Đóng
                                </button>
                                <button
                                    onClick={() => {
                                        setIsModaleDelete(false);
                                        setConfirmationDelete(true);
                                    }}
                                    className="py-2 px-3 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none  bg-red-500 hover:bg-red-600 focus:ring-red-900"
                                >
                                    xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                }
            />
            {isCreateDiscount && pagination ? (
                <DiscountModal
                    show={isCreateDiscount}
                    setShow={setIsCreateDiscount}
                    pagin={adminAllProductData?.data?.paging}
                    type="create"
                    idProduct={idProductDiscount}
                />
            ) : null}
            <Notification />
        </div>
    );
};

export default ProductsManager;

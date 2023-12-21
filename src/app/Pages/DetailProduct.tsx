import CheckoutWithProduct from "@/Components/CheckoutWithProduct/CheckoutWithProduct";
import GenerralProductHeader from "@/Components/Header/GenerralProductHeader/GenerralProductHeader";
import CartModal from "@/Components/Modal/CartModal/CartModal";
import Notification from "@/Components/PageLoader/Notification";
import PageLoader from "@/Components/PageLoader/PageLoader";
import Reviews from "@/Components/Reviews/Reviews";
import ProductInfo from "@/Components/Slide/DetailProductSlide/DetailProductSlide";
import Slide from "@/Components/Slide/Slide";
import BoxProduct from "@/Components/commonListing/DetailBox/BoxProduct/BoxProduct";
import Star from "@/Components/commonListing/Star/Start";
import Product from "@/Components/productListing/Product/Product";
import { ProductType, productVersion } from "@/common/product";
import { useEffect, useState } from "react";
import { FaCartPlus, FaCheck, FaPaypal, FaPhone } from "react-icons/fa";
import {
    MdOutlineClear,
    MdOutlineDescription,
    MdOutlineLibraryAdd,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { setCompariProduct } from "../Slices/common/ProductComparison";
import { setshowCart } from "../Slices/common/showCartSlice";
import { addToCart, getAllCart } from "../action/CartActon";
import { getAllProduct, getProductById } from "../action/product";
const DetailProduct = () => {
    const [listImg, setListImg] = useState<any>([
        {
            imageUrl: "",
        },
    ]);
    const productDetail = useSelector(
        (state: any) => state.productDetail.data as ProductType
    );
    const [productVersion, setProductVersion] = useState<productVersion>();
    const [showBuyProduct, setShowBuyProduct] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const productSlimiler = useSelector((state: any) => state.allproduct.data);
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const allCart = useSelector((sate: any) => sate.allCart.data);
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const route = useNavigate();
    const params = useParams();
    const pageLevelLoading = useSelector(
        (sate: any) => sate.pageLevelLoading.pageLevelLoading
    );
    const productComparisonData = useSelector(
        (sate: any) => sate.productComparisonData.data as ProductType[]
    );
    useEffect(() => {
        dispatch(setPageLevelLoading(true));
        dispatch(getProductById(params?.productId || 1));
        dispatch(setPageLevelLoading(true));
        dispatch(getAllCart());
    }, [dispatch, params]);
    useEffect(() => {
        if (allCart?.items)
            localStorage.setItem("cart", JSON.stringify(allCart.items));
    }, [allCart]);
    useEffect(() => {
        if (productDetail?.catalogs?.categoryId) {
            dispatch(
                getAllProduct({
                    Filters: {
                        CategoryId: productDetail?.catalogs?.categoryId,
                    },
                })
            );
        }
    }, [dispatch, productDetail]);
    useEffect(() => {
        if (productDetail) dispatch(setPageLevelLoading(false));
    });
    useEffect(() => {
        if (productDetail?.productVersions) {
            const listImg = productDetail.productVersions
                .filter((productVersion) => productVersion.imageUrl)
                .map((productVersion) => ({
                    imageUrl: productVersion.imageUrl,
                }));
            listImg.push({ imageUrl: productDetail.imageUrl });
            setListImg(listImg);
        }
    }, [productDetail]);
    if (pageLevelLoading) {
        return <PageLoader pageLevelLoading={pageLevelLoading} />;
    }
    const handleAddCart = () => {
        if (!isLoggedIn) {
            toast.error("đăng nhập để tiếp tục");
            return;
        }
        if (productVersion?.id) {
            dispatch(
                addToCart({ productVersionId: productVersion.id, quantity: 1 })
            ).then((response: any) => {
                if (response.payload.success) {
                    toast.success("thêm sản phẩm thành công");
                    dispatch(setshowCart(true));
                } else {
                    toast.error("thêm sản phẩm thất bài");
                }
                return dispatch(getAllCart());
            });
        } else {
            toast.error("vui lòng chọn sản phẩm mong muốn");
        }
    };
    const handleGetProductVersion = (productVersion: productVersion) => {
        setProductVersion(productVersion);
    };
    const handleByProduct = () => {
        if (!productVersion) {
            toast.error("vui lòng chọn sản phẩm trước khi mua hàng");
        } else {
            setShowBuyProduct(true);
        }
    };
    const handleCompareProduct = () => {
        if (productComparisonData?.length) {
            if (productComparisonData.length < 3) {
                const isProductPresent = productComparisonData.some(
                    (product) => Number(product.id) === Number(productDetail.id)
                );
                if (!isProductPresent) {
                    const updatedComparisonData = [
                        ...productComparisonData,
                        productDetail,
                    ];
                    dispatch(setCompariProduct(updatedComparisonData));
                } else {
                    toast.error("không thể chọn 2 sản phẩm giống nhau");
                }
            } else {
                toast.error("chỉ có thẻ so sánh tối đa 3 sản phẩm");
            }
        } else {
            dispatch(setCompariProduct([productDetail]));
        }
    };
    const handleRemoveProductCompa = (id: number) => {
        const data = productComparisonData.filter(
            (product) => product.id !== id
        );
        dispatch(setCompariProduct(data));
    };
    return (
        productDetail && (
            <div className="flex flex-col gap-2 mb-8">
                <header className="flex items-center gap-2 pb-2 mb-3 border-b-[2px]">
                    <h1 className="font-bold text-lg">{productDetail.name}</h1>
                    <Star
                        numberStar={
                            productDetail.reviewsScore
                                ? Number(productDetail.reviewsScore)
                                : 5
                        }
                    />
                    <div>
                        <button
                            onClick={handleCompareProduct}
                            className="text-custom-primary border-[1px] border-custom-primary p-1 text-sm cursor-pointer rounded-sm"
                        >
                            (+) So sánh
                        </button>
                    </div>
                </header>
                <div className="flex md:flex-row flex-col">
                    <div className="md:w-[60%] sm:w-full">
                        <div className=" max-h-[400px]">
                            <Slide
                                data={listImg}
                                ItemSlide={ProductInfo}
                                numberSlide={1}
                            />
                        </div>
                        <div className="mt-4 p-2 border-[1px] rounded-borderContnet">
                            <h1 className="text-center font-bold text-lg my-1">
                                Thông Tin Sản Phẩm
                            </h1>
                            <div className="flex flex-col gap-2 ">
                                <div className="flex gap-4 items-center text-[#4a4a4a] opacity-[.9] ">
                                    <FaPhone />
                                    <span className="text-sm font-medium">
                                        Mới, đầy đủ phụ kiện từ nhà sản xuất
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center text-[#4a4a4a] opacity-[.9]">
                                    <MdOutlineDescription size={32} />
                                    <span className="text-sm font-medium overflow-hidden overflow-ellipsis">
                                        {productDetail.description}
                                    </span>
                                </div>

                                <div className="flex gap-4 items-center text-[#4a4a4a] opacity-[.9]">
                                    <FaPaypal />
                                    <span className="text-sm font-medium">
                                        Giá sản phẩm đã bao gồm VAT
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {productDetail?.productVersions && (
                        <div className="ml-4 md:w-[40%] w-full mt-4 mb-2">
                            <h1 className="md:hidden block font-bold text-lg">
                                Các loại sản phẩm
                            </h1>
                            <BoxProduct
                                data={productDetail?.productVersions}
                                handleGetProductVersion={
                                    handleGetProductVersion
                                }
                            />
                            <div className="flex gap-2 items-center text-center mt-4">
                                <button
                                    onClick={handleByProduct}
                                    className="flex-1 bg-custom-primary opacity-80 hover:opacity-100 transition-all duration-150 py-2 rounded-md text-white text-xl font-bold cursor-pointer"
                                >
                                    Mua ngay
                                </button>
                                <div
                                    onClick={handleAddCart}
                                    className="flex flex-col gap-1 items-center text-custom-primary px-2 py-2 border-[1px] border-custom-primary rounded-borderContnet cursor-pointer"
                                >
                                    <FaCartPlus />
                                    <span className="text-[8px] text-center font-bold">
                                        Thêm vào giỏ (+)
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <header className="py-2 px-1 bg-[#d1d5db] rounded-t-borderContnet">
                                    Ưu đãi thêm
                                </header>
                                <div className="flex flex-col gap-2 border-[#d1d5db border-[1px] rounded-b-borderContnet">
                                    <div className=" flex gap-2 items-center p-2 ">
                                        <FaCheck className="text-sm text-white bg-[#4caf50] rounded-full p-1" />
                                        <span className="text-sm">
                                            miễn phí ship toàn quấc
                                        </span>
                                    </div>
                                    <div className=" flex gap-2 items-center p-2 ">
                                        <FaCheck className="text-sm text-white bg-[#4caf50] rounded-full p-1" />
                                        <span className="text-sm">
                                            giao hàng nhanh 24h
                                        </span>
                                    </div>
                                    <div className=" flex gap-2 items-center p-2 ">
                                        <FaCheck className="text-sm text-white bg-[#4caf50] rounded-full p-1" />
                                        <span className="text-sm">
                                            tặng kèm củ sạc chính hãng
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {productSlimiler?.list && (
                    <div className="flex flex-col gap-2 p-2">
                        <GenerralProductHeader heading="sản phẩm liên quan" />
                        <Slide
                            data={productSlimiler.list}
                            ItemSlide={Product}
                        />
                    </div>
                )}
                {productDetail ? (
                    <Reviews
                        data={productDetail}
                        productVersion={productVersion}
                    />
                ) : null}
                <CartModal />
                {productVersion ? (
                    <CheckoutWithProduct
                        show={showBuyProduct}
                        setShow={setShowBuyProduct}
                        productVersion={productVersion}
                    />
                ) : null}

                <Notification />
                <div className="fixed bottom-0 h-auto right-0 left-0 rounded-sm shadow-md border w-full bg-white">
                    <div className="flex justify-center items-center">
                        {productComparisonData?.length ? (
                            <div className="flex w-full">
                                {Array.from({ length: 3 }, (_, index) => {
                                    if (
                                        productComparisonData?.length &&
                                        productComparisonData[index]
                                    ) {
                                        return (
                                            <div className="relative flex flex-col items-center w-1/4 p-4 border-r border-black">
                                                <img
                                                    src={
                                                        productComparisonData[
                                                            index
                                                        ].imageUrl
                                                    }
                                                    alt=""
                                                    className="h-16 w-16 object-contain"
                                                />
                                                <div>
                                                    <span>
                                                        {
                                                            productComparisonData[
                                                                index
                                                            ].name
                                                        }
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveProductCompa(
                                                            Number(
                                                                productComparisonData[
                                                                    index
                                                                ].id
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
                                            <div className="flex flex-col items-center justify-center w-1/4 p-4 border-r border-black">
                                                <span className="font-medium text-xl text-black">
                                                    chọn thêm sản phẩm để so
                                                    sánh
                                                </span>
                                                <button className="mt-2">
                                                    <MdOutlineLibraryAdd
                                                        size={28}
                                                    />
                                                </button>
                                            </div>
                                        );
                                    }
                                })}

                                <div className="flex flex-col items-center justify-center w-1/4 p-4 border-r border-black">
                                    <span className="font-medium text-xl text-black">{`đã chọn ${productComparisonData.length} so sánh`}</span>
                                    <button
                                        onClick={() => route("/comparisonPage")}
                                        className="px-2 py-1 border border-custom-primary text-custom-primary rounded-md mt-2"
                                    >
                                        So sánh ngay (+)
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    );
};

export default DetailProduct;

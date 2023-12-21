import HeaderProduct from "@/Components/Header/HeaderProduct/HeaderProduct";
import PageLoader from "@/Components/PageLoader/PageLoader";
import Poster from "@/Components/Slide/Poster/Poster";
import Slide from "@/Components/Slide/Slide";
import HotSale from "@/Components/productListing/HotSale/HotSale";
import Product from "@/Components/productListing/Product/Product";
import SlideBar from "@/app/Layout/Sidebar/SideBar";
import { ProductType } from "@/common";
import { listProduct, posterData } from "@/utils/Data";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageLevelLoading } from "../Slices/common/PageLeveLoadingSlice";
import { getAllBrands } from "../action/catalogs";
import {
    getAllProduct,
    getLaptopProduct,
    getMobileProduct,
} from "../action/product";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const dispatch = useDispatch<any>();
    const [changedDataSale, setChangedDataSale] = useState("mobile");
    const [data, setData] = useState({
        labtop: [] as ProductType.ProductType[],
        mobile: [] as ProductType.ProductType[],
        mobileSale: [] as ProductType.ProductType[],
        labtopSale: [] as ProductType.ProductType[],
    });
    const productdata = useSelector((state: any) => state.allproduct.data);
    const laptopProduct = useSelector((state: any) => state.laptopProduct.data);
    const mobileProduct = useSelector((state: any) => state.mobileProduct.data);
    const branchData = useSelector((state: any) => state.branchData.data);
    const pageLevelLoading = useSelector(
        (sate: any) => sate.pageLevelLoading.pageLevelLoading
    );
    useEffect(() => {
        if (productdata?.list) {
            const labtopProducts = productdata.list.filter(
                (product: ProductType.ProductType) =>
                    product.catalogs.categoryId === 3
            );

            const mobileProducts = productdata.list.filter(
                (product: ProductType.ProductType) =>
                    product.catalogs.categoryId === 2
            );
            const mobileSale = productdata.list.filter(
                (product: ProductType.ProductType) => {
                    if (
                        product.discountPercent !== 0 &&
                        product.catalogs.categoryId === 2
                    ) {
                        return product;
                    }
                }
            );
            const labtopSale = productdata.list.filter(
                (product: ProductType.ProductType) => {
                    if (
                        product.discountPercent !== 0 &&
                        product.catalogs.categoryId === 3
                    ) {
                        return product;
                    }
                }
            );
            setData({
                labtop: labtopProducts,
                mobile: mobileProducts,
                labtopSale: labtopSale,
                mobileSale: mobileSale,
            });
        }
    }, [productdata]);
    useEffect(() => {
        dispatch(setPageLevelLoading(true));
    }, [dispatch]);
    useEffect(() => {
        if (productdata?.list) {
            dispatch(setPageLevelLoading(false));
        }
    }, [productdata, dispatch]);
    useEffect(() => {
        dispatch(getAllProduct({ pageSize: "10", pageIndex: "1" }));
        dispatch(getAllBrands());
        dispatch(getLaptopProduct({ pageSize: "10", pageIndex: "1" }));
        dispatch(getMobileProduct({ pageSize: "10", pageIndex: "1" }));
    }, [dispatch]);
    const handleChangeDatasale = (link: string) => {
        setChangedDataSale(link);
    };
    if (pageLevelLoading) {
        return <PageLoader pageLevelLoading={pageLevelLoading} />;
    }
    return (
        <div className="flex flex-col gap-6">
            <div className="relative grid grid-cols-12 gap-4">
                <div className="lg:block col-span-2 hidden">
                    <SlideBar />
                </div>
                <div className="shadow-custom rounded-borderContnet lg:col-span-10 col-span-12">
                    {posterData && (
                        <Slide
                            data={posterData}
                            ItemSlide={Poster}
                            slideDescription
                            numberSlide={1}
                        />
                    )}
                </div>
            </div>
            <div className="bg-backgroundSale rounded-borderContnet p-3">
                {data ? (
                    <HotSale
                        data={
                            changedDataSale === "mobile"
                                ? mobileProduct?.list
                                : laptopProduct?.list
                        }
                        handleChangeData={handleChangeDatasale}
                    />
                ) : null}
            </div>
            <div>
                <HeaderProduct
                    brand={branchData ? branchData : undefined}
                    listProduct={listProduct}
                    heading="sản phẩm mới nhất"
                />
                <div className="grid lg:grid-cols-10 md:grid-cols-4 grid-cols-2 gap-2">
                    {productdata?.list?.length &&
                        productdata?.list.map(
                            (
                                product: ProductType.ProductType,
                                index: number
                            ) => <Product data={product} key={index} />
                        )}
                </div>
            </div>
            <div className="flex flex-col gap-2 h-auto">
                <HeaderProduct
                    brand={branchData ? branchData : undefined}
                    listProduct={listProduct}
                    heading="LAPTOP THOẠI NỔI BẬT NHẤT"
                />
                <div className="">
                    <Slide ItemSlide={Product} data={laptopProduct?.list} />
                </div>
            </div>
            <div>
                <HeaderProduct
                    brand={branchData ? branchData : undefined}
                    listProduct={listProduct}
                    heading="ĐIỆN THOẠI NỔI BẬT NHẤT"
                />
                <Slide ItemSlide={Product} data={mobileProduct?.list} />
            </div>
        </div>
    );
};

export default Home;

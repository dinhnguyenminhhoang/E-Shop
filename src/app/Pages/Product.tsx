import Filter from "@/Components/Filter/Filter";
import OrderMobile from "@/Components/commonListing/OrderMobile/OrderMobile";
import HotSale from "@/Components/productListing/HotSale/HotSale";
import Product from "@/Components/productListing/Product/Product";
import { brandType, categoryType, needType } from "@/common/catalog";
import { filterType } from "@/common/filter";
import { ProductType } from "@/common/product";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllBrands } from "../action/catalogs";
import { getAllProduct } from "../action/product";
import useDebounce from "../hook/useDebounce";
const ProductPage = () => {
    const [changedDataSale, setChangedDataSale] = useState("mobile");
    const [numberProduct, setNumberProduct] = useState(10);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [listFilter, setListFilter] = useState<filterType>({
        NeedId: undefined,
        CategoryId: undefined,
        BrandId: undefined,
        PriceRange: { MinPrice: 0, MaxPrice: 0 },
        IsOutOfStock: undefined,
        new: undefined,
    });
    const [data, setData] = useState<ProductType[]>([]);
    const debounce = useDebounce(listFilter, 1000) as filterType;
    const param = useParams();
    const branchData = useSelector((state: any) => state.branchData.data);
    const categoriesData = useSelector(
        (state: any) => state.categoriesData.data as categoryType[]
    );
    const needsData = useSelector(
        (state: any) => state.needsData.data as needType[]
    );
    const laptopProduct = useSelector((state: any) => state.laptopProduct.data);
    const mobileProduct = useSelector((state: any) => state.mobileProduct.data);
    const productdata = useSelector((state: any) => state.allproduct.data);
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(getAllBrands());
        if (isFilter === false) {
            if (param.type === "category") {
                dispatch(
                    getAllProduct({
                        pageIndex: "1",
                        pageSize: String(numberProduct),
                        Filters: { CategoryId: param.id },
                    })
                );
            } else if (param.type === "need") {
                dispatch(
                    getAllProduct({
                        pageIndex: "1",
                        pageSize: String(numberProduct),
                        Filters: { NeedId: param.id },
                    })
                );
            }
        }
    }, [dispatch, param, numberProduct, isFilter]);
    useEffect(() => {
        if (productdata?.list?.length) {
            setData(productdata?.list);
        } else {
            setData([]);
        }
    }, [productdata]);
    const handleChangeDatasale = (link: string) => {
        setChangedDataSale(link);
    };
    const handleGetMoreProduct = () => {
        setNumberProduct(numberProduct + 10);
    };
    const handleGetProductByFilter = () => {
        setIsFilter(true);
        if (debounce)
            dispatch(
                getAllProduct({
                    pageIndex: String(numberProduct),
                    SortedBy: listFilter.new ? "" : "new",
                    pageSize: "1",
                    Filters: {
                        CategoryId: debounce.CategoryId,
                        BrandId: debounce.BrandId,
                        NeedId: debounce.NeedId,
                        IsOutOfStock: debounce.IsOutOfStock,
                        PriceRange: {
                            MinPrice: debounce.PriceRange?.MinPrice,
                            MaxPrice: debounce.PriceRange?.MaxPrice,
                        },
                    },
                })
            );
    };
    return (
        <div className="mt-4">
            <div className="flex items-center gap-4">
                {branchData?.length > 0 &&
                    branchData.map((item: brandType, index: number) => (
                        <span
                            key={index}
                            className="px-4 py-2 border rounded-md cursor-pointer font-bold hover:bg-slate-100"
                        >
                            {item.name}
                        </span>
                    ))}
            </div>
            <OrderMobile />
            <div className="bg-backgroundSale rounded-borderContnet p-3 mt-4">
                <div className="bg-backgroundSale rounded-borderContnet p-3">
                    {mobileProduct?.list && laptopProduct?.list ? (
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
            </div>
            <Filter
                listFilter={listFilter}
                setListFilter={setListFilter}
                branchData={branchData}
                categoriesData={categoriesData}
                needsData={needsData}
                setIsFilter={setIsFilter}
                handleGetProductByFilter={handleGetProductByFilter}
            />
            <div className="mt-4">
                {data?.length ? (
                    <div className="grid lg:grid-cols-10 md:grid-cols-4 grid-cols-2 gap-2">
                        {data.map((product) => (
                            <Product data={product} key={product.id} col={2} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center text-custom-Colorprimary font-bold text-3xl">
                        Không có sản phẩm nào hợp lệ
                    </div>
                )}
            </div>
            {data?.length === numberProduct ? (
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={handleGetMoreProduct}
                        className="shadow-custom py-2 px-12 cursor-pointer rounded-borderContnet text-sm hover:border-custom-primary border-[1px] hover:text-custom-primary"
                    >
                        Xem thêm 10 sản phẩm
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default ProductPage;

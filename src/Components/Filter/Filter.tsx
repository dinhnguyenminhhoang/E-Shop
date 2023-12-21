import { brandType, categoryType, needType } from "@/common/catalog";
import { AiOutlineWindows } from "react-icons/ai";
import MySelecter from "./MySelecter/MySelecter";
import { filterType } from "@/common/filter";
import { FaTruckMoving } from "react-icons/fa";
interface FilterProps {
    branchData: brandType[];
    categoriesData: categoryType[];
    needsData: needType[];
    listFilter: any;
    setListFilter: (listFilter: filterType) => void;
    setIsFilter: (isFilter: boolean) => void;
    handleGetProductByFilter: () => void;
}
const Filter: React.FC<FilterProps> = ({
    branchData,
    categoriesData,
    needsData,
    listFilter,
    setListFilter,
    setIsFilter,
    handleGetProductByFilter,
}) => {
    const select = [
        {
            type: "IsOutOfStock",
            icon: <FaTruckMoving />,
            title: "sẳn hàng",
        },
        {
            type: "new",
            icon: <AiOutlineWindows />,
            title: "mới nhất",
        },
    ];
    return (
        <div className="mt-4">
            <span className="mb-2 block font-medium text-lg ">
                chọn theo tiêu chí
            </span>
            <div className="flex items-center gap-4">
                <div>
                    <div className=" flex gap-2  flex-wrap  items-center">
                        {select?.length > 0 &&
                            select.map((data, index) => (
                                <div
                                    onClick={() =>
                                        setListFilter({
                                            ...listFilter,
                                            [data.type]:
                                                listFilter[data.type] ===
                                                undefined
                                                    ? false
                                                    : !listFilter[data?.type],
                                        })
                                    }
                                    key={index}
                                    className={`flex items-center p-2 border-[1px] cursor-pointer rounded-borderContnet text-[#444444] bg-[#f3f4f6] hover:text-custom-primary hover:border-custom-primary ${
                                        listFilter[data.type] === false
                                            ? "border-custom-primary text-custom-primary"
                                            : null
                                    }`}
                                >
                                    {data.icon}
                                    <span className="ml-1 text-sm font-normal ">
                                        {data.title}
                                    </span>
                                </div>
                            ))}
                        <MySelecter
                            title="Nhà cung cấp"
                            option={branchData}
                            type="BrandId"
                            listFilter={listFilter}
                            setListFilter={setListFilter}
                        />
                        <MySelecter
                            title="Nhu cầu"
                            option={needsData}
                            type="NeedId"
                            listFilter={listFilter}
                            setListFilter={setListFilter}
                        />
                        <MySelecter
                            title="Loại"
                            option={categoriesData}
                            type="CategoryId"
                            listFilter={listFilter}
                            setListFilter={setListFilter}
                        />
                        <div className="flex gap-1 items-center">
                            <span>Giá:</span>
                            <input
                                className="border border-slate-900 rounded-md outline-none pl-2 py-1"
                                type="number"
                                value={listFilter.PriceRange?.MinPrice}
                                name="MinPrice"
                                onChange={(e) => {
                                    if (
                                        !isNaN(Number(e.target.value)) &&
                                        Number(e.target.value) >= 0 &&
                                        Number(e.target.value) <=
                                            Number(
                                                listFilter.PriceRange?.MaxPrice
                                            )
                                    ) {
                                        setListFilter({
                                            ...listFilter,
                                            PriceRange: {
                                                ...listFilter.PriceRange,
                                                [e.target.name]: parseInt(
                                                    e.target.value,
                                                    10
                                                ),
                                            },
                                        });
                                    }
                                }}
                            />
                            <input
                                className="border border-slate-900 rounded-md outline-none pl-2 py-1"
                                type="number"
                                value={listFilter.PriceRange?.MaxPrice}
                                name="MaxPrice"
                                onChange={(e) => {
                                    if (
                                        !isNaN(Number(e.target.value)) &&
                                        Number(e.target.value) >= 0
                                    ) {
                                        setListFilter({
                                            ...listFilter,
                                            PriceRange: {
                                                ...listFilter.PriceRange,
                                                [e.target.name]: parseInt(
                                                    e.target.value,
                                                    10
                                                ),
                                            },
                                        });
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                    <div>
                        <button
                            onClick={handleGetProductByFilter}
                            className="align-bottom px-4 py-2 inline-flex items-center justify-center cursor-pointer  transition-colors duration-150 font-medium focus:outline-none  rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600"
                        >
                            Lọc
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setIsFilter(false);
                                setListFilter({});
                            }}
                            className="align-bottom p-2 transition-colors duration-150 font-medium  text-gray-600  dark:text-gray-400 focus:outline-none rounded-lg border bg-gray-200 border-gray-200 mr-3 flex items-center justify-center cursor-pointer text-sm dark:bg-gray-700"
                        >
                            <span className="text-black dark:text-gray-200">
                                Khôi phục
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;

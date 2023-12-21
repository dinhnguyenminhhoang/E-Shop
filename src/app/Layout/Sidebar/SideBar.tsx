import { categoryType, needType } from "@/common/catalog";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FcTreeStructure } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface SideBarProps {}
const SlideBar: React.FC<SideBarProps> = () => {
    const [listData, setListData] = useState<any[]>([]);
    const router = useNavigate();
    const needsData = useSelector(
        (state: any) => state.needsData.data as needType[]
    );
    const categoriesData = useSelector(
        (state: any) => state.categoriesData.data as categoryType[]
    );
    useEffect(() => {
        if (categoriesData?.length > 0 && needsData?.length > 0) {
            setListData([...categoriesData, ...needsData]);
        }
    }, [categoriesData, needsData]);
    return (
        <div className="shadow-custom w-full rounded-borderContnet">
            {listData?.length > 0 &&
                listData.map((data, index) => (
                    <div
                        onClick={() =>
                            router(
                                `/product/${
                                    data?.title ? "need" : "category"
                                }/${data?.name || data?.title}/${data?.id}`
                            )
                        }
                        key={index}
                        className="hover:text-custom-primary border-b last:border-none"
                    >
                        <div className="flex justify-between items-center p-2 cursor-pointer">
                            <div className="flex text-[14px] font-semibold">
                                <FcTreeStructure size={20} />
                                <span className="ml-3">
                                    {data?.title || data?.name}
                                </span>
                            </div>
                            <FaChevronRight />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SlideBar;

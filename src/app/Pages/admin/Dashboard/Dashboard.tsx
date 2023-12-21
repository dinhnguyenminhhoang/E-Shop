import Notification from "@/Components/PageLoader/Notification";
import { AiOutlineTags } from "react-icons/ai";
import {
    BsBoxSeamFill,
    BsCart4,
    BsFillPostageHeartFill,
    BsPersonWorkspace,
} from "react-icons/bs";
import { MdOutlineCategory, MdOutlineLocalShipping } from "react-icons/md";
import { GiMoneyStack, GiProfit } from "react-icons/gi";
import {
    HiMiniUserGroup,
    HiOutlineArrowDownRight,
    HiOutlineArrowUpRight,
} from "react-icons/hi2";

import RecentOrders from "./Components/RecentOrders";
import CatalogSellingPercent from "./Components/CatalogSellingPercent";
import BestSellingProducts from "./Components/BestSellingProducts";
import TopSellingEmployees from "./Components/TopSellingEmployees";
import OverviewChart from "./Components/OverviewChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getParameters } from "@/app/action/adminAction/adminDashboard";
import { setPageLevelLoading } from "@/app/Slices/common/PageLeveLoadingSlice";
import PageLoader from "@/Components/PageLoader/PageLoader";
type OverviewType = {
    title: string;
    value: number;
    growthPercent: number;
};
type totalType = {
    label: string;
    value: number;
};
const thisWeekColor = [
    {
        bg: "#0d9488",
        Icon: <GiMoneyStack />,
    },
    {
        bg: "#fb923c",
        Icon: <GiProfit />,
    },
    {
        bg: "#3b82f6",
        Icon: <BsCart4 />,
    },
    {
        bg: "#0891b2",
        Icon: <HiMiniUserGroup />,
    },
];

const totalColor = [
    {
        Icon: <HiMiniUserGroup />,
        bg: "#f97316",
    },
    {
        Icon: <BsPersonWorkspace />,
        bg: "#3b82f6",
    },
    {
        Icon: <BsCart4 />,
        bg: "#14b8a6",
    },
    {
        Icon: <BsBoxSeamFill />,
        bg: "#10b981",
    },
    {
        Icon: <MdOutlineLocalShipping />,
        bg: "#3258d3",
    },
    {
        Icon: <AiOutlineTags />,
        bg: "#ff6767",
    },
    {
        Icon: <MdOutlineCategory />,
        bg: "#10b981",
    },
    {
        Icon: <BsFillPostageHeartFill />,
        bg: "#f9c200",
    },
];
const Dashboard = () => {
    const parametersData = useSelector(
        (state: any) => state.parametersData.data
    );
    const pageLevelLoading = useSelector(
        (sate: any) => sate.pageLevelLoading.pageLevelLoading
    );
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(setPageLevelLoading(true));
        dispatch(getParameters());
    }, [dispatch]);
    useEffect(() => {
        if (parametersData?.success) {
            dispatch(setPageLevelLoading(false));
        }
    }, [parametersData, dispatch]);
    if (pageLevelLoading) {
        return <PageLoader pageLevelLoading={pageLevelLoading} color="white" />;
    }
    return (
        <div className="h-full w-full flex flex-col gap-3 p-4 text-gray-600 font-bold text-lg">
            <div className="flex flex-col gap-6">
                <h1>Dashboard Overview</h1>

                <div className="grid gap-2 mb-8 xl:grid-cols-4 md:grid-cols-2">
                    {parametersData?.success &&
                        parametersData?.data?.thisWeek?.map(
                            (OverviewItem: OverviewType, index: number) => (
                                <div
                                    key={index}
                                    className="min-w-0 rounded-lg overflow-hidden bg-gray-800 flex justify-center h-full"
                                >
                                    <div
                                        className="border justify-between border-gray-800 w-full px-3 py-6 rounded-lg  text-emerald-100 bg-teal-600"
                                        style={{
                                            backgroundColor:
                                                thisWeekColor[index].bg,
                                        }}
                                    >
                                        <div className="flex gap-2 justify-between xl:mb-0 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="text-center inline-block text-5xl text-emerald-100 bg-teal-600"
                                                    style={{
                                                        backgroundColor:
                                                            thisWeekColor[index]
                                                                .bg,
                                                    }}
                                                >
                                                    {thisWeekColor[index].Icon}
                                                </div>
                                                <div>
                                                    <p className="mb-3 text-base font-medium  uppercase text-gray-100">
                                                        {OverviewItem.title}
                                                    </p>
                                                    <p className="text-2xl font-bold leading-none text-gray-50">
                                                        {OverviewItem.value}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="flex gap-1 items-center">
                                                    {OverviewItem?.growthPercent &&
                                                    OverviewItem.growthPercent >=
                                                        0 ? (
                                                        <div>
                                                            <HiOutlineArrowUpRight />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <HiOutlineArrowDownRight />
                                                        </div>
                                                    )}
                                                    <span>
                                                        {
                                                            OverviewItem.growthPercent
                                                        }
                                                        %
                                                    </span>
                                                </div>
                                                <span className="text-xs font-normal">
                                                    Since last week
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {parametersData?.success &&
                        parametersData?.data?.total?.map(
                            (total: totalType, index: number) => (
                                <div
                                    key={index}
                                    className="min-w-0 rounded-lg overflow-hidden bg-gray-800 flex h-full"
                                >
                                    <div className="p-4 flex items-center border border-gray-800 w-full rounded-lg">
                                        <div
                                            className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-100 bg-orange-500"
                                            style={{
                                                backgroundColor:
                                                    totalColor[index].bg,
                                            }}
                                        >
                                            {totalColor[index].Icon}
                                        </div>
                                        <div>
                                            <h6 className="text-sm mb-1 font-medium text-gray-400">
                                                <span>{total.label}</span>
                                            </h6>
                                            <p className="text-2xl font-bold leading-none text-gray-200">
                                                {total.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                </div>

                <div>
                    <OverviewChart />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="lg:col-span-1 md:col-span-2">
                        <BestSellingProducts />
                    </div>
                    <div className="lg:col-span-1 md:col-span-2">
                        <TopSellingEmployees />
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-4">
                    <div className="lg:col-span-2 md:col-span-6">
                        <CatalogSellingPercent />
                    </div>
                    <div className="lg:col-span-4 md:col-span-6">
                        <RecentOrders />
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
};

export default Dashboard;

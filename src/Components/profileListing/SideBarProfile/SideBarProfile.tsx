import { logout } from "@/app/action/UserAction";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaArrowCircleRight, FaHistory, FaHouseDamage } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
interface GreneralType {
    id: Number;
    link: string;
}
const Greneral = [
    {
        id: 1,
        icon: <FaHouseDamage />,
        title: "Trang chủ",
        link: "/profile/home",
    },
    {
        id: 2,
        icon: <FaHistory />,
        title: "Lịch sử mua hàng",
        link: "/profile/order/processing",
    },
];
const SideBarProfile = () => {
    const dispatch = useDispatch();
    const route = useNavigate();
    const path = useLocation();
    const [isActive, setIsActive] = useState<Number>(
        path.pathname.includes("/order") ? 2 : 1
    );
    const router = useNavigate();
    const handleActiveItem = (item: GreneralType) => {
        router(item.link);
        setIsActive(item.id);
    };
    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("token");
        localStorage.clear();
        route("/");
    };
    return (
        <div className="fixed flex flex-col gap-1 w-max h-full">
            <div
                onClick={() => router("/")}
                className="flex gap-1 items-center border-b py-2 cursor-pointer"
            >
                <img
                    src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
                    width={100}
                    height={100}
                    alt=""
                />
                <span className="text-xl font-semibold uppercase">E-SHOP</span>
            </div>
            <div>
                <h1 className="px-2">Greneral</h1>
                <div className="flex gap-3 flex-col border-b">
                    {Greneral?.length > 0 &&
                        Greneral.map((item, index) => (
                            <div
                                onClick={() => handleActiveItem(item)}
                                key={index}
                                className={`p-2 gap-2 flex items-center cursor-pointer hover:text-custom-primary border-transparent text-[#4a4a4a] text-xl border hover:border-custom-primary rounded-borderContnet hover:bg-custom-primary hover:bg-opacity-[.1] ${
                                    isActive === item.id
                                        ? "text-custom-Colorprimary"
                                        : null
                                }`}
                            >
                                {item.icon}
                                <span className="text-[16px]">
                                    {item.title}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            <div>
                <h1 className="px-2">Others</h1>
                <div className="flex gap-3 flex-col">
                    <div
                        onClick={handleLogout}
                        className="p-2 gap-2 flex items-center cursor-pointer hover:text-custom-primary border-transparent text-[#4a4a4a] text-xl border hover:border-custom-primary rounded-borderContnet hover:bg-custom-primary hover:bg-opacity-[.1]"
                    >
                        <FaArrowCircleRight />
                        <span className="text-[16px]">Đăng xuất</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBarProfile;

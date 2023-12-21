import Notification from "@/Components/PageLoader/Notification";
import { setshowAdminSlide } from "@/app/Slices/common/showAdminSlide";
import { getListRoles } from "@/app/action/adminAction/adminRoles";
import {
    getAllBrands,
    getAllCategories,
    getAllNeeds,
} from "@/app/action/catalogs";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
const AdminHeader = () => {
    const showAdminSlide = useSelector(
        (state: any) => state.showAdminSlide.showAdminSlide
    );
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllBrands());
        dispatch(getAllNeeds());
        dispatch(getListRoles({ pageIndex: 1, pageSize: 100 }));
    }, [dispatch]);
    const adminRole = useSelector((state: any) => state.adminRole.data);
    return (
        <div className="bg-custom-admin_bg_content">
            <div
                className={`flex justify-between h-[60px] items-center ${
                    !showAdminSlide ? "mx-auto w-[90%]" : null
                }`}
            >
                <button
                    onClick={() => dispatch(setshowAdminSlide(!showAdminSlide))}
                    className={`border-none text-custom-addmin_Active__color ${
                        showAdminSlide ? "pl-4" : null
                    }`}
                >
                    {showAdminSlide ? (
                        <AiOutlineMenuFold size={22} />
                    ) : (
                        <AiOutlineMenuUnfold size={22} />
                    )}
                </button>
            </div>
            <Notification />
        </div>
    );
};

export default AdminHeader;

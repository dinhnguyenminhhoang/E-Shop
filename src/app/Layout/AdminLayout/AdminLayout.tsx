import { useSelector } from "react-redux";
import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

interface AdminLayoutProps {
    children: React.ReactElement;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const showAdminSlide = useSelector(
        (state: any) => state.showAdminSlide.showAdminSlide
    );

    return showAdminSlide ? (
        <div className="bg-custom-addmin_bg min-h-screen grid grid-cols-12">
            <AdminSidebar />
            <div className={`col-span-10 flex flex-col`}>
                <AdminHeader />
                {children}
            </div>
        </div>
    ) : (
        <div className="bg-custom-addmin_bg min-h-screen">
            <AdminHeader />
            <div className="mx-auto w-[90%]">{children}</div>
        </div>
    );
};

export default AdminLayout;

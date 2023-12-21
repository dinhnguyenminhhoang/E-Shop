import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import HeaderLayout from "../Layout/HeaderLayout/HeaderLayout";
import Cart from "../Pages/CartPage";
import Checkout from "../Pages/Checkout";
import ComparisonPage from "../Pages/ComparisonPage";
import DetailProduct from "../Pages/DetailProduct";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Order from "../Pages/Order";
import ProductPage from "../Pages/Product";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import ResetPassword from "../Pages/ResetPassword";
import UnauthorizedPage from "../Pages/UnauthorizedPage";
import Brands from "../Pages/admin/Catalog/Brands/Brands";
import Categories from "../Pages/admin/Catalog/Categories/Categories";
import Needs from "../Pages/admin/Catalog/Needs/Needs";
import Customers from "../Pages/admin/Customers/Customers";
import Dashboard from "../Pages/admin/Dashboard/Dashboard";
import Employees from "../Pages/admin/Employees/Employees";
import OrderDetail from "../Pages/admin/Orders/OrderDetail/OrderDetail";
import Orders from "../Pages/admin/Orders/Orders";
import Discounts from "../Pages/admin/ProductsManager/Discounts/Discounts";
import Imports from "../Pages/admin/ProductsManager/Imports/Imports";
import Inventories from "../Pages/admin/ProductsManager/Inventories/Inventories";
import AdminDetailProduct from "../Pages/admin/ProductsManager/Product/AdminProductVersion/AdminProductVersion";
import ProductsManager from "../Pages/admin/ProductsManager/Product/ProductsManager";
import ReviewManager from "../Pages/admin/ReviewManager/ReviewManager";
import RoleManager from "../Pages/admin/RoleManager/RoleManager";
import Supplier from "../Pages/admin/Supplier/Supplier";

interface RouteConfig {
    path: string;
    element: React.ComponentType;
    Layout: any;
}

const publishRouter: RouteConfig[] = [
    {
        path: "/",
        element: Home,
        Layout: DefaultLayout,
    },
    {
        path: "/product/:type/:name/:id",
        element: ProductPage,
        Layout: DefaultLayout,
    },
    {
        path: "/product/:productId",
        element: DetailProduct,
        Layout: DefaultLayout,
    },
    {
        path: "/profile/:id",
        element: Profile,
        Layout: HeaderLayout,
    },
    {
        path: "/cart",
        element: Cart,
        Layout: HeaderLayout,
    },
    {
        path: "/login",
        element: Login,
        Layout: HeaderLayout,
    },
    {
        path: "/register",
        element: Register,
        Layout: HeaderLayout,
    },
    {
        path: "/reset-password",
        element: ResetPassword,
        Layout: HeaderLayout,
    },
    {
        path: "/reset-password/:token",
        element: ResetPassword,
        Layout: HeaderLayout,
    },
    {
        path: "/checkout",
        element: Checkout,
        Layout: DefaultLayout,
    },
    {
        path: "/profile/order/:status",
        element: Order,
        Layout: HeaderLayout,
    },
    {
        path: "/admin/login",
        element: Login,
        Layout: null,
    },
    {
        path: "/unauthorizedPage",
        element: UnauthorizedPage,
        Layout: null,
    },
    {
        path: "/comparisonPage",
        element: ComparisonPage,
        Layout: DefaultLayout,
    },
];

const privateRouter: RouteConfig[] = [
    {
        path: "/admin/dashboard",
        element: Dashboard,
        Layout: AdminLayout,
    },
    {
        path: "/admin/orders",
        element: Orders,
        Layout: AdminLayout,
    },
    {
        path: "/admin/catalog/categories",
        element: Categories,
        Layout: AdminLayout,
    },
    {
        path: "/admin/catalog/brands",
        element: Brands,
        Layout: AdminLayout,
    },
    {
        path: "/admin/catalog/needs",
        element: Needs,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products-manage/products",
        element: ProductsManager,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products-manage/discounts",
        element: Discounts,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products-manage/inventories",
        element: Inventories,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products-manage/imports",
        element: Imports,
        Layout: AdminLayout,
    },
    {
        path: "/admin/products-detail/:id",
        element: AdminDetailProduct,
        Layout: AdminLayout,
    },
    {
        path: "/admin/employees",
        element: Employees,
        Layout: AdminLayout,
    },
    {
        path: "/admin/role",
        element: RoleManager,
        Layout: AdminLayout,
    },
    {
        path: "/admin/supplier",
        element: Supplier,
        Layout: AdminLayout,
    },
    {
        path: "/admin/order-detail/:id",
        element: OrderDetail,
        Layout: null,
    },
    {
        path: "/admin/customer",
        element: Customers,
        Layout: AdminLayout,
    },
    {
        path: "/admin/reviews",
        element: ReviewManager,
        Layout: AdminLayout,
    },
    {
        path: "/admin/reviews/:id",
        element: ReviewManager,
        Layout: AdminLayout,
    },
];

export { privateRouter, publishRouter };

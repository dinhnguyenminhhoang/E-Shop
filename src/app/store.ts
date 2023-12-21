import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import modalReducer from "./Slices/common/modalSlice";
import pathSlice from "./Slices/common/pathSlice";
import * as SlicesApi from "./Slices/product";
import * as userSlice from "./Slices/user";
import * as commonSlice from "./Slices/common";
import * as cartSlice from "./Slices/cart";
import * as addresSlice from "./Slices/address";
import * as OrderSlice from "./Slices/order";
import * as checkoutSlice from "./Slices/checkout";
import * as catalogsSlice from "./Slices/catalogs";
import * as reviewsSlice from "./Slices/review";
import * as adminEmployeesSlice from "./Slices/admin";
import * as adminProductSlice from "./Slices/admin/AdminProduct";
import * as adminEmployeestSlice from "./Slices/admin/AdminEmployees";
import * as adminbrandsSlice from "./Slices/admin/catalogs/brands";
import * as adminCategoriesSlice from "./Slices/admin/catalogs/categories";
import * as adminNeedsSlice from "./Slices/admin/catalogs/needs";
import * as AdminRolesSlice from "./Slices/admin/AdminRoles";
import * as AdminOrderSlice from "./Slices/admin/AdminOrder";
import * as AdminSupplierSlice from "./Slices/admin/AdminSupplier";
import * as adminDiscount from "./Slices/admin/adminDiscount";
import * as adminInventory from "./Slices/admin/adminInventory";
import * as adminCustomerSlice from "./Slices/admin/adminCustomer";
import * as adminReviewSlices from "./Slices/admin/adminReview";
import * as adminDashboardSlices from "./Slices/admin/adminDashboard";
export const store = configureStore({
    reducer: {
        modal: modalReducer,
        path: pathSlice,
        allproduct: SlicesApi.ProductsSlice.default,
        mobileProduct: SlicesApi.MobileProductSlice.default,
        laptopProduct: SlicesApi.LabtopProductsSlice.default,
        productDetail: SlicesApi.ProductByIdSlice.default,
        searchProductData: SlicesApi.searchProductSlice.default,
        auth: userSlice.auth.default,
        pageLevelLoading: commonSlice.pageLevelLoading.default,
        componentLoading: commonSlice.componentLevelLoading.default,
        productComparisonData: commonSlice.ProductComparison.default,
        profile: userSlice.profile.default,
        showAdminSlide: commonSlice.showAdminSlide.default,

        //upload
        uploadFileData: userSlice.UploadSlice.default,
        //cart
        addToCart: cartSlice.AddTocartSlice.default,
        allCart: cartSlice.GetAllCartSlice.default,
        showCart: commonSlice.showCartSlice.default,
        deleteCart: cartSlice.deleteCartSlice.default,
        //address
        allAddresses: addresSlice.getAllAddresses.default,
        updateAddressData: addresSlice.updateAddressSlice.default,
        updateDefaultAddress: addresSlice.updateDefaultAddressSlice.default,
        deleteAddressData: addresSlice.deleteAddressSlice.default,
        addToAddressData: addresSlice.addToAddressSlice.default,
        //order
        allOrder: OrderSlice.getAllOrderSlice.default,
        cancelOrder: OrderSlice.cancelOrderSlice.default,
        //checkout
        checkoutWithCartData: checkoutSlice.checkoutWithCartSlice.default,
        checkoutWithAuthenticationData:
            checkoutSlice.checkoutWithAuthenticationSlice.default,
        //catalog
        branchData: catalogsSlice.getAllBrandsSlice.default,
        categoriesData: catalogsSlice.getAllCategoriesSlice.default,
        needsData: catalogsSlice.getAllNeedsSlice.default,
        //register
        registerData: userSlice.registerSlice.default,
        resetPassword: userSlice.resetPasswordSlice.default,
        createReview: reviewsSlice.createReviewSlice.default,
        //review
        allReview: reviewsSlice.getAllReviewSlice.default,
        //admin
        authAmin: adminEmployeesSlice.AdminLoginSlice.default,
        adminRole: commonSlice.adminRole.default,
        //admin product
        adminAllProduct: adminProductSlice.AdminGetAllProduct.default,
        adminCreateProductData: adminProductSlice.AdminCreateNewProduct.default,
        adminDeleteProductData: adminProductSlice.AdminDeleteProduct.default,
        adminUpdateProductData: adminProductSlice.AdminUpdateProduct.default,
        //admin employee
        adminGetAllEmployeesData:
            adminEmployeestSlice.AdminGetAllEmployees.default,
        adminCreateEmployeeData:
            adminEmployeestSlice.AdminCreateEmployee.default,
        adminUpdateEmployeeData:
            adminEmployeestSlice.AdminUpdateEmployee.default,
        adminDeleteEmployeeData:
            adminEmployeestSlice.AdminDeleteEmployee.default,
        adminGetEmployeeByIdData:
            adminEmployeestSlice.AdminGetEmployeeId.default,
        //admin brand
        adminBrandsData: adminbrandsSlice.AdminGetBransByParams.default,
        // admin category
        adminCategoriesData:
            adminCategoriesSlice.AdminGetCategoriesByParams.default,
        //admin need
        adminNeedsData: adminNeedsSlice.AdminGetNeedsByParams.default,

        //admin roles
        listRolesAdmin: AdminRolesSlice.AdminGetListRolesSlice.default,
        listPermissionsAdmin:
            AdminRolesSlice.AdminGetListPermissionsSlice.default,
        //admin order
        listOrderData: AdminOrderSlice.AdminGetListOrderSlice.default,
        orderDetailData: AdminOrderSlice.AdminGetOrderDetailSlice.default,
        // admin supplier
        listSuplierData: AdminSupplierSlice.AdminGetListSupplierSlice.default,
        suplierDetailData: AdminSupplierSlice.AdminGetSupplierSlice.default,
        //discount
        allDiscountData: adminDiscount.AdminGetAllDiscount.default,
        //inventory
        allInventory: adminInventory.AdminGetAllInventory.default,
        allImports: adminInventory.AdminGetAllImports.default,
        importShipmentData: adminInventory.AdminGetImportShipment.default,
        //customer
        listCustomnerData: adminCustomerSlice.AdminGetListCustomer.default,
        //review
        listReviewData: adminReviewSlices.AdminGetListReviewSlice.default,
        detailReviewData: adminReviewSlices.AdminGetDetailReviewSlice.default,
        //dashboard
        productSelingData: adminDashboardSlices.getProductSelingSlice.default,
        employeeSelingData: adminDashboardSlices.getEmployeeSelingSlice.default,
        orderRecentData: adminDashboardSlices.getOrderRecentSlice.default,
        amountNeedsData: adminDashboardSlices.getAmountNeedSlice.default,
        amountBrandData:
            adminDashboardSlices.getAmountSoldOfBrandsSlice.default,
        amountCategoriesData:
            adminDashboardSlices.getAmountSoldOfCategoriesSlice.default,
        chartOverviewData: adminDashboardSlices.getChartOverviewSlice.default,
        chartRevenueAndProfitData:
            adminDashboardSlices.getChartRevenueAndProfitSlice.default,
        chartOrderData: adminDashboardSlices.getChartorderSlice.default,
        parametersData: adminDashboardSlices.AdminGetParametersSlice.default,
        numberSlide: commonSlice.numberSlideSlide.default,
    },
    middleware: [thunk],
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

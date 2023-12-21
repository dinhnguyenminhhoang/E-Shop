import InputForm from "@/Components/FormData/InputForm/InputForm";
import ComponentLevelLoader from "@/Components/Loader/componentlevel";
import Notification from "@/Components/PageLoader/Notification";
import { UserType } from "@/common";
import { loginFormControls } from "@/utils/Data";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsLoggedInAdmin } from "../Slices/admin/AdminLoginSlice";
import { setRoleAdmin } from "../Slices/common/adminRole";
import { setComponentLevelLoading } from "../Slices/common/componentLeveLoadingSlice";
import { login } from "../action/UserAction";
import { AdminLogin } from "../action/adminAction/adminEmployees";
const initialFormdata = {
    email: "",
    password: "",
};

export default function Login() {
    const [formData, setFormData] =
        useState<UserType.userLoginType>(initialFormdata);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const data = useSelector(
        (state: { auth: UserType.AuthState }) => state.auth.data
    );
    const adminAuthData = useSelector((state: any) => state.authAmin.data);
    const err = useSelector(
        (state: { auth: UserType.AuthState }) => state.auth.error
    );
    const isLoggedIn = useSelector(
        (state: { auth: UserType.AuthState }) => state.auth.isLoggedIn
    );
    const componentLoading = useSelector(
        (state: any) => state.componentLoading.componentLevelLoading
    );
    const route = useNavigate();
    const pathname = window.location.pathname;
    const handleLogin = async () => {
        if (isValidForm()) {
            dispatch(setComponentLevelLoading({ loading: true, id: "" }));
            if (pathname.includes("/admin")) {
                const res = await dispatch(AdminLogin(formData));
                if (res.payload.success) {
                    Cookies.set("AdminToken", res.payload?.data?.accessToken);
                    const decodedValue = jwtDecode(
                        res.payload.data?.accessToken
                    ) as {
                        permissions: {}[];
                    };
                    dispatch(setRoleAdmin(decodedValue.permissions));
                    Cookies.set(
                        "accessTokenExpiredInAdmin",
                        res.payload?.data?.accessTokenExpiredIn
                    );
                    Cookies.set(
                        "refreshTokenAdmin",
                        res.payload?.data?.refreshToken
                    );
                    Cookies.set(
                        "refreshTokenExpiredInAdmin",
                        res.payload?.data?.refreshTokenExpiredIn
                    );
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    dispatch(setIsLoggedInAdmin(true));
                    toast.success("đăng nhập thành công", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    route("/admin/dashboard");
                } else {
                    dispatch(
                        setComponentLevelLoading({ loading: false, id: "" })
                    );
                    toast.error(
                        `đăng nhập thất bại ${adminAuthData?.message || ""}`
                    );
                }
            } else {
                const res = await dispatch(login(formData));
                try {
                    if (res.payload.success) {
                        Cookies.set("token", res.payload?.data?.accessToken);
                        Cookies.set(
                            "accessTokenExpiredIn",
                            res.payload?.data?.accessTokenExpiredIn
                        );
                        toast.success("đăng nhập thành công", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        dispatch(
                            setComponentLevelLoading({ loading: false, id: "" })
                        );
                        route("/");
                    } else {
                        toast.error(
                            `tài khoản không tồn tại ${res.payload.message}`,
                            {
                                position: toast.POSITION.TOP_RIGHT,
                            }
                        );
                        dispatch(
                            setComponentLevelLoading({ loading: false, id: "" })
                        );
                    }
                } catch (error) {}
            }
        } else {
            toast.error("vui lòng nhập đầy đủ thông tin", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const isValidForm = () => {
        return formData &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    };
    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col  h-[90vh] justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mr-0 mb-0 ml-0 relative max-w-2xl lg:w-5/12">
                        <div className="flex md:min-w-[600px]   shadow-custom  flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                Login
                            </p>
                            <img
                                src="https://ucarecdn.com/65cacc2d-da49-4270-bae8-1658ae458ec4/-/preview/1024x1024/-/quality/smart_retina/-/format/auto/"
                                className="h-[160px] mt-2 object-cover object-center rounded-lg"
                                alt=""
                            />
                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                {loginFormControls.map((controlItem) =>
                                    controlItem.componentType === "input" ? (
                                        <InputForm
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={
                                                controlItem.placeholder
                                            }
                                            lable={controlItem.label}
                                            value={
                                                formData[
                                                    controlItem.id as keyof typeof formData
                                                ]
                                            }
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setFormData({
                                                    ...formData,
                                                    [controlItem.id]:
                                                        event.target.value,
                                                });
                                            }}
                                        />
                                    ) : null
                                )}
                                <button
                                    disabled={componentLoading.loading === true}
                                    onClick={handleLogin}
                                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                                >
                                    {componentLoading.loading === true ? (
                                        <ComponentLevelLoader
                                            text={"loging"}
                                            color={"#ffffff"}
                                            loading={componentLoading.loading}
                                        />
                                    ) : (
                                        "login"
                                    )}
                                </button>
                                {!pathname.includes("/admin") ? (
                                    <div className="flex gap-2 text-sm mt-4 text-center justify-center">
                                        <span>You don't have account ? </span>
                                        <nav
                                            onClick={() =>
                                                navigate("/register")
                                            }
                                            className="text-red-500 underline cursor-pointer"
                                        >
                                            register
                                        </nav>
                                        <span>or</span>
                                        <nav
                                            onClick={() =>
                                                navigate("/reset-password")
                                            }
                                            className="text-red-500 underline cursor-pointer"
                                        >
                                            forgot password
                                        </nav>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

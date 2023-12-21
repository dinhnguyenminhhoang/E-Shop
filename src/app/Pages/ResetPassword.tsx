import { useEffect, useState } from "react";
import { GoKey } from "react-icons/go";
import { MdOutlineAirlineStops } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../action/UserAction";
const ResetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [reset, setreset] = useState<string>("");
    const route = useNavigate();
    const pamram = useParams();
    const resetPasswordData = useSelector(
        (state: any) => state.resetPassword.data
    );

    useEffect(() => {
        const token = pamram.token?.replaceAll("@", ".");
        if (token) setToken(token);
    }, [pamram]);
    const dispatch = useDispatch<any>();
    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };
    const handleGetToken = () => {
        dispatch(resetPassword({ email: email })).then((response: any) => {
            if (response.payload.success) {
                toast.success("vui lòng kiểm tra email để xác nhận");
                setEmail("");
            }
        });
    };
    const handleResetPassword = () => {
        if (password.trim() !== "" && token.trim() !== "") {
            dispatch(resetPassword({ password: password, token: token })).then(
                (response: any) => {
                    if (response.payload.success) {
                        toast.success(
                            "đặt lại mật khẩu thành công! đợi 1s để quay lại đăng nhập"
                        );
                        setPassword("");
                        setTimeout(() => {
                            route("/login");
                        }, 1000);
                    }
                }
            );
        }
    };
    return !pamram.token ? (
        <div className="max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Reset password</h1>
            <div className="my-10">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">
                            Email address
                        </p>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter email address"
                        />
                    </label>

                    <button
                        onClick={handleGetToken}
                        className="w-full py-3 font-medium text-white bg-custom-primary opacity-80 hover:opacity-100 rounded-lg border-custom-primary hover:shadow inline-flex space-x-2 items-center justify-center"
                    >
                        <GoKey className="w-6 h-6" />
                        <span>Reset password</span>
                    </button>
                    <div className="text-center">
                        <p>Not registered yet?</p>
                        <div
                            onClick={() => route("/register")}
                            className="underline cursor-pointer text-custom-primary font-medium inline-flex space-x-1 items-center"
                        >
                            <span>Register now </span>
                            <div>
                                <MdOutlineAirlineStops className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mx-auto mt-24">
            <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                    xác nhận password
                </h2>
                <p className="text-md md:text-xl">nhập password mới</p>
            </div>
            <div className="flex flex-col max-w-md space-y-5">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                />
                <button
                    onClick={handleResetPassword}
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-custom-bg_button bg-custom-bg_button text-white"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;

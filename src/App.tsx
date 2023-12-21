import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "./app/Layout/DefaultLayout/DefaultLayout";
import { privateRouter, publishRouter } from "./app/routers";
import { useEffect } from "react";
import "./global.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setIsLoggedInAdmin } from "./app/Slices/admin/AdminLoginSlice";
import { useSelector } from "react-redux";
import UnauthorizedPage from "./app/Pages/UnauthorizedPage";
function App() {
    const isLoggedInAdmin = useSelector(
        (state: any) => state.authAmin.isLoggedInAdmin
    );
    useEffect(() => {
        const AdminToken = Cookies.get("AdminToken");
        const accessTokenExpiredInAdmin = Cookies.get(
            "accessTokenExpiredInAdmin"
        ) as string;
        if (accessTokenExpiredInAdmin !== undefined) {
            const expirationTime = new Date(accessTokenExpiredInAdmin);
            expirationTime.setDate(expirationTime.getDate() + 2);
            const currentTime = new Date();
            const isAccessTokenExpired = expirationTime < currentTime;
            if (isAccessTokenExpired) {
                setIsLoggedInAdmin(false);
            }
        }
        if (!AdminToken && window.location.pathname.includes("/admin")) {
            if (window.location.pathname === "/admin/login") {
                // toast("bạn đang đăng nhập với tư cách quản lí");
            } else window.location.href = "/";
        }
    }, []);
    return (
        <Router>
            <div>
                <Routes>
                    {publishRouter.map((route, index) => {
                        let Layout = DefaultLayout;
                        const Page = route.element;
                        if (route.Layout) {
                            Layout = route.Layout;
                        } else if (route.Layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {isLoggedInAdmin || Cookies.get("AdminToken")
                        ? privateRouter.map((route, index) => {
                              let Layout = DefaultLayout;
                              const Page = route.element;
                              if (route.Layout) {
                                  Layout = route.Layout;
                              } else if (route.Layout === null) {
                                  Layout = Fragment;
                              }
                              return (
                                  <Route
                                      key={index}
                                      path={route.path}
                                      element={
                                          <Layout>
                                              <Page />
                                          </Layout>
                                      }
                                  />
                              );
                          })
                        : null}
                    <Route
                        path="*"
                        element={
                            <>
                                <UnauthorizedPage />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

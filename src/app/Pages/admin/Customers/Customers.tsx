import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import {
    adminDeleteCustomer,
    getListCustomer,
} from "@/app/action/adminAction/adminCustomer";
import { pagingType } from "@/common/paging";
import { profileType } from "@/common/user";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiBookmarkPlus, CiEdit, CiImport } from "react-icons/ci";
import { MdClear, MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddAndUpdateCustomer from "./addAndUpdateCustomer";

const Customers = () => {
    const dispatch = useDispatch<any>();
    const listCustomnerData = useSelector(
        (state: any) =>
            state.listCustomnerData.data as {
                data: { list: profileType[]; paging: pagingType };
            }
    );
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPage: 1,
        pageSize: 6,
    });
    const [allCustomers, setAllCustomers] = useState<profileType[]>([]);
    const [customerDataUpdate, setCustomerDataUpdate] = useState<profileType>();
    const [searchValue, setSearchValue] = useState("");
    const [zoomImg, setZoomImg] = useState<string>("");
    const [isNewCustomer, setIsNewCustomer] = useState<boolean>(false);
    const [isModalDelete, setIsModaleDelete] = useState<boolean>(false);
    const [idCustomerDelete, setIdCustomerDelete] = useState<number>(0);
    const [confirmationDelete, setConfirmationDelete] =
        useState<boolean>(false);
    useEffect(() => {
        dispatch(getListCustomer({ pageSize: 6, pageIndex: 1 }));
    }, [dispatch]);
    useEffect(() => {
        if (listCustomnerData && listCustomnerData?.data?.paging) {
            setPagination({
                currentPage: listCustomnerData.data.paging.pageIndex || 1,
                totalPage: listCustomnerData.data.paging.totalPages || 1,
                pageSize: listCustomnerData.data.paging.pageSize || 1,
            });
        }
        if (listCustomnerData?.data?.list) {
            setAllCustomers(listCustomnerData?.data?.list);
        }
    }, [listCustomnerData]);
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (searchValue.trim() !== "") {
                dispatch(
                    getListCustomer({
                        pageSize: 6,
                        pageIndex: newPage,
                        name: searchValue,
                    })
                );
            } else {
                dispatch(getListCustomer({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleZoomImg = (img: string) => {
        if (zoomImg === "") {
            setZoomImg(img);
        } else {
            setZoomImg("");
        }
    };
    useEffect(() => {
        if (zoomImg) {
            const checkImg = setTimeout(() => {
                setZoomImg("");
            }, 2000);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            () => clearTimeout(checkImg);
        }
    }, [zoomImg]);
    const handleSearchCustomer = () => {
        if (searchValue.trim() !== "") {
            dispatch(
                getListCustomer({
                    pageSize: 6,
                    pageIndex: pagination.currentPage,
                    name: searchValue,
                })
            );
        } else {
            toast.error("vui lòng nhập tên điện thoại cần tìm");
        }
    };
    const handleResetSearchCustomer = () => {
        dispatch(
            getListCustomer({
                pageSize: 6,
                pageIndex: pagination.currentPage,
            })
        );
        setSearchValue("");
    };
    const handleConfirmDeleteCustomer = (id: number) => {
        setIsModaleDelete(true);
        setIdCustomerDelete(id);
    };
    const handleDeleteCustomer = async () => {
        const response = await dispatch(adminDeleteCustomer(idCustomerDelete));

        if (response.payload?.success) {
            toast.success("xóa phẩm thành công! vui lòng xem lại danh sách");
            setConfirmationDelete(false);
            setIdCustomerDelete(0);
            dispatch(
                getListCustomer({
                    pageSize: 100,
                    pageIndex: 1,
                })
            );
        } else {
            toast.error(
                "xóa khách hàng thất bại! vui lòng kiểm tra lại dánh sách khách hàng"
            );
            setConfirmationDelete(false);
            setIdCustomerDelete(0);
        }
    };
    useEffect(() => {
        if (confirmationDelete && idCustomerDelete > 0) {
            handleDeleteCustomer();
        }
    }, [confirmationDelete, idCustomerDelete]);
    return (
        <div className="flex flex-col p-4">
            <h1 className="my-6 text-lg font-bold text-gray-300">
                Customers management
            </h1>
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                        <div className="items-center">
                            <div className="lg:flex md:flex flex-grow-0">
                                <div className="flex">
                                    <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                                        <button
                                            onClick={() =>
                                                setIsNewCustomer(true)
                                            }
                                            className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 text-gray-300 cursor-pointer h-10 min-w-[120px] rounded-md focus:outline-none"
                                        >
                                            <CiBookmarkPlus size={22} />
                                            <span className="text-xs">
                                                Thêm mới (+)
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <input
                                className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none text-gray-300 leading-5 rounded-md  focus:bg-gray-700 border-gray-600 focus:border-gray-500 bg-gray-700"
                                type="search"
                                name="search"
                                placeholder="tìm kím theo tên khách hàng"
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <div className="w-full mx-1">
                                <button
                                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 h-12 w-full"
                                    onClick={handleSearchCustomer}
                                >
                                    Filter
                                </button>
                            </div>
                            <div className="w-full mx-1">
                                <button
                                    className="align-bottom  leading-5 transition-colors duration-150 font-medium  text-gray-400 focus:outline-none rounded-lg border border-gray-200  w-full mr-3 flex items-center justify-center cursor-pointer h-12 px-4 md:py-1 py-2  text-sm bg-gray-700"
                                    onClick={handleResetSearchCustomer}
                                >
                                    <span className="text-gray-200">Reset</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {allCustomers?.length ? (
                <div style={{ overflowY: "auto" }}>
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">ID</td>
                                <td className="px-4 py-2">EMAIL</td>
                                <td className="px-4 py-2">IMAGE</td>
                                <td className="px-4 py-2">FULLNAME</td>
                                <td className="px-4 py-2">PHONENUMBER</td>
                                <td className="px-4 py-2">GENDER</td>
                                <td className="px-4 py-2 text-right">ACTION</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-400">
                            {allCustomers?.length > 0 &&
                                allCustomers.map((customer) => (
                                    <tr
                                        className="bg-custom-addmin_bg"
                                        key={customer.id}
                                    >
                                        <td className="px-4 py-2 ">
                                            <span className="font-semibold uppercase text-xs">
                                                {customer.id}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="font-semibold uppercase text-xs">
                                                {customer.email}
                                            </span>
                                        </td>
                                        <td
                                            className={`px-4 py-2 cursor-pointer ${
                                                zoomImg === customer.avatarUrl
                                                    ? "fixed top-0 left-0 w-full h-full bg-slate-950 flex justify-center items-center z-30"
                                                    : null
                                            }`}
                                            onClick={() =>
                                                handleZoomImg(
                                                    customer.avatarUrl
                                                )
                                            }
                                        >
                                            <img
                                                src={customer.avatarUrl}
                                                alt=""
                                                className={`w-[30px] h-[30px] object-contain ${
                                                    zoomImg
                                                        ? "w-full h-full"
                                                        : null
                                                }`}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="text-sm">
                                                {`${customer.firstName} ${customer.lastName}`}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {customer.phoneNumber}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <span className="text-sm">
                                                {customer.gender ? "nam" : "nữ"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 ">
                                            <div className="flex justify-end">
                                                <div className="flex justify-between items-center gap-2">
                                                    <Tippy
                                                        content="Chỉnh sửa"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                setIsNewCustomer(
                                                                    true
                                                                );
                                                                setCustomerDataUpdate(
                                                                    customer
                                                                );
                                                            }}
                                                            className="hover:text-custom-Colorprimary transition-all"
                                                        >
                                                            <CiEdit size={22} />
                                                        </button>
                                                    </Tippy>
                                                    <Tippy
                                                        content="xóa"
                                                        placement="bottom"
                                                        delay={100}
                                                        className="border text-custom-Colorprimary border-custom-Colorprimary rounded-md px-1"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleConfirmDeleteCustomer(
                                                                    customer.id ||
                                                                        0
                                                                )
                                                            }
                                                            className="hover:text-custom-bg_button"
                                                        >
                                                            <AiOutlineDelete
                                                                size={22}
                                                            />
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {pagination && listCustomnerData?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={pagination}
                            paging={listCustomnerData.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có khách hàng nào hợp lệ
                </div>
            )}
            {isNewCustomer && (
                <AddAndUpdateCustomer
                    isNewCustomer={isNewCustomer}
                    setIsNewCustomer={setIsNewCustomer}
                    customerDataUpdate={
                        customerDataUpdate ? customerDataUpdate : undefined
                    }
                    setCustomerDataUpdate={setCustomerDataUpdate}
                />
            )}
            <CenterModal
                show={isModalDelete}
                setShow={setIsModaleDelete}
                isBorder={false}
                bgAll="h"
                mainContent={
                    <div className="relative w-full h-full md:h-auto m-auto">
                        <div className="relative p-4 text-center rounded-lg shadow bg-gray-800 sm:p-5">
                            <button
                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                                onClick={() => setIsModaleDelete(false)}
                            >
                                <MdClear />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <MdOutlineDeleteOutline className="text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                            <p className="mb-4  text-gray-300">
                                Bạn có chắc muốn xóa khách hàng này không ?
                            </p>
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => setIsModaleDelete(false)}
                                    className="py-2 px-3 text-sm font-medium rounded-lg border  hover: focus:ring-4 focus:outline-none focus:ring-primary-300  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                                >
                                    Đóng
                                </button>
                                <button
                                    onClick={() => {
                                        setIsModaleDelete(false);
                                        setConfirmationDelete(true);
                                    }}
                                    className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none  bg-red-500 hover:bg-red-600 focus:ring-red-900"
                                >
                                    xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                }
            />
            <Notification />
        </div>
    );
};

export default Customers;

import SelecterLab from "@/Components/FormData/Selecter/SelecterLab";
import CenterModal from "@/Components/Modal/CenterModal/CenterModal";
import Notification from "@/Components/PageLoader/Notification";
import Paginations from "@/Components/Paginations/Paginations";
import {
    adminCreateRole,
    adminDeleteRole,
    adminUpdateRole,
    getAllPermissions,
    getListRoles,
} from "@/app/action/adminAction/adminRoles";
import { pagingType } from "@/common/paging";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit, CiExport } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Filter from "../Catalog/Filter";
const initFormData = {
    name: "",
    permissions: [] as string[],
};

const RoleManager = () => {
    const dispatch = useDispatch<any>();
    const listRolesAdmin = useSelector(
        (state: any) => state.listRolesAdmin.data
    ) as { data: { list: any; paging: pagingType }; success: boolean };
    const listPermissionsAdmin = useSelector(
        (state: any) => state.listPermissionsAdmin.data
    );
    const adminRole = useSelector((state: any) => state.adminRole.data);
    const [searchValue, setSearchValue] = useState<string>("");
    const [permissions, setPermissions] = useState<{}[]>([{}]);
    const [isNewRole, setISNewRole] = useState<boolean>(false);
    const [formData, setFormData] = useState<typeof initFormData>(initFormData);
    const [isUpdateRole, setISUpdateRole] = useState<boolean>(false);
    const [roleIdUpdateOrDelete, setRoleIdUpdateOrDelete] = useState<number>();
    const [roleData, setRoleData] = useState<[]>([]);
    const handleSearchRole = () => {
        if (searchValue.trim() !== "" && listRolesAdmin.data.paging.pageIndex) {
            dispatch(
                getListRoles({
                    pageSize: 6,
                    pageIndex: listRolesAdmin.data.paging.pageIndex,
                    name: searchValue,
                })
            );
        }
    };
    useEffect(() => {
        dispatch(getListRoles({ pageIndex: 1, pageSize: 6 }));
        dispatch(getAllPermissions());
    }, [dispatch]);
    useEffect(() => {
        if (listPermissionsAdmin?.success) {
            setPermissions(listPermissionsAdmin?.data);
        }
    }, [listPermissionsAdmin]);
    useEffect(() => {
        if (listRolesAdmin.success && listRolesAdmin?.data?.list) {
            setRoleData(listRolesAdmin.data.list);
        }
    });
    const handlePageChange = (newPage: number, oldPage: number) => {
        if (newPage > 0 && oldPage > 0) {
            if (searchValue.trim() !== "") {
                dispatch(
                    getListRoles({
                        pageSize: 6,
                        pageIndex: newPage,
                        name: searchValue.trim(),
                    })
                );
            } else {
                dispatch(getListRoles({ pageSize: 6, pageIndex: newPage }));
            }
        }
    };
    const handleResetRoles = () => {
        setSearchValue("");
        dispatch(
            getListRoles({
                pageSize: 6,
                pageIndex: listRolesAdmin.data.paging.pageIndex || 1,
            })
        );
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleAddOrUpdateRoles = async () => {
        if (formData.name.trim() !== "" && formData.permissions.length) {
            if (!isUpdateRole) {
                const res = await dispatch(adminCreateRole({ ...formData }));
                try {
                    if (res.payload.success) {
                        dispatch(
                            getListRoles({
                                pageIndex:
                                    listRolesAdmin.data.paging.pageIndex || 1,
                                pageSize:
                                    listRolesAdmin.data.paging.pageSize || 6,
                            })
                        );
                        toast.success("tạo mới vài trò thành công!");
                        setFormData(initFormData);
                        setISNewRole(false);
                        setRoleIdUpdateOrDelete(0);
                    } else {
                        toast.error(
                            `tạo mới vài trò thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            } else if (roleIdUpdateOrDelete && roleIdUpdateOrDelete > 0) {
                const res = await dispatch(
                    adminUpdateRole({
                        ...formData,
                        roleId: roleIdUpdateOrDelete,
                    })
                );
                try {
                    if (res.payload.success) {
                        dispatch(
                            getListRoles({
                                pageIndex:
                                    listRolesAdmin.data.paging.pageIndex || 1,
                                pageSize:
                                    listRolesAdmin.data.paging.pageSize || 6,
                            })
                        );
                        toast.success("Chỉnh sửa vài trò thành công!");
                        setFormData(initFormData);
                        setISNewRole(false);
                    } else {
                        toast.error(
                            `Chỉnh sửa vài trò thất bại! ${res.payload.message}`
                        );
                    }
                } catch (error) {
                    toast.error(
                        `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                    );
                }
            }
        }
    };
    const handleDeleteRole = async (id: number) => {
        if (id > 0) {
            const res = await dispatch(adminDeleteRole(id));
            try {
                if (res.payload.success) {
                    toast.success("xóa vài trò thành công!");
                    dispatch(
                        getListRoles({
                            pageIndex:
                                listRolesAdmin.data.paging.pageIndex || 1,
                            pageSize: listRolesAdmin.data.paging.pageSize || 6,
                            name: searchValue,
                        })
                    );
                } else {
                    toast.error(`xóa vài trò thất bại! ${res.payload.message}`);
                }
            } catch (error) {
                toast.error(
                    `sảy ra lỗi ở máy chủ! vui lòng chở trong giây lát}`
                );
            }
        }
    };
    const handleEditRole = (role: any) => {
        setISNewRole(true);
        setISUpdateRole(true);
        setFormData({ name: role.name, permissions: role.permissions });
        setRoleIdUpdateOrDelete(role.id);
    };
    const handleGetOptionBySelect = (option: any, typeId: string) => {
        const cpOption = [] as string[];
        if (option.length) {
            option.filter((item: { name: string; value: string }) =>
                cpOption.push(item.value)
            );
        }
        setFormData({ ...formData, permissions: cpOption });
    };

    return (
        <div className="flex flex-col p-4">
            <div className="rounded-lg shadow-xs bg-gray-800 mb-5">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex items-center">
                        <div className="lg:flex md:flex flex-grow-0">
                            <button
                                onClick={() => setISNewRole(true)}
                                className="border flex justify-center items-center gap-1 border-gray-300 hover:border-emerald-400 hover:text-emerald-400 text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
                            >
                                <CiExport size={22} />
                                <span className="text-xs">Tạo mới</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Filter
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                handleSearch={handleSearchRole}
                handleReset={handleResetRoles}
                placeholder="tìm kiếm theo tên role"
            />
            {roleData.length > 0 ? (
                <div className="w-full overflow-hidden border  border-gray-700 rounded-lg mb-8 rounded-b-lg">
                    {listRolesAdmin.data.list ? (
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b  border-gray-700  text-gray-400 bg-gray-800">
                                    <tr>
                                        <td className="px-4 py-2">ID</td>
                                        <td className="px-4 py-2">NAME</td>
                                        <td className="px-4 py-2">
                                            LIST PERMISSIONS
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            ACTIONS
                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="divide-y  divide-gray-700 bg-gray-800  text-gray-400">
                                    {roleData &&
                                        roleData.map((item: any) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2">
                                                    <span className="text-sm">
                                                        {item.id}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <span className="text-sm font-semibold">
                                                        {item.name}
                                                    </span>
                                                </td>
                                                <td
                                                    className="px-4 py-2 flex flex-wrap gap-1 leading-6 item-center"
                                                    style={{
                                                        maxWidth: "800px",
                                                    }}
                                                >
                                                    {item?.permissions?.map(
                                                        (
                                                            permission: string
                                                        ) => (
                                                            <span
                                                                key={permission}
                                                                className="text-sm font-semibold"
                                                            >
                                                                {` ${permission} -`}
                                                            </span>
                                                        )
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex justify-end text-right">
                                                        <button
                                                            onClick={() =>
                                                                handleEditRole(
                                                                    item
                                                                )
                                                            }
                                                            className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                                        >
                                                            <CiEdit size={22} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteRole(
                                                                    item.id
                                                                )
                                                            }
                                                            className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                                        >
                                                            <AiOutlineDelete
                                                                size={22}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                    {listRolesAdmin?.data?.paging && (
                        <Paginations
                            handlePageChange={handlePageChange}
                            pagination={{
                                currentPage:
                                    listRolesAdmin.data.paging.pageIndex || 0,
                                totalPage:
                                    listRolesAdmin.data.paging.totalPages || 0,
                            }}
                            paging={listRolesAdmin.data.paging}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full font-bold text-white text-2xl">
                    không có sản phẩm nào hợp lệ
                </div>
            )}
            <CenterModal
                show={isNewRole}
                setShow={setISNewRole}
                showModalTitle={true}
                modalTitle={
                    <h1 className="text-2xl font-bold text-white">
                        {isUpdateRole ? "Chỉnh sửa Role" : "Tạo Role mới"}
                    </h1>
                }
                bgAll="bg"
                mainContent={
                    <div className="flex flex-col justify-between items-start gap-4">
                        <div className="w-full">
                            <p className="text-gray-300 text-sm text-start mb-1">
                                tên :
                            </p>
                            <input
                                className="w-full h-[48px] px-2 rounded-[8px]"
                                type="text"
                                value={formData.name}
                                name="name"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOnChange(e)}
                                placeholder="nhập tên vài trò"
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-gray-300 text-sm text-start">
                                chọn quyền hạng :
                            </p>
                            {permissions.length ? (
                                <SelecterLab
                                    valueUpdate={formData.permissions}
                                    isMulti
                                    options={permissions}
                                    handleGetOptionBySelect={
                                        handleGetOptionBySelect
                                    }
                                    typeId="permission"
                                />
                            ) : null}
                        </div>
                    </div>
                }
                showButtons={true}
                buttonComponent={
                    <div className="flex gap-2 justify-center mb-2">
                        <button
                            onClick={handleAddOrUpdateRoles}
                            className="px-4 py-2 border-b-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                        >
                            {isUpdateRole ? "Chỉnh sửa" : "Tạo"}
                        </button>
                        <button
                            onClick={() => {
                                setISNewRole(false);
                                setISUpdateRole(false);
                                if (
                                    formData.name ||
                                    formData.permissions.length
                                ) {
                                    setFormData(initFormData);
                                }
                            }}
                            className="px-4 py-2 border-b-4 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                        >
                            Đóng
                        </button>
                    </div>
                }
            />
            <Notification />
        </div>
    );
};

export default RoleManager;

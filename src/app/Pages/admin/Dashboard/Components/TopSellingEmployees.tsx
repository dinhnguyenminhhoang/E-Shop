import { useEffect, useState } from "react";
import { handleFomatDate } from "../Common/Utils";
import DropDownDateRange, { DateRangeType } from "./DropDownDateRange";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesSeling } from "@/app/action/adminAction/adminDashboard";
import { employeeSeling } from "@/common/employee";
const initFormParam = {
    StartDate: "",
    EndDate: "",
};
const TopSellingEmployees = () => {
    const [formParam, setFormParam] =
        useState<typeof initFormParam>(initFormParam);
    const dispatch = useDispatch<any>();
    const employeeSelingData = useSelector(
        (state: any) => state.employeeSelingData.data
    );
    useEffect(() => {
        dispatch(getEmployeesSeling({ Limit: 10 }));
    }, [dispatch]);
    useEffect(() => {
        if (formParam.StartDate !== "" && formParam.EndDate !== "") {
            dispatch(
                getEmployeesSeling({
                    Limit: 10,
                    StartDate: formParam.StartDate,
                    EndDate: formParam.EndDate,
                })
            );
        }
    }, [formParam, dispatch]);
    const onChanged = (dateRage: DateRangeType) => {
        if (dateRage.startDate && dateRage.endDate) {
            const startDate = handleFomatDate(dateRage.startDate);
            const endDate = handleFomatDate(dateRage.endDate);
            setFormParam({ EndDate: endDate, StartDate: startDate });
        }
    };
    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Top Selling Employees
                </h1>
                <div className="flex gap-1 items-center">
                    <DropDownDateRange onChanged={onChanged} />
                    <button
                        onClick={() =>
                            dispatch(getEmployeesSeling({ Limit: 10 }))
                        }
                        className="border px-2 rounded-md text-lg text-white"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2 mb-2"></div>
            <div className="overflow-auto">
                {employeeSelingData &&
                employeeSelingData?.success &&
                employeeSelingData?.data?.length > 0 ? (
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
                            <tr>
                                <td className="px-4 py-2">EMPLOYEE</td>
                                <td className="px-4 py-2">GENDER</td>
                                <td className="px-4 py-2">QUANTITY SOLD</td>
                                <td className="px-4 py-2">TOTAL VALUE</td>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-400">
                            {employeeSelingData?.data &&
                                employeeSelingData.data?.map(
                                    (employeeSeling: employeeSeling) => (
                                        <tr
                                            className="bg-custom-addmin_bg"
                                            key={employeeSeling.id}
                                        >
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-md overflow-hidden h-9 w-9">
                                                        <img
                                                            src={
                                                                employeeSeling.avatarUrl
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="text-sm">
                                                        {employeeSeling.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm">
                                                    {employeeSeling.gender
                                                        ? "male"
                                                        : "female"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-xs text-center">
                                                <span className="text-sm font-semibold">
                                                    {
                                                        employeeSeling.totalOrderSold
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-sm font-semibold">
                                                    {
                                                        employeeSeling.totalValueSold
                                                    }{" "}
                                                    VND
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="flex justify-center items-center text-white">
                        Không có sản phẩm nào
                    </h1>
                )}
            </div>
        </div>
    );
};

export default TopSellingEmployees;

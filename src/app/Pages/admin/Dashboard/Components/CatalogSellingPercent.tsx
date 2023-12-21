import {
    getChartAmountSoldOfCategories,
    getChartAmountSoldOfNeeds,
    getetChartAmountSoldOfBrands,
} from "@/app/action/adminAction/adminDashboard";
import { limitType } from "@/common/getAllType";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFomatDate } from "../Common/Utils";
import CustomActiveShapePieChart from "../Graph/CustomActiveShapePieChart";
import DropDown from "./DropDown";
import DateRangeDropdown, { DateRangeType } from "./DropDownDateRange";

const CatalogSellingPercent = () => {
    const dispatch = useDispatch<any>();

    const amountBrandData = useSelector(
        (state: any) => state.amountBrandData.data
    );
    const amountNeedsData = useSelector(
        (state: any) => state.amountNeedsData.data
    );
    const amountCategoriesData = useSelector(
        (state: any) => state.amountCategoriesData.data
    );
    const options = ["Category", "Brand", "Need"];
    const [data, setData] = useState<any>([]);
    const [activeCatalog, setActiveCatalog] = useState<string | null>(
        options[0]
    );
    const [reset, setReset] = useState<boolean>(false);
    const [formFaram, setFormFaram] = useState<limitType | null>();
    useEffect(() => {
        dispatch(getChartAmountSoldOfCategories({ Limit: 10 }));
        dispatch(getetChartAmountSoldOfBrands({ Limit: 100 }));
        dispatch(getChartAmountSoldOfNeeds({ Limit: 100 }));
    }, [dispatch]);
    useEffect(() => {
        if (amountCategoriesData?.success) {
            setData(amountCategoriesData?.data);
        }
    }, [amountCategoriesData]);
    useEffect(() => {
        if (activeCatalog === options[0]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                dispatch(
                    getChartAmountSoldOfCategories({
                        StartDate: formFaram.StartDate,
                        EndDate: formFaram.EndDate,
                        Limit: 10,
                    })
                );
            } else dispatch(getChartAmountSoldOfCategories({ Limit: 10 }));
        } else if (activeCatalog === options[1]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                dispatch(
                    getetChartAmountSoldOfBrands({
                        StartDate: formFaram.StartDate,
                        EndDate: formFaram.EndDate,
                        Limit: 10,
                    })
                );
            } else dispatch(getetChartAmountSoldOfBrands({ Limit: 100 }));
        } else if (activeCatalog === options[2]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                dispatch(
                    getChartAmountSoldOfNeeds({
                        StartDate: formFaram.StartDate,
                        EndDate: formFaram.EndDate,
                        Limit: 10,
                    })
                );
            } else dispatch(getChartAmountSoldOfNeeds({ Limit: 100 }));
        }
    }, [dispatch, activeCatalog, formFaram]);

    const handleDropdownChange = (selectedOption: string | null): void => {
        setActiveCatalog(selectedOption);
        switch (selectedOption) {
            case "Category":
                if (amountCategoriesData?.success)
                    setData(amountCategoriesData?.data);
                break;
            case "Brand":
                if (amountBrandData?.success) setData(amountBrandData?.data);
                break;
            case "Need":
                if (amountNeedsData?.success) setData(amountNeedsData?.data);
                break;
        }
    };
    const handleDateRangeChange = (dateRange: DateRangeType): void => {
        const startDate = handleFomatDate(dateRange.startDate);
        const endDate = handleFomatDate(dateRange.endDate);
        setFormFaram({ StartDate: startDate, EndDate: endDate });

        switch (activeCatalog) {
            case "Category":
                if (amountCategoriesData?.success)
                    setData(amountCategoriesData?.data);
                break;
            case "Brand":
                if (amountBrandData?.success) setData(amountBrandData?.data);
                break;
            case "Need":
                if (amountNeedsData?.success) setData(amountNeedsData?.data);
                break;
        }
    };
    return (
        <div className="rounded-md border-white border-2 p-3">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">
                    Sold Percent
                </h1>
                <div className="flex gap-2">
                    <DropDown
                        options={options}
                        defaultOption={options[0]}
                        isDisplaySelect={true}
                        onChange={handleDropdownChange}
                    />
                    <DateRangeDropdown onChanged={handleDateRangeChange} />
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2"></div>
            <div className="overflow-auto">
                <CustomActiveShapePieChart data={data} />
            </div>
        </div>
    );
};

export default CatalogSellingPercent;

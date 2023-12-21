import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { MdCalendarMonth, MdCheck } from "react-icons/md";

export type DateRangeType = {
    startDate: Date;
    endDate: Date;
    key: string;
};

interface DropDownDateRangeProps {
    onChanged?: (dateRage: DateRangeType) => void;
}

const DropDownDateRange: React.FC<DropDownDateRangeProps> = ({ onChanged }) => {
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<DateRangeType>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const handleSelect = (ranges: any) => {
        setDateRange(ranges.selection);
    };

    const handleToggleDatePicker = () => {
        setDatePickerOpen(!isDatePickerOpen);
    };

    const handleAfterChangeDate = () => {
        onChanged && onChanged(dateRange);
        handleToggleDatePicker();
    };
    return (
        <div className="relative">
            {isDatePickerOpen ? (
                <button
                    className="bg-emerald-600 text-xs text-white rounded"
                    onClick={handleAfterChangeDate}
                >
                    <MdCheck size={24} />
                </button>
            ) : (
                <div
                    onClick={handleToggleDatePicker}
                    className="text-white cursor-pointer"
                >
                    <MdCalendarMonth size={24} />
                </div>
            )}

            {isDatePickerOpen && (
                <div className="absolute top-full right-0 z-10 rounded-xl overflow-hidden">
                    <DateRangePicker
                        ranges={[dateRange]}
                        onChange={handleSelect}
                        rangeColors={["#059669"]}
                        maxDate={new Date()}
                    />
                </div>
            )}
        </div>
    );
};

export default DropDownDateRange;

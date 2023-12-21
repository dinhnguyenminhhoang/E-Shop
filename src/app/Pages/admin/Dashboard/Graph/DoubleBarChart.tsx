import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatNumberValue } from "../Common/Utils";

const renderTooltipContent = (o: any): React.ReactElement => {
    const { payload, label } = o;
    return (
        <div className="customized-tooltip-content bg-white p-2 rounded-md">
            <p className="total">{label}</p>
            <ul className="list">
                {payload?.map((entry: any, index: number) => (
                    <li
                        key={`item-${index}`}
                        style={{ color: entry.color }}
                        className="capitalize"
                    >
                        {`${entry.name}: ${entry.value} VND`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

type DataItemType = {
    at: string;
    revenue: number;
    profit: number;
};

interface DoubleBarChartProps {
    data: DataItemType[];
}

const DoubleBarChart: React.FC<DoubleBarChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={500} className="text-sm">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="at"
                    label={{
                        value: "TIME",
                        position: "insideBottomRight",
                        offset: 0,
                    }}
                />
                <YAxis
                    tickFormatter={formatNumberValue}
                    label={{
                        value: "VND",
                        angle: -90,
                        position: "insideLeft",
                        offset: 0,
                    }}
                />
                <Tooltip
                    cursor={{ fill: "#32649666" }}
                    content={renderTooltipContent}
                />
                <Legend
                    formatter={(value) => (
                        <span className="capitalize">{value}</span>
                    )}
                />
                <Bar dataKey="revenue" fill="#8884d8" />
                <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DoubleBarChart;

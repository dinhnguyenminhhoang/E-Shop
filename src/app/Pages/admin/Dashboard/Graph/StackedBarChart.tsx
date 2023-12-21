import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type DataItemType = {
    at: string;
    processing: number;
    delivering: number;
    shipped: number;
    cancelled: number;
};

interface StackedBarChartProps {
    data: DataItemType[];
}

const toPercent = (decimal: number, fixed: number = 0): string =>
    `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number): string => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any): React.ReactElement => {
    const { payload, label } = o;
    const total =
        payload &&
        payload?.reduce(
            (result: number, entry: any) => result + entry.value,
            0
        );

    return (
        <div className="customized-tooltip-content bg-white p-2 rounded-md">
            <p className="total">{`${label} (Total: ${total})`}</p>
            <ul className="list">
                {payload &&
                    payload?.map((entry: any, index: number) => (
                        <li
                            key={`item-${index}`}
                            style={{ color: entry.color }}
                            className="capitalize"
                        >
                            {`${entry.name}: ${entry.value} (${getPercent(
                                entry.value,
                                total
                            )})`}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={500} className="text-sm">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
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
                    label={{
                        value: "ORDER",
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
                <Bar dataKey="cancelled" stackId="1" fill="#ff6767" />
                <Bar dataKey="shipped" stackId="1" fill="#82ca9d" />
                <Bar dataKey="delivering" stackId="1" fill="#8884d8" />
                <Bar dataKey="processing" stackId="1" fill="#ff7300" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StackedBarChart;

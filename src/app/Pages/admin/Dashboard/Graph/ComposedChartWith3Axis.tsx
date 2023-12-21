import React from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatNumberValue } from "../Common/Utils";

type DataItemType = {
    at: string;
    orders: number;
    revenue: number;
    profit: number;
};

interface ComposedChartWith3AxisProps {
    data: DataItemType[];
}

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
                        {`${entry.name}: ${entry.value}`}
                        {["revenu", "profit"].includes(
                            entry.name.toLocaleLowerCase()
                        ) && " VND"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ComposedChartWith3Axis: React.FC<ComposedChartWith3AxisProps> = ({
    data,
}) => {
    return (
        <ResponsiveContainer width="100%" height={500} className="text-sm">
            <ComposedChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    bottom: 0,
                    right: 10,
                    left: 10,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                    dataKey="at"
                    label={{
                        value: "TIME",
                        position: "insideBottomRight",
                        offset: 0,
                    }}
                    scale="auto"
                />
                <YAxis
                    tickFormatter={formatNumberValue}
                    label={{
                        value: "VND",
                        angle: -90,
                        position: "insideBottomLeft",
                    }}
                    orientation="left"
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                        value: "ORDER",
                        angle: 90,
                        position: "insideBottomRight",
                    }}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend
                    verticalAlign="top"
                    formatter={(value) => (
                        <span className="capitalize">{value}</span>
                    )}
                />
                <Area
                    dataKey="profit"
                    type="monotone"
                    fill="#82ca9d"
                    stroke="#82ca9d"
                />
                <Bar dataKey="revenue" barSize={20} fill="#413ea0" />
                <Line
                    dataKey="orders"
                    type="monotone"
                    stroke="#ff7300"
                    yAxisId="right"
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ComposedChartWith3Axis;

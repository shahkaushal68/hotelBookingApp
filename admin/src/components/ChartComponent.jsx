import React from "react";
import "../style/chart.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "January",
    Total: 500,
  },
  {
    name: "February",
    Total: 1200,
  },
  {
    name: "March",
    Total: 1590,
  },
  {
    name: "April",
    Total: 2000,
  },
  {
    name: "May",
    Total: 1500,
  },
  {
    name: "June",
    Total: 1000,
  },
];

const ChartComponent = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">L{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

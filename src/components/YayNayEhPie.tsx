import { useState } from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

export interface PieData {
  name: string;
  value: number;
  fill?: string;
}

function shadeHexColor(color: string, percent: number) {
  var f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)
    )
      .toString(16)
      .slice(1)
  );
}

const renderActiveShape = (props: {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 5}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={shadeHexColor(fill, -0.2)}
      className={`active-sector`}
    />
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  payload: PieData;
}) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent <= 0.03) {
    return ``;
  }
  return (
    <text
      x={x}
      y={y}
      fontWeight={700}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      pointerEvents={`none`}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const YayNayEhPie = (props: { pieData: PieData[]; emptyData: PieData[] }) => {
  const { pieData, emptyData } = props;
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <ResponsiveContainer
      className="pie-chart-container"
      width="100%"
      height="50%"
    >
      <PieChart className="pie-chart">
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          dataKey="value"
          data={pieData.every((val) => val.value === 0) ? emptyData : pieData}
          labelLine={false}
          animationEasing="ease-out"
          animationDuration={50}
          animationBegin={0}
          label={
            pieData.every((data) => data.value === 0)
              ? undefined
              : renderCustomizedLabel
          }
          onMouseEnter={(data, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(-1)}
        />
        <Legend
          payload={pieData.map((entry) => ({
            value: entry.name,
            color: `${entry.fill}`,
          }))}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default YayNayEhPie;

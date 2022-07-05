import React from "react";
import "./index.css";
import "./App.css";
import Counter from "./Counter";
import { ResponsiveContainer, Legend, PieChart, Pie } from "recharts";

const lightGreen = "#4CAF50";
const backgroundColor = "#282c34";
// eslint-disable-next-line
const soundOn = false;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
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
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const App = () => {
  const yaySoundEffect = new Audio("./yay.mp3");
  const naySoundEffect = new Audio("./nay.mp3");
  const ehSoundEffect = new Audio("./eh.mp3");

  const posLS = "pos";
  const negLS = "neg";
  const neuLS = "neu";
  const titleLS = "title";
  const [pos, setPos] = React.useState(
    parseInt(localStorage.getItem(posLS) || "0")
  );
  const [neg, setNeg] = React.useState(
    parseInt(localStorage.getItem(negLS) || "0")
  );
  const [neu, setNeu] = React.useState(
    parseInt(localStorage.getItem(neuLS) || "0")
  );
  const [title, setTitle] = React.useState(localStorage.getItem(titleLS) || "");

  React.useEffect(() => {
    localStorage.setItem(posLS, `${pos}`);
    localStorage.setItem(negLS, `${neg}`);
    localStorage.setItem(neuLS, `${neu}`);
    localStorage.setItem(titleLS, `${title}`);
  }, [pos, neg, neu, title]);

  const pieData = [
    {
      name: "Yay",
      value: pos,
      fill: lightGreen,
    },
    {
      name: "Nay",
      value: neg,
      fill: "red",
    },
    {
      name: "Eh",
      value: neu,
      fill: "yellow",
    },
  ];

  return (
    <div id="page">
      <header>
        <input
          type="text"
          value={title}
          placeholder="Title"
          spellCheck="false"
          onChange={(event) => setTitle(event.target.value)}
        />
      </header>
      <body className="counter-with-stats">
        <div id="counters" className="content">
          <Counter
            value={pos}
            buttonClassName="pos"
            onClick={setPos}
            soundEffect={yaySoundEffect}
          />
          <Counter
            value={neg}
            buttonClassName="neg"
            onClick={setNeg}
            soundEffect={naySoundEffect}
          />
          <Counter
            value={neu}
            buttonClassName="neu"
            onClick={setNeu}
            soundEffect={ehSoundEffect}
          />
          <button
            className="reset"
            onClick={() => {
              if (window.confirm("Are you sure you want to reset?")) {
                setPos(0);
                setNeg(0);
                setNeu(0);
                setTitle("");
              }
            }}
          >
            RESET
          </button>
        </div>
        <div id="stats" className="content">
          <ResponsiveContainer
            className="pie-chart-container"
            width="100%"
            height="50%"
          >
            <PieChart className="pie-chart">
              <Pie
                dataKey="value"
                data={pieData}
                labelLine={false}
                animationDuration={250}
                animationBegin={0}
                label={renderCustomizedLabel}
                stroke={backgroundColor}
                strokeWidth={4}
              />
              <Legend
                payload={pieData.map((entry) => ({
                  value: entry.name,
                  type: "square",
                  color: `${entry.fill}`,
                }))}
              />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer
            className="pie-chart-container"
            width="100%"
            height="50%"
          >
            <PieChart className="pie-chart">
              <Pie
                dataKey="value"
                data={pieData.slice(0, 2)}
                labelLine={false}
                animationDuration={250}
                animationBegin={0}
                label={renderCustomizedLabel}
                stroke={backgroundColor}
                strokeWidth={4}
              />
              <Legend
                payload={pieData.slice(0, 2).map((entry) => ({
                  value: entry.name,
                  type: "square",
                  color: `${entry.fill}`,
                }))}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </body>
    </div>
  );
};

export default App;

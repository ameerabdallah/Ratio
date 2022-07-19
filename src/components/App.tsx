import React from "react";
import Counter from "./Counter";
import YayNayEhPie, { PieData } from "./YayNayEhPie";

const lightGreen = "#4CAF50";
const red = "#FF0000";
const yellow = "#FFFF00";
const emptyColor = "#808080";
// eslint-disable-next-line
const soundOn = false;

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

  const pieData: PieData[] = [
    {
      name: "Yay",
      value: pos,
      fill: lightGreen,
    },
    {
      name: "Nay",
      value: neg,
      fill: red,
    },
    {
      name: "Eh",
      value: neu,
      fill: yellow,
    },
  ];

  const emptyData = [
    {
      name: "",
      value: 1,
      fill: emptyColor,
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
      <div className="counter-with-stats">
        <div id="counters" className="content">
          <Counter
            value={pos}
            buttonClassName="pos"
            setValue={setPos}
            soundEffect={yaySoundEffect}
            sound={soundOn}
          />
          <Counter
            value={neg}
            buttonClassName="neg"
            setValue={setNeg}
            soundEffect={naySoundEffect}
            sound={soundOn}
          />
          <Counter
            value={neu}
            buttonClassName="neu"
            setValue={setNeu}
            soundEffect={ehSoundEffect}
            sound={soundOn}
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
          <YayNayEhPie pieData={pieData} emptyData={emptyData} />
          <YayNayEhPie pieData={pieData.slice(0, 2)} emptyData={emptyData} />
        </div>
      </div>
    </div>
  );
};

export default App;

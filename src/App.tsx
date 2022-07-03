import React from "react";
import "./index.css";
import "./App.css";

const lightGreen = "#4CAF50";


function App() {
  const posLS = "pos";
  const negLS = "neg";
  const neuLS = "neu";
  const [pos, setPos] = React.useState(
    parseInt(localStorage.getItem(posLS) || "0")
  );
  const [neg, setNeg] = React.useState(
    parseInt(localStorage.getItem(negLS) || "0")
  );
  const [neu, setNeu] = React.useState(
    parseInt(localStorage.getItem(neuLS) || "0")
  );

  React.useEffect(() => {
    localStorage.setItem(posLS, `${pos}`);
    localStorage.setItem(negLS, `${neg}`);
    localStorage.setItem(neuLS, `${neu}`);
  }, [pos, neg, neu]);

  const clamp = (x: number) => {
    return Math.max(x, 0);
  };

  const Ratio = (props: {
    a: number;
    b: number;
    aColor: string;
    bColor?: string;
    ratioAsPercentage?: boolean;
  }) => {
    const { a, b, aColor, bColor, ratioAsPercentage } = props;
    let ratio: any = a / b;

  
    let ratioColor: string;
    if (a > b) {
      ratioColor = aColor;
    } else if (a < b) {
      ratioColor = bColor || aColor;
    } else {
      ratioColor = bColor ? "yellow" : aColor;
    }

    const aStyle = {
      color: aColor,
    };
    const bStyle = {
      color: bColor || "",
    };
    const ratioStyle = {
      color: ratioColor,
    };

    if (a === 0 || b === 0) {
      ratio = "---";
    }
    if (!isNaN(ratio)) {
      if (ratioAsPercentage) {
        ratio = `${(ratio * 100).toFixed(2)}%`;
      } else {
        ratio = ratio.toFixed(2);
      }
    }
    return (
      <h3 className="ratio">
        <span className="ratioLeft"><span style={aStyle}>{a}</span> : <span style={bStyle}>{b}</span></span> 
        <span style={ratioStyle} className="ratioRight">{ratio}</span>
      </h3>
    );
  };

  const Counter = (props: {
    value: number;
    buttonClassName: string;
    onClick: (value: number) => void;
  }) => {
    const { value, buttonClassName, onClick } = props;
    return (
      <div className="counter">
        <button className={`btn minus ${buttonClassName}`} onClick={() => onClick(clamp(value - 1))}>
          -
        </button>
        <span className={`value ${buttonClassName}`}>{value}</span>
        <button className={`btn plus ${buttonClassName}`} onClick={() => onClick(clamp(value + 1))}>
          +
        </button>
      </div>
    );
  };

  return (
    <div id="page">
      <button
        className="reset"
        onClick={() => {
          setPos(0);
          setNeg(0);
          setNeu(0);
        }}
      >
        RESET
      </button>
      <body>
        <div id="left" className="content">
          <Counter value={pos} buttonClassName="pos" onClick={setPos} />
          <Counter value={neg} buttonClassName="neg" onClick={setNeg} />
          <Counter value={neu} buttonClassName="neu" onClick={setNeu}/>
        </div>
        <div id="right" className="content">
          <div id="posRatios" className="ratios">
            <h4>Positive</h4>
            <Ratio a={pos} b={neg} aColor={lightGreen} bColor={"red"}/>
            <Ratio a={pos} b={pos + neg + neu} aColor={lightGreen} ratioAsPercentage={true}/>
          </div>
          <div id="negRatios" className="ratios">
            <h4>Negative</h4>
            <Ratio a={neg} b={pos} aColor={"red"} bColor={lightGreen} />
            <Ratio a={neg} b={neg + pos + neu} aColor={"red"} ratioAsPercentage={true}/>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;

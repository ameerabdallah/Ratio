import React from "react";
import "./index.css";
import "./App.css";

function App() {
  const posLS = "pos";
  const negLS = "neg";
  const neuLS = "neu";
  const [pos, setPos] = React.useState(parseInt(localStorage.getItem(posLS) || "0"));
  const [neg, setNeg] = React.useState(parseInt(localStorage.getItem(negLS) || "0"));
  const [neu, setNeu] = React.useState(parseInt(localStorage.getItem(neuLS) || "0"));

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
  }) => {
    const { a, b, aColor, bColor } = props;
    let ratio: any = a / b;

    const aStyle = {
      color: aColor,
    };
    const bStyle = {
      color: bColor || "",
    };
    let ratioColor: string;
    if (a > b) {
      ratioColor = aColor;
    } else if (a < b) {
      ratioColor = bColor || aColor;
    } else {
      ratioColor = "yellow";
    }

    const ratioStyle = {
      color: ratioColor,
    };

    if (a === 0 || b === 0) {
      ratio = "---";
    }
    if (!isNaN(ratio)) {
      ratio = ratio.toFixed(2);
    }
    return (
      <h3>
        <span style={aStyle}>{a}</span> : <span style={bStyle}>{b}</span> ={" "}
        <span style={ratioStyle}>{ratio}</span>
      </h3>
    );
  };

  return (
    <div id="page">
      <header>
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
      </header>
      <body className="App-body">
        <div id="left" className="content">
          <div style={{ display: "inline-block" }}>
            <button className="btn pos" onClick={() => setPos(clamp(pos - 1))}>
              -
            </button>
            <span className="value">{pos}</span>
            <button className="btn pos" onClick={() => setPos(pos + 1)}>
              +
            </button>
          </div>
          <div style={{ display: "inline-block" }}>
            <button
              className="btn neu"
              onClick={() => setNeu(clamp(neu - 1))}
            >
              -
            </button>
            <span className="value">{neu}</span>
            <button className="btn neu" onClick={() => setNeu(neu + 1)}>
              +
            </button>
          </div>
          <div style={{ display: "inline-block" }}>
            <button className="btn neg" onClick={() => setNeg(clamp(neg - 1))}>
              -
            </button>
            <span className="value">{neg}</span>
            <button className="btn neg" onClick={() => setNeg(neg + 1)}>
              +
            </button>
          </div>
        </div>
        <div id="right" className="content">
          <Ratio a={pos} b={neg} aColor={"green"} bColor={"red"} />
          <Ratio a={neg} b={pos} aColor={"red"} bColor={"green"} />
          <Ratio a={pos} b={pos+neg+neu} aColor={"green"} />
          <Ratio a={neg} b={neg+pos+neu} aColor={"red"} />
        </div>
      </body>
    </div>
  );
}

export default App;

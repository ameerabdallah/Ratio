import React from "react";
import "./index.css";
import "./App.css";

const lightGreen = "#4CAF50";
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

  const [title, setTitle] = React.useState(
    localStorage.getItem(titleLS) || ""
  );

  React.useEffect(() => {
    document.title = "Yay, Nay or Eh";
    localStorage.setItem(posLS, `${pos}`);
    localStorage.setItem(negLS, `${neg}`);
    localStorage.setItem(neuLS, `${neu}`);
    localStorage.setItem(titleLS, `${title}`);
  }, [pos, neg, neu, title]);

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
    soundEffect: HTMLAudioElement;
  }) => {
    const { value, buttonClassName, onClick, soundEffect } = props;
    return (
      <div className="counter">
        <button className={`btn minus ${buttonClassName}`} onClick={() => onClick(clamp(value - 1))}>
          -
        </button>
        <span className={`value ${buttonClassName}`}>{value}</span>
        <button className={`btn plus ${buttonClassName}`} onClick={() => {
            onClick(clamp(value + 1));
            !soundOn || soundEffect.play();
          }}>
          +
        </button>
      </div>
    );
  };

  return (
    <div id="page">
      <header>
        <input type="text" value={title} placeholder="Title" spellCheck="false" onChange={(event) => setTitle(event.target.value)}/>
      </header>
      <body>
        <div id="left" className="content">
          <Counter value={pos} buttonClassName="pos" onClick={setPos} soundEffect={yaySoundEffect} />
          <Counter value={neg} buttonClassName="neg" onClick={setNeg} soundEffect={naySoundEffect} />
          <Counter value={neu} buttonClassName="neu" onClick={setNeu} soundEffect={ehSoundEffect} />
        </div>
        <div id="right" className="content">
          <div id="posRatios" className="ratios">
            <h4>Yay</h4>
            <Ratio a={pos} b={neg} aColor={lightGreen} bColor={"red"}/>
            <Ratio a={pos} b={pos + neg + neu} aColor={lightGreen} ratioAsPercentage={true}/>
          </div>
          <div id="negRatios" className="ratios">
            <h4>Nay</h4>
            <Ratio a={neg} b={pos} aColor={"red"} bColor={lightGreen} />
            <Ratio a={neg} b={neg + pos + neu} aColor={"red"} ratioAsPercentage={true}/>
          </div>
        </div>
      </body>
      <button
        className="reset"
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          if (confirm("Are you sure you want to reset?")) {
            setPos(0);
            setNeg(0);
            setNeu(0);
          }
        }}
      >
        RESET
      </button>
    </div>
  );
}

export default App;

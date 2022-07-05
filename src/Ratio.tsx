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
      <span className="ratioLeft">
        <span style={aStyle}>{a}</span> : <span style={bStyle}>{b}</span>
      </span>
      <span style={ratioStyle} className="ratioRight">
        {ratio}
      </span>
    </h3>
  );
};

export default Ratio;

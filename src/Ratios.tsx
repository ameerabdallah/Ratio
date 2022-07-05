import Ratio from "./Ratio";

const Ratios = (props: {
  id: string;
  a: number;
  b: number;
  total: number;
  aColor: string;
  bColor: string;
  title: string;
}) => {
  const { id, a, b, total, aColor, bColor, title } = props;
  return (
    <div id={id} className="ratios">
      <h4>{title}</h4>
      <Ratio a={a} b={b} aColor={aColor} bColor={bColor} />
      <Ratio a={a} b={total} aColor={aColor} ratioAsPercentage={true} />
    </div>
  );
};

export default Ratios;

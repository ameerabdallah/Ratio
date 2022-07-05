const Counter = (props: {
  value: number;
  buttonClassName: string;
  onClick: (value: number) => void;
  soundEffect: HTMLAudioElement;
  sound?: boolean;
}) => {
  const { value, buttonClassName, onClick, soundEffect, sound } = props;
  return (
    <div className="counter">
      <button
        className={`btn minus ${buttonClassName}`}
        onClick={() => onClick(Math.max(0, value - 1))}
      >
        -
      </button>
      <span className={`value ${buttonClassName}`}>{value}</span>
      <button
        className={`btn plus ${buttonClassName}`}
        onClick={() => {
          onClick(Math.max(0, value + 1));
          !sound || soundEffect.play();
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;

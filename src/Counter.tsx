const Counter = (props: {
  value: number;
  buttonClassName: string;
  setValue: (value: number) => void;
  soundEffect: HTMLAudioElement;
  sound?: boolean;
}) => {
  const { value, buttonClassName, setValue, soundEffect, sound } = props;
  return (
    <div className="counter">
      <button
        className={`btn minus ${buttonClassName}`}
        onClick={() => setValue(Math.max(0, value - 1))}
      >
        -
      </button>
      <input type="number" className={`value ${buttonClassName}`} onChange={(e) => {
            setValue(e.target.valueAsNumber);
        }}value={value} />
      <button
        className={`btn plus ${buttonClassName}`}
        onClick={() => {
            setValue(Math.max(0, value + 1));
          !sound || soundEffect.play();
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;

import React, { useState } from "react";

export const CounterApp = ({value}) => {
  const [counter, setCounter] = useState(value);

  const counterIncrement = () => {
    setCounter(counter + 1);
    console.log("Click" + counter);
  };
  return (
    <>
      <h2>El valor del contador es {counter}</h2>
      <button
        onClick={() => {
          counterIncrement();
        }}
      >
        Incrementar contador +1
      </button>
    </>
  );
};

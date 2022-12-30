import React from "react";

// This function is a component becausse it starts with a capital letter
export function Button({ text, className, onClick }) {
  // Destructuring
  // const { text, prop2 } = props;
  return (
    <button
      className={`btn ${className}`}
      onClick={function () {
        onClick(className);
      }}
    >
      {text}
    </button>
  );
}

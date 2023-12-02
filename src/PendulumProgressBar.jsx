import React, { memo } from "react";
import "./App.css"; // Import your CSS file for styling

const Pendulum = ({ delay, direction }) => {
  

  return (
    <div className="pendulum-container border border-zinc-300 dark:border-zinc-600">
      <div
        className={`pendulum-progress ${direction}`}
        style={{ transitionDuration: `${delay}ms` }}
      />
    </div>
  );
};

const PendulumProgressBar = memo(Pendulum, (prevProps, newProps) => {
  return prevProps.direction === newProps.direction;
});

export default PendulumProgressBar;

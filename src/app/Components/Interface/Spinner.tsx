"use client";
import React, { useState, useEffect } from "react";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 6 }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 10); // Change the rotation speed here
    }, 20); // Change the interval here for smoother or faster rotation

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      <div
        className={`inline-block h-${size} w-${size} rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500`}
        role="status"
        aria-label="loading"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;

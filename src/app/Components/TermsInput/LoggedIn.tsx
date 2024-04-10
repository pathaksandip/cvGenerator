/** @format */
"use client";
import React, { ChangeEvent, useState } from "react";

interface LoggedInProps {
  onCheckboxChecked: (isChecked: boolean) => void;
}

const LoggedIn: React.FC<LoggedInProps> = ({ onCheckboxChecked }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsChecked(newValue);
    onCheckboxChecked(newValue);
  };
  return (
    <div className="flex items-center">
      <div className="flex">
        <input
          type="checkbox"
          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          id="hs-checked-checkbox"
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(e)}
        />
      </div>
      <div className="ms-3">
        <label htmlFor="remember-me" className="text-sm dark:text-white">
          Keep Logged In
        </label>
      </div>
    </div>
  );
};

export default LoggedIn;

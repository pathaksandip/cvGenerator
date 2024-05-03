/** @format */

import React, { memo, useEffect, useState } from "react";

interface SelectOptionProps<T extends Record<string, any>> {
  data: T[];
  selectedField: keyof T;
  label?: string;
  values?: string;
  classNames?: string;
  icon?: React.ReactNode;
  clearOnSuccess?: boolean;
  onSelectOption: (selectedObject: T | null) => void;
}

const SelectOptionObject = <T extends Record<string, any>>({
  data,
  selectedField,
  classNames,
  label,
  clearOnSuccess,
  values,
  icon,
  onSelectOption,
}: SelectOptionProps<T>) => {
  // Validation to ensure data is an array of objects
  if (
    !Array.isArray(data) ||
    data.some((item: any) => typeof item !== "object")
  ) {
    throw new Error(
      "SelectOption component expects an array of objects as data."
    );
  }

  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    if (clearOnSuccess) {
      setSelectedValue("");
    }
  }, [clearOnSuccess]);

  return (
    <div className={`${classNames}`}>
      {label && (
        <label className="block mb-2  font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {icon}

        <select
          className={` ${
            icon ? "pl-20" : ""
          } bg-gray-50 border border-gray-300 text-gray-900 ${classNames}  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          value={values || selectedValue || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setSelectedValue(newValue === "" ? "" : newValue);
            if (newValue !== "") {
              const selectedObject = data.find(
                (item: any) => String(item[selectedField]) === newValue
              ) as T;
              onSelectOption(selectedObject);
            } else {
              setSelectedValue(""); // Set selectedValue to empty string
              onSelectOption(null);
            }
          }}
        >
          <option value={""}> Select </option>
          {data.map((item: any) => (
            <option
              key={String(item[selectedField])}
              value={String(item[selectedField])}
            >
              {String(item[selectedField])}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default memo(SelectOptionObject);

// Implemnetation

// const data = [
//   { classid: "123", className: "12" },
//   { classid: "1223", className: "12555" },
//   { classid: "12223", className: "1234" },
// ];
// const handleSelectOption = (selectedObject: Record<string, any>) => {
//   console.log("Selected Object:", selectedObject);
//   setSelectedValue(selectedObject.classid);
//   // Do something with the selected object
// };
// const [selectedValue, setSelectedValue] = useState<string>("");

// <SelectOptionsObject
// data={data}
// selectedField="className"
// label="Select Class"
// icon={
//   <FaStore
//     size={"16"}
//     color="grey"
//     className="pointer-events-none absolute ml-4 "
//   />
// }
// onSelectOption={handleSelectOption}
// />
// {selectedValue}

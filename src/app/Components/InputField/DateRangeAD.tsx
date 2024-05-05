/** @format */

import React, { useEffect, useState } from "react";
import DateAD from "./DateAD";
import DateADEnd from "./DateADEnd";

interface DateRangeADProps {
  label1: string;
  label2: string;
  startDateValue?: string;
  endDateValue?: string;
  onStartDateChange: (
    selectedStartDate: string,
    selectedStartDate2?: string
  ) => void;
  present: boolean;
  onEndDateChange: (selectedEndDate: string, selectedEndDate2?: string) => void;
}

export default function DateRangeAD({
  label1,
  label2,
  startDateValue,
  endDateValue,
  onStartDateChange,
  onEndDateChange,
  present,
}: DateRangeADProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [todayDate, setTodayDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const compareDates = (date1: string, date2: string): number => {
    const [year1, month1, day1] = date1.split("/").map(Number);
    const [year2, month2, day2] = date2.split("/").map(Number);

    if (year1 !== year2) {
      return year1 - year2;
    }
    if (month1 !== month2) {
      return month1 - month2;
    }
    return day1 - day2;
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const currentDay = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${currentYear}/${currentMonth}/${currentDay}`;
    if (present) {
      setTodayDate(formattedDate);
      setEndDate("Present");
      endDateValue = "Present";
      onEndDateChange("Present", "Present");
    } else {
      setEndDate(formattedDate);
      onEndDateChange(formattedDate, "Present");
    }
  }, [present]); // Run this effect only once, when the component mounts

  const handleStartDateSelect = (
    selectedStartDate: string,
    selectedStartDate2: string
  ) => {
    setStartDate(selectedStartDate);

    // Check if start date is later than end date
    if (
      selectedStartDate &&
      endDate &&
      compareDates(selectedStartDate, endDate) > 0
    ) {
      setError("Start date cannot be later than end date");
    } else {
      onStartDateChange(selectedStartDate, selectedStartDate2);
      setError("");
    }
  };

  const handleEndDateSelect = (
    selectedEndDate: string,
    selectedEndDate2: string
  ) => {
    setEndDate(selectedEndDate);

    // Check if end date is earlier than start date
    if (
      selectedEndDate &&
      startDate &&
      compareDates(selectedEndDate, startDate) < 0
    ) {
      onEndDateChange(todayDate);
      setError("End date cannot be earlier than start date");
    } else {
      setError("");
      onEndDateChange(selectedEndDate, selectedEndDate2);
    }
  };

  return (
    <div className="w-full">
      <div className=" w-full flex ">
        <div className="flex items-center w-1/2">
          {label1 && <label className="block mb-1">{label1}</label>}
        </div>
        <div className="flex items-center w-1/2 ml-5">
          {label2 && <label className="block mb-1">{label2}</label>}
        </div>
      </div>
      <div date-rangepicker className="flex items-center">
        <div>
          <DateAD
            initialDate={startDateValue}
            onDateSelect={handleStartDateSelect}
          />
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <DateADEnd initialDate={endDate} onDateSelect={handleEndDateSelect} />
      </div>

      {error && <p className="p-1 text-xs text-red-500">({error})</p>}
    </div>
  );
}

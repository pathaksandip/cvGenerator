/** @format */

"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  FaCalendar,
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";

class CustomDate {
  private year: number;
  private month: number;
  private date: number;

  constructor(year: number, month: number, date: number) {
    this.year = year;
    this.month = month;
    this.date = date;
  }

  getYear(): number {
    return this.year;
  }

  getMonth(): number {
    return this.month;
  }

  getDate(): number {
    return this.date;
  }
}

const getEnglishMonthName = (month: number): string => {
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1]; // Adjust for 0-based index
};

const convertToNepaliNumber = (englishNumber: number | string): string => {
  const nepaliNumbers: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const nepaliNumber: string = englishNumber
    .toString()
    .split("")
    .map((char: any) =>
      !isNaN(parseInt(char)) ? nepaliNumbers[parseInt(char)] : char
    )
    .join("");

  return nepaliNumber;
};

//BS calendar functions
//Calendar related functions
var calendarData = {
  bsMonths: [
    "बैशाख",
    "जेठ",
    "असार",
    "सावन",
    "भदौ",
    "असोज",
    "कार्तिक",
    "मंसिर",
    "पौष",
    "माघ",
    "फागुन",
    "चैत",
  ],
  bsDays: ["आईत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"],
  nepaliNumbers: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
  bsMonthUpperDays: [
    [30, 31],
    [31, 32],
    [31, 32],
    [31, 32],
    [31, 32],
    [30, 31],
    [29, 30],
    [29, 30],
    [29, 30],
    [29, 30],
    [29, 30],
    [30, 31],
  ],
  extractedBsMonthData: [
    [
      0, 1, 1, 22, 1, 3, 1, 1, 1, 3, 1, 22, 1, 3, 1, 3, 1, 22, 1, 3, 1, 19, 1,
      3, 1, 1, 3, 1, 2, 2, 1, 3, 1,
    ],
    [
      1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
      3, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2,
    ],
    [
      0, 1, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2,
      1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 1, 3, 1, 3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2,
    ],
    [
      1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1,
      3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3,
      1, 3, 1, 3, 1, 3, 1, 3, 2, 2, 1, 3, 1, 2, 2, 2, 1, 2,
    ],
    [59, 1, 26, 1, 28, 1, 2, 1, 12],
    [
      0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 2, 2, 1, 3, 1, 2, 1, 2,
    ],
    [
      0, 12, 1, 3, 1, 3, 1, 5, 1, 11, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 18, 1,
      3, 1, 3, 1, 27, 1, 2,
    ],
    [
      1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 1, 2, 2, 2, 15, 2, 4,
    ],
    [
      0, 1, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1,
      3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      1, 3, 1, 3, 1, 2, 2, 2, 15, 2, 4,
    ],
    [
      1, 1, 3, 1, 3, 1, 14, 1, 3, 1, 1, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 18, 1,
      3, 1, 3, 1, 3, 1, 14, 1, 3, 15, 1, 2, 1, 1,
    ],
    [
      0, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3,
      1, 3, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 3, 1, 10, 1, 20, 1, 1, 1,
    ],
    [
      1, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1, 3, 1, 3,
      1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2,
      2, 1, 3, 1, 3, 1, 20, 3,
    ],
  ],
  minBsYear: 1970,
  maxBsYear: 2100,
  minAdDateEqBsDate: {
    ad: {
      year: 1913,
      month: 3,
      date: 13,
    },
    bs: {
      year: 1970,
      month: 1,
      date: 1,
    },
  },
};

function getMonthDaysNumFormMinBsYear(
  bsMonth: number,
  yearDiff: number
): number {
  let yearCount: number = 0;
  let monthDaysFromMinBsYear: number = 0;

  if (yearDiff === 0) {
    return 0;
  }

  const bsMonthData: number[] = calendarData.extractedBsMonthData[bsMonth - 1];
  for (let i = 0; i < bsMonthData.length; i++) {
    if (bsMonthData[i] === 0) {
      continue;
    }

    const bsMonthUpperDaysIndex: number = i % 2;
    if (yearDiff > yearCount + bsMonthData[i]) {
      yearCount += bsMonthData[i];
      monthDaysFromMinBsYear +=
        calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] *
        bsMonthData[i];
    } else {
      monthDaysFromMinBsYear +=
        calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] *
        (yearDiff - yearCount);
      yearCount = yearDiff - yearCount;
      break;
    }
  }

  return monthDaysFromMinBsYear;
}

function getTotalDaysNumFromMinBsYear(
  bsYear: number,
  bsMonth: number,
  bsDate: number
): number | null {
  if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
    return null;
  }

  let daysNumFromMinBsYear: number = 0;
  const diffYears: number = bsYear - calendarData.minBsYear;
  for (let month = 1; month <= 12; month++) {
    if (month < bsMonth) {
      daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(
        month,
        diffYears + 1
      );
    } else {
      daysNumFromMinBsYear += getMonthDaysNumFormMinBsYear(month, diffYears);
    }
  }

  if (bsYear > 2085 && bsYear < 2088) {
    daysNumFromMinBsYear += bsDate - 2;
  } else if (bsYear === 2085 && bsMonth > 5) {
    daysNumFromMinBsYear += bsDate - 2;
  } else if (bsYear > 2088) {
    daysNumFromMinBsYear += bsDate - 4;
  } else if (bsYear === 2088 && bsMonth > 5) {
    daysNumFromMinBsYear += bsDate - 4;
  } else {
    daysNumFromMinBsYear += bsDate;
  }

  return daysNumFromMinBsYear;
}

function getBsMonthDays(bsYear: number, bsMonth: number): number | null {
  let yearCount: number = 0;
  const totalYears: number = bsYear + 1 - calendarData.minBsYear;
  const bsMonthData: number[] = calendarData.extractedBsMonthData[bsMonth - 1];

  for (let i = 0; i < bsMonthData.length; i++) {
    if (bsMonthData[i] === 0) {
      continue;
    }

    const bsMonthUpperDaysIndex: number = i % 2;
    yearCount += bsMonthData[i];

    if (totalYears <= yearCount) {
      if (
        (bsYear === 2085 && bsMonth === 5) ||
        (bsYear === 2088 && bsMonth === 5)
      ) {
        return (
          calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2
        );
      } else {
        return calendarData.bsMonthUpperDays[bsMonth - 1][
          bsMonthUpperDaysIndex
        ];
      }
    }
  }

  return null;
}

export function getAdDateByBsDate(
  bsYear: number,
  bsMonth: number,
  bsDate: number
): Date {
  const daysNumFromMinBsYear: number | null = getTotalDaysNumFromMinBsYear(
    bsYear,
    bsMonth,
    bsDate
  );

  if (daysNumFromMinBsYear === null) {
    throw new Error("Invalid input for BS date");
  }

  const adDate: Date = new Date(
    calendarData.minAdDateEqBsDate.ad.year,
    calendarData.minAdDateEqBsDate.ad.month,
    calendarData.minAdDateEqBsDate.ad.date - 1
  );
  adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
  return adDate;
}

export function getBsDateByAdDate(
  adYear: number,
  adMonth: number,
  adDate: number
): { bsYear: number; bsMonth: number; bsDate: number } {
  let bsYear: number = adYear + 57;
  let bsMonth: number = (adMonth + 9) % 12;
  bsMonth = bsMonth === 0 ? 12 : bsMonth;
  let bsDate: number = 1;

  if (adMonth < 4) {
    bsYear -= 1;
  } else if (adMonth === 4) {
    const bsYearFirstAdDate: Date = getAdDateByBsDate(bsYear, 1, 1);
    if (adDate < bsYearFirstAdDate.getDate()) {
      bsYear -= 1;
    }
  }

  const bsMonthFirstAdDate: Date = getAdDateByBsDate(bsYear, bsMonth, 1);
  if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
    bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12;
    const bsMonthDays: number | null = getBsMonthDays(bsYear, bsMonth);
    if (bsMonthDays === null) {
      throw new Error("Invalid input for BS date");
    }
    bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
  } else {
    bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
  }

  return {
    bsYear: bsYear,
    bsMonth: bsMonth,
    bsDate: bsDate,
  };
}

const generateEnglishYears = () => {
  // Function to generate a list of English years
  const years = [];
  for (let year = 1913; year <= 2100; year++) {
    years.push(year);
  }
  return years;
};
const generateEnglishMonths = () => {
  // Function to generate a list of English months
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
};
interface DateADProps {
  onDateSelect: any;
  initialDate?: string;
  // Add other props and their types if needed
}

const DateAD: React.FC<DateADProps> = ({ initialDate, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || "");

  console.log("Initils", initialDate);
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const today = new Date(); // Get the current date
  const initialSelectedMonth = today.getMonth() + 1; // Get the current month (add 1 since months are 0-based)
  const initialSelectedYear = today.getFullYear(); // Get the current month

  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);
  const [selectedYear, setSelectedYear] = useState(initialSelectedYear);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSelectedDate(inputValue);
    const isValidInput = /^\d{4}\/\d{2}\/\d{2}$/.test(inputValue);

    if (isValidInput) {
      const [year, month, day] = inputValue.split("/");
      const numericYear = parseInt(year, 10);
      const numericMonth = parseInt(month, 10);
      const numericDay = parseInt(day, 10);

      handleCalendarDateClick(numericYear, numericMonth, numericDay);
    }
  };
  // Function to handle month selection
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value));
  };

  // Function to handle year selection

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  const englishYears = generateEnglishYears();

  const englishMonths = generateEnglishMonths();
  const handleDecreaseMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;

    if (newMonth < 1) {
      newMonth = 12; // December
      newYear -= 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleIncreaseMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;

    if (newMonth > 12) {
      newMonth = 1; // January
      newYear += 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };
  // console.log(previousADDate);

  const [SelectedNepaliDate, setSelectedNepaliDate] = useState<string | null>(
    null
  );
  const formatDate = (year: number, month: number, date: number): string => {
    return `${year}/${String(month).padStart(2, "0")}/${String(date).padStart(
      2,
      "0"
    )}`;
  };

  const formatDateBS = (year: number, month: number, date: number): string => {
    return `${convertToNepaliNumber(year)}/${String(
      convertToNepaliNumber(month)
    ).padStart(2, "0")}/${String(convertToNepaliNumber(date)).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const currentDay = currentDate.getDate();

    const formattedDate: string = formatDate(
      currentYear,
      currentMonth,
      currentDay
    );
    setSelectedDate(formattedDate);

    const eDate: { bsYear: number; bsMonth: number; bsDate: number } =
      getBsDateByAdDate(currentYear, currentMonth, currentDay);
    const formattedDateBS: string = formatDateBS(
      eDate.bsYear,
      eDate.bsMonth,
      eDate.bsDate
    );

    setSelectedNepaliDate(formattedDateBS);
    onDateSelect(formattedDate, formattedDateBS);
  }, []); // Run this effect only once, when the component mounts

  const handleCalendarDateClick = (
    year: number,
    month: number,
    date: number
  ): void => {
    const formattedDate: string = formatDate(year, month, date);
    setSelectedDate(formattedDate);

    const eDate: { bsYear: number; bsMonth: number; bsDate: number } =
      getBsDateByAdDate(year, month, date);
    const formattedDateBS: string = formatDateBS(
      eDate.bsYear,
      eDate.bsMonth,
      eDate.bsDate
    );

    setSelectedNepaliDate(formattedDateBS);
    onDateSelect(formattedDate, formattedDateBS);
    setShowCalendar(false);
  };

  function splitDateString(dateString: string) {
    const [year, month, date] = dateString.split("/").map(Number);

    return {
      year,
      month,
      date,
    };
  }

  //generating calendar
  const GenerateCalendarGridAD = (year: number, month: number): JSX.Element => {
    const today: Date = new Date(); // Get the current date
    const firstDay: Date = new Date(year, month - 1, 1);
    const lastDay: Date = new Date(year, month, 0); // Get the last day of the current month
    const prevMonthDays: number = firstDay.getDay();
    const calendarArray: Date[] = [];

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate: Date = new Date(year, month - 1, i);
      calendarArray.push(currentDate);
    }
    const nextMonthDays: number =
      (7 - ((prevMonthDays + calendarArray.length) % 7)) % 7;

    // Append empty cells for the previous month
    const calendarWithEmptyDays: (null | undefined)[] = Array.from<
      null | undefined
    >({ length: prevMonthDays }).fill(null);

    // Combine the empty cells with the current month's dates
    const fullCalendarArray: (Date | null | undefined)[] = [
      ...calendarWithEmptyDays,
      ...calendarArray,
    ];

    // Split the calendarArray into weeks
    const weeks: (Date | null | undefined)[][] = [];
    for (let i = 0; i < fullCalendarArray.length; i += 7) {
      weeks.push(fullCalendarArray.slice(i, i + 7));
    }

    // Render the calendar with current date highlighted in red
    return (
      <table className="p-2 text-[10px]">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day: any, index: number) => (
                <th
                  key={index}
                  className="border bg-blue-950 p-2 font-bold text-white"
                >
                  {day}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {weeks.map((weekDates: any, weekIndex: number) => (
            <tr key={weekIndex}>
              {weekDates.map((date: any, dateIndex: number) => (
                <td
                  key={dateIndex}
                  className={`relative h-4 cursor-pointer border text-center ${
                    date &&
                    date.getFullYear() === splitDateString(selectedDate).year &&
                    date.getMonth() ===
                      splitDateString(selectedDate).month - 1 &&
                    date.getDate() === splitDateString(selectedDate).date
                      ? "bg-red-400"
                      : ""
                  } hover:bg-slate-300 ${
                    date &&
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
                      ? "border-2 border-red-800" // Highlight current date in red
                      : ""
                  }`}
                  onClick={() => {
                    if (date) {
                      setSelectedDate(
                        formatDate(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        )
                      );
                      // console.log("Selected date:", selectedDate);
                      handleCalendarDateClick(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                      );
                    }
                  }}
                >
                  <div>
                    <div className="">{date ? date.getDate() : ""}</div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar); // Toggle the visibility of the div
  };

  const outsideClick = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: Event): void {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <>
      <div className="" ref={outsideClick}>
        {" "}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            name="start"
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 ps-10 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="YYYY/MM/DD"
            value={selectedDate}
            onClick={() => setShowCalendar(!showCalendar)}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        {showCalendar && (
          <div className=" absolute z-50 h-fit w-fit grid-cols-12 gap-2 text-[10px]">
            <div className="col-span-12 rounded-md border bg-white p-4 shadow ">
              <div>
                {" "}
                <div className="flex justify-between space-x-1">
                  <div className="my-auto rounded border bg-blue-950 text-white ">
                    <div className=" ">
                      <select
                        id="yearDropdown"
                        className="w-fit border-0 bg-blue-950 p-1 text-xs text-white "
                        value={selectedYear}
                        style={{ border: "none" }}
                        onChange={handleYearChange}
                      >
                        {englishYears.map((year: any) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className=" font-bold text-blue-950  ">
                    {" "}
                    <div className=" flex w-full space-x-1  ">
                      <span
                        onClick={handleDecreaseMonth}
                        className="my-auto w-fit rounded border bg-white p-1 shadow hover:bg-slate-200"
                      >
                        <FaChevronLeft />
                      </span>
                      <div className=" my-2  w-full text-center font-bold md:my-auto md:w-fit ">
                        {
                          <div>
                            {getEnglishMonthName(selectedMonth)}, {selectedYear}
                          </div>
                        }
                      </div>
                      <span
                        onClick={handleIncreaseMonth}
                        className="my-auto w-fit rounded border bg-white p-1 shadow hover:bg-slate-200"
                      >
                        <FaChevronRight />
                      </span>
                    </div>{" "}
                  </div>
                  <div className="bg-blue-950rounded my-auto border text-white">
                    <select
                      className="w-fit border-0 bg-blue-950 p-1 text-xs text-white "
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      {englishMonths.map((month: any, index: number) => (
                        <option key={index} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  {" "}
                  {
                    <div>
                      {GenerateCalendarGridAD(selectedYear, selectedMonth)}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DateAD;

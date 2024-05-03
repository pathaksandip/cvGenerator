import React, { useState } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextInput from "../InputField/TextInput";
import { v4 as uuidv4 } from "uuid";
interface EducationData {
  id: string;
  school: string;
  degree: string;
  city: string;
}
function Education() {
  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [educationData, setEducationData] = useState<EducationData[]>([]);

  const handleIconChange = () => {
    setIsFirstIcon(!isFirstIcon);
    setShowSection(!showSection);
  };
  const handleEducationSectionToggle = () => {
    // Create a new education data object with a unique ID
    const newEducationData: EducationData = {
      id: uuidv4(), // Generate a unique UUID
      school: "",
      degree: "",
      city: "",
    };

    // Store the new education data in the educationData array
    setEducationData([...educationData, newEducationData]);

    // Reset input fields
    setShowSection(true);
  };

  return (
    <div>
      <div className="px-3">
        <h1 className="text-blue-400  font-bold text-4xl ">Education</h1>
        <span className=" text-gray-500 mt-1">
          Give a detailed look into your academic history.
        </span>
        <div className="space-y-2 ">
          <div className="w-full flex justify-between mx-auto">
            <button
              className="mt-2  w-full flex justify-between items-center hover:text-blue-500"
              onClick={handleIconChange}
            >
              School/Institution
              {isFirstIcon ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 15.75 7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </button>
          </div>
          {showSection && (
            <div className=" mt-5">
              <div className=" flex space-x-5 justify-between mb-2">
                <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
                  <TextInput
                    type="text"
                    label="School"
                    clearOnSuccess={clearOnSuccess}
                    name="phone"
                    // values={aboutData.phone}
                    // onChange={(value) => {
                    //   setAboutData({
                    //     ...aboutData,
                    //     phone: value,
                    //   });
                    // }}
                    classNames=" text-sm"
                    required
                  />
                </div>
              </div>
              <div className=" flex justify-between mx-1">
                <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] mr-2">
                  <TextInput
                    type="text"
                    label="Degree"
                    clearOnSuccess={clearOnSuccess}
                    name="phone"
                    // values={aboutData.phone}
                    // onChange={(value) => {
                    //   setAboutData({
                    //     ...aboutData,
                    //     phone: value,
                    //   });
                    // }}
                    classNames=" text-sm"
                    required
                  />
                </div>
                <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
                  <TextInput
                    type="text"
                    label="City"
                    clearOnSuccess={clearOnSuccess}
                    name="phone"
                    // values={aboutData.phone}
                    // onChange={(value) => {
                    //   setAboutData({
                    //     ...aboutData,
                    //     phone: value,
                    //   });
                    // }}
                    classNames=" text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          <div className=" mb-2 border-b pb-2  mt-4  flex w-full">
            <button
              onClick={handleEducationSectionToggle}
              className="inline-flex  items-center text-sm text-blue-500 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 font-medium  hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <svg
                className="h-4 w-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>{" "}
              Add Education
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;

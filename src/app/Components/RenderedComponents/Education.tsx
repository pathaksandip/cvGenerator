import React, { ChangeEvent, useState } from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextInput from "../InputField/TextInput";
import { v4 as uuidv4 } from "uuid";
import DateRangeAD from "../InputField/DateRangeAD";
interface EducationData {
  id: string;
  school: string;
  degree: string;
  city: string;
  isEditing?: boolean;
}
function Education() {
  const [isFirstIcon, setIsFirstIcon] = useState(true);
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [showSection, setShowSection] = useState(true);
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showRow, setShowRow] = useState("");

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
  };

  const HandleRow = (id: string) => {
    setIsFirstIcon(!isFirstIcon);

    setShowRow(id === showRow ? "" : id);
  };
  const handleEducationSectionToggle = () => {
    const newEducationData: EducationData = {
      id: uuidv4(),
      school: "",
      degree: "",
      city: "",
      isEditing: true, // Set isEditing to true for the new education item
    };

    setEducationData([...educationData, newEducationData]);
    setShowRow(newEducationData.id);
  };

  const handleEducationChange = (
    index: number,
    field: "school" | "degree" | "city",
    value: string
  ) => {
    const newEducationData = [...educationData];
    newEducationData[index] = {
      ...newEducationData[index],
      [field]: value,
      isEditing: true, // Set isEditing to true when editing an existing item
    };

    setEducationData(newEducationData);
  };

  const handleDeleteEducation = (index: number) => {
    const newEducationData = [...educationData];
    newEducationData.splice(index, 1);
    setEducationData(newEducationData);
  };

  const handleStartDateChange = (selectedStartDate: string) => {
    setStartDate(selectedStartDate);
  };

  const handleEndDateChange = (selectedEndDate: string) => {
    setEndDate(selectedEndDate);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {
      setEndDate("present");
    } else {
      setEndDate(endDate);
    }
  };

  return (
    <div>
      <div className="px-3">
        <h1 className="text-blue-400  font-bold text-4xl ">Education</h1>
        <span className=" text-gray-500 mt-1">
          Give a detailed look into your academic history.
        </span>
        <div className="space-y-2 ">
          {educationData.map((details, index) => (
            <div key={details.id} className=" items-center mb-2">
              <div className=" w-full flex   ">
                <div className=" w-full justify-between border p-1 text-blue-500  text-md rounded ">
                  <div
                    className=" hover:text-blue-500  flex"
                    onClick={() => HandleRow(details.id)}
                  >
                    <span
                      className={`text-${
                        details.school ? "black" : "blue"
                      } text-md w-5/6`}
                    >
                      {details.school
                        ? details.school
                        : "School/Institution Details"}
                    </span>

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
                  </div>
                  <div>
                    {startDate} to {""}
                    {endDate}
                  </div>
                </div>

                <div className=" w-1/6 ml-3">
                  <button onClick={() => handleDeleteEducation(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {showRow === details.id && (
                <div key={details.id} className=" mt-5">
                  <div className=" flex space-x-5 justify-between mb-2">
                    <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
                      <TextInput
                        type="text"
                        label="School"
                        clearOnSuccess={clearOnSuccess}
                        name="phone"
                        onChange={(value) =>
                          handleEducationChange(index, "school", value)
                        }
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
                        onChange={(value) =>
                          handleEducationChange(index, "degree", value)
                        }
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
                        name="city"
                        onChange={(value) =>
                          handleEducationChange(index, "city", value)
                        }
                        // values={aboutData.phone}

                        classNames=" text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className=" mt-3">
                    <DateRangeAD
                      label1="Start Date"
                      label2="Graduation Date"
                      onStartDateChange={handleStartDateChange}
                      onEndDateChange={handleEndDateChange}
                      present={isChecked}
                    />
                  </div>
                  <div className="flex items-center mt-3">
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
                      <label
                        htmlFor="remember-me"
                        className="text-sm dark:text-white"
                      >
                        I currently study here
                      </label>
                    </div>
                  </div>
                  <div className="mt-1">
                    <span className=" text-xs ">
                      <b>Summary</b>
                    </span>
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      toolbar={{
                        options: ["inline", "list", "link"],
                        inline: { options: ["bold", "italic", "underline"] },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

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

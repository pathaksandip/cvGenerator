/** @format */
"use client";
import React, { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TextInput from "./TextInput";
import SelectOptionsObject from "./SelectOptionsObject";
import { link } from "fs";
import useAboutMutations from "../Mutations/About/DataMutationAbout";

interface DerivedName {
  id: string;
  name: string;
}

interface Row {
  id: string;
  main: string;
  derived: DerivedName[];
}

interface SocialLink {
  id: string;
  type: string;
  link: string;
}

interface DynamicRowMappingProps {
  onTextArrayChange?: (textArray: Row[]) => void; // Callback function prop
  selectType?: boolean;
  textType?: boolean;
  values?: any;
  data?: any[];
  selectField?: string;
  valueField?: string;
  resetField?: boolean;
  placeholderName1?: string;
  placeholderName2?: string;
  onSocialLinksChange?: (socialLinks: SocialLink[]) => void;
}

const DynamicRowMappingEducation: React.FC<DynamicRowMappingProps> = ({
  selectType,
  textType,
  onTextArrayChange,
  selectField,
  valueField,
  data,
  values,
  resetField,
  placeholderName1,
  placeholderName2,
  onSocialLinksChange,
}) => {
  const [rows, setRows] = useState<Row[]>([
    { id: uuidv4(), main: "", derived: [{ id: uuidv4(), name: "" }] },
  ]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const { deleteSocial } = useAboutMutations();
  const handleCategoryChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].main = value;
    setRows(newRows);
  };


  const handleDelete = async (id: string) => {
    try {
      // First, delete the social link from the database
      await deleteSocial(id);

      // Then, update the state to remove the social link from the UI
      setSocialLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting social link:", error);
    }
  };

  const handleNameChange = (
    rowIndex: number,
    nameIndex: number,
    value: string
  ) => {
    const newRows = [...rows];
    newRows[rowIndex].derived[nameIndex].name = value;
    setRows(newRows);
  };

  const addName = (rowIndex: number) => {
    const newRows = [...rows];
    const newDerived = [
      ...newRows[rowIndex].derived,
      { id: uuidv4(), name: "" },
    ];
    newRows[rowIndex].derived = newDerived;
    setRows(newRows);
  };

  const addRow = () => {
    const newRows = [...rows];
    const newRow = {
      id: uuidv4(), // Generate a unique ID for the new row
      main: "",
      derived: [{ id: uuidv4(), name: "" }], // Generate a unique ID for the first derived name
    };
    newRows.push(newRow);
    setRows(newRows);
  };

  const removeRow = (index: string) => {
    const newRows = rows.filter((id: any) => id.id !== index);
    setRows(newRows);
  };

  const addSocialLink = () => {
    const newSocialLink: SocialLink = {
      id: uuidv4(),
      type: "",
      link: "",
    };
    setSocialLinks([...socialLinks, newSocialLink]);
  };

  const handleSocialLinkChange = (
    index: number,
    type: string,
    link: string
  ) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index] = { id: socialLinks[index].id, type, link };
    setSocialLinks(newSocialLinks);
    if (onSocialLinksChange) {
      onSocialLinksChange(newSocialLinks);
    }
  };

  useEffect(() => {
    if (onTextArrayChange) {
      onTextArrayChange(rows);
    }

    if (resetField) {
      setRows([{ id: "", main: "", derived: [{ id: "", name: "" }] }]);
    }
  }, [rows]);

  useEffect(() => {
    const emptyMainOrDerived = rows.some(
      (row: any) =>
        row.main.trim() === "" ||
        row.derived.some((name: any) => name.name.trim() === "")
    );
    setIsValid(!emptyMainOrDerived);
  }, [rows]);

  useEffect(() => {
    if (values) {
      setSocialLinks(values);
    }
  }, [values]);
  console.log("values", values);
  return (
    <div className=" w-full   ">
    
      <div className=" mb-2 border-b pb-2  mt-3  flex w-full">
        <button
          onClick={addSocialLink}
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
      <div className="flex flex-wrap mx-auto">
        {socialLinks.map((link, index) => (
          <div key={link.id} className="flex items-center space-x-2 mr-2 mb-2">
            <SelectOptionsObject
              data={[
                { name: "Facebook", value: "facebook" },
                { name: "Twitter", value: "twitter" },
                { name: "GitHub", value: "github" },
                { name: "LinkedIn", value: "linkedIn" },
                { name: "Instagram", value: "instagram" },
                { name: "Dribble", value: "dribble" },
              ]}
              values={link.type}
              classNames="text-xs"
              selectedField="value"
              onSelectOption={(value: any) =>
                handleSocialLinkChange(index, value.value, link.link)
              }
            />
            <TextInput
              type="text"
              classNames="text-xs"
              placeholder="Enter link"
              values={link.link}
              onChange={(value) =>
                handleSocialLinkChange(index, link.type, value)
              }
            />

            <button
              onClick={() => handleDelete(link.id)}
              className="inline-flex mx-auto items-center gap-x-1 rounded-full border border-dashed border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(DynamicRowMappingEducation);

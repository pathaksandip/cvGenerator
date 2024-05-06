"use client";
import React, { useEffect, useState } from "react";
import TextInput from "../InputField/TextInput";
import TextArea from "../InputField/TextArea";
import MyDocument from "../pdfViewer/PdfView";
import DOMPurify from "dompurify";
import SubmitButton from "../Buttons/SubmitButton";
import Router from "next/router";
import useAboutMutations from "../Mutations/About/DataMutationAbout";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { json } from "stream/consumers";
import { table } from "console";
import GetAboutData from "../data/getdata/AboutData/AboutData";
import LoadingComponent from "@/app/LoadingComponent";
import DynamicRowMapping from "../InputField/DynamicRowMapping";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import SuccessNotification from "@/app/SuccessNotification";
function About() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { aboutFetchedData, isloading } = GetAboutData();
  const { addData } = useAboutMutations();

  const [aboutData, setAboutData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    summary: "",
    socialLinks: [],
  });
  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
  };

  useEffect(() => {
    if (aboutFetchedData) {
      setAboutData((prevState) => ({
        ...prevState,
        firstName: aboutFetchedData?.firstName || "",
        lastName: aboutFetchedData?.lastName || "",
        designation: aboutFetchedData?.designation || "",
        address: aboutFetchedData?.address || "",
        city: aboutFetchedData?.city || "",
        email: aboutFetchedData?.email || "",
        phone: aboutFetchedData?.phone || "",
        summary: aboutFetchedData?.summary || "",
        socialLinks:
          aboutFetchedData?.socialLinks &&
          JSON.parse(aboutFetchedData?.socialLinks || ""),
      }));
    }
    console.log("qq", aboutFetchedData?.socialLinks);
    let contentState;
    if (aboutFetchedData?.summary && aboutFetchedData.summary !== "") {
      try {
        contentState = convertFromRaw(JSON.parse(aboutFetchedData.summary));
      } catch (error) {
        console.error("Error parsing summary JSON:", error);
        contentState = convertFromRaw({
          blocks: [],
          entityMap: {},
        });
      }
    } else {
      contentState = convertFromRaw({
        blocks: [],
        entityMap: {},
      });
    }

    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, [aboutFetchedData]);

  const handleAbout = async () => {
    const formData = new FormData();

    try {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      const dataAbout = {
        firstName: aboutData.firstName,
        lastName: aboutData.lastName,
        designation: aboutData.designation,
        address: aboutData.address,
        city: aboutData.city,
        email: aboutData.email,
        phone: aboutData.phone,
        summary: JSON.stringify(rawContent),
        socialLinks: JSON.stringify(aboutData.socialLinks),
      };

      // Check if dataAbout is not empty
      if (Object.keys(dataAbout).length !== 0) {
        const About = JSON.stringify(dataAbout);
        formData.append("aboutData", About);
        console.log("qqq", About);
        const data = await addData(formData);

        if (data?.success) {
          console.log("ooo", data?.success);
          setSuccessMessage(data.success);
          setIsLoading(false);
          setIsFormValid(false);
          setClearOnSuccess(true);
        } else if (data?.error) {
          setErrorMessage(data.error);
          if (data.error === "Invalid session") {
            Router.push("/");
          }
          setIsLoading(false);
        } else {
          setErrorMessage("Try again later");
        }
      } else {
        setErrorMessage("Please enter valid input");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to add party category");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Show loading for 3 seconds

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  return (
    <div>
      <div className="px-3">
        <h1 className="text-blue-400  font-bold text-4xl ">About Yourself</h1>
        <span className=" text-gray-500 mt-1">
          Fill out your primary information.
        </span>
        <div>{aboutFetchedData?.firstName}</div>
        <div className=" mt-5">
          <div className=" flex space-x-5 justify-between mb-2">
            <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
              <TextInput
                type="text"
                label=" First Name"
                placeholder=""
                clearOnSuccess={clearOnSuccess}
                onChange={(value) =>
                  setAboutData({
                    ...aboutData,
                    firstName: value,
                  })
                }
                values={aboutData.firstName}
                name="firstName"
                classNames=" text-sm"
                required
                readOnly={false} // Set readOnly to false to make the input editable
              />
            </div>
            <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
              <TextInput
                type="text"
                label="  Last Name"
                placeholder=""
                clearOnSuccess={clearOnSuccess}
                name="lastName"
                classNames=" text-sm"
                onChange={(value) => {
                  setAboutData({
                    ...aboutData,
                    lastName: value,
                  });
                }}
                values={aboutData.lastName}
                required
              />
            </div>
          </div>
          <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] mb-2 ">
            <TextInput
              type="text"
              label=" Designation"
              placeholder="Accoutant"
              clearOnSuccess={clearOnSuccess}
              name="designation"
              onChange={(value) => {
                setAboutData({
                  ...aboutData,
                  designation: value,
                });
              }}
              classNames=" text-sm"
              values={aboutData.designation}
              required
            />
          </div>
          <div className=" flex space-x-5 justify-between mb-2">
            <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
              <TextInput
                type="text"
                label=" Address"
                placeholder=""
                clearOnSuccess={clearOnSuccess}
                name="address"
                classNames=" text-sm"
                onChange={(value) => {
                  setAboutData({
                    ...aboutData,
                    address: value,
                  });
                }}
                values={aboutData.address}
                required
              />
            </div>
            <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
              <TextInput
                type="text"
                label="  City"
                placeholder=""
                clearOnSuccess={clearOnSuccess}
                name="city"
                values={aboutData.city}
                classNames=" text-sm"
                onChange={(value) => {
                  setAboutData({
                    ...aboutData,
                    city: value,
                  });
                }}
                required
              />
            </div>
          </div>
          <div className=" flex space-x-5 justify-between mb-2">
            <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
              <TextInput
                type="text"
                label="  Email"
                placeholder=""
                clearOnSuccess={clearOnSuccess}
                values={aboutData.email}
                onChange={(value) => {
                  setAboutData({
                    ...aboutData,
                    email: value,
                  });
                }}
                name="email"
                classNames=" text-sm"
                required
              />
            </div>
            <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%] ">
              <TextInput
                type="text"
                label="phone"
                clearOnSuccess={clearOnSuccess}
                name="phone"
                values={aboutData.phone}
                onChange={(value) => {
                  setAboutData({
                    ...aboutData,
                    phone: value,
                  });
                }}
                classNames=" text-sm"
                required
              />
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
          <div className="space-y-2 ">
            <DynamicRowMapping
              selectType={true}
              onSocialLinksChange={(socialLinks: any) =>
                setAboutData({ ...aboutData, socialLinks })
              }
              values={aboutData.socialLinks}
              selectField="name"
              valueField="id"
              resetField={clearOnSuccess}
              // onTextArrayChange={handleTextArrayChange}
            />
          </div>
          <div className=" text-center">
            <button
              className=" mt-2 rounded-lg  border-2 bg-blue-700 px-3 py-2 text-xs font-medium uppercase  text-white"
              onClick={handleAbout}
            >
              submit
            </button>
            <div className=" w-full">
              {successMessage && (
                <SuccessNotification message={successMessage} />
              )}
              {errorMessage && (
                <>
                  <div
                    className="mt-3 flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span className=" flex w-full space-x-2 rounded-md bg-red-600 p-2">
                      {" "}
                      <ExclamationCircleIcon className="h-5 w-5 text-white" />
                      <p className="text-sm text-white">{errorMessage}</p>
                    </span>{" "}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* <div className="  place-items-center">
            <SubmitButton
              name={"Submit"}
              classNames="  justify-center"
              onClick={handleAbout} // Pass the handleSubmit function
              successMessage={successMessage} // Pass the success message
              errorMessage={errorMessage} // Pass the errorMessage state
            />
          </div> */}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default About;

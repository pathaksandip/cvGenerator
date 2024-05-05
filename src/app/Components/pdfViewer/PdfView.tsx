"use client";
import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import GetAboutData from "../data/getdata/AboutData/AboutData";

import {
  ContentState,
  Editor,
  EditorBlock,
  EditorState,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { METHODS } from "http";

interface Html2PdfOptions {
  margin: number;
  filename: string;
  image: { type: "jpeg" | "png"; quality: number };
  html2canvas: { scale: number };
  jsPDF: {
    unit: "pt" | "mm" | "cm" | "in";
    format: "a4" | "a3" | "a2" | "a1" | "letter" | "legal";
    orientation: "portrait" | "landscape";
  };
}
interface SocialLink {
  id: string;
  type: string;
  link: string;
}
function PdfView() {
  const { aboutFetchedData } = GetAboutData();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [aboutDataDetail, setAboutDataDetail] = useState<{
    firstName: string;
    lastName: string;
    designation: string;
    address: string;
    city: string;
    email: string;
    phone: string;
    summary: string;
    socialLinks: SocialLink[];
  }>({
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

  const handleDownload = () => {
    const contentElement = document.getElementById("pdf-content");

    if (contentElement) {
      // Set height to auto to allow natural expansion based on content
      contentElement.style.height = "auto";
      contentElement.style.paddingTop = "5px";
      const opt: Html2PdfOptions = {
        margin: 1,
        filename: `${aboutDataDetail?.firstName}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(contentElement).save();

      // Reset the height after generating the PDF
      contentElement.style.height = "";
    }
  };

  useEffect(() => {
    if (aboutFetchedData) {
      setAboutDataDetail((prevState) => ({
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
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printableContent = contentRef.current;

    if (!printableContent) return;

    const printContents = printableContent.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const handleEditorChange = () => {};

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        contentRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 shadow-md  w-full mx-auto ">
      <div className="flex justify-end items-center mb-2">
        <button
          onClick={() => handlePrint()}
          className="px-3 py-2  mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Print
        </button>
        <button
          onClick={() => handleDownload()}
          className="px-3 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Download
        </button>
      </div>
      <div
        id="pdf-content"
        ref={contentRef}
        className="border border-gray-300   w-full h-full bg-white"
      >
        <div className=" mt-5 text-center text-2xl font-bold leading-tight uppercase tracking-wider">
          {aboutDataDetail.firstName || ""} {aboutDataDetail.lastName || ""}
        </div>
        <div className="text-center text-sm">
          {aboutDataDetail?.designation || ""}
        </div>
        <div className="text-center mt-3 text-gray-900">
          {aboutDataDetail?.address}, {aboutDataDetail?.city}{" "}
          {aboutDataDetail?.phone && (
            <span>
              &nbsp;&nbsp;<strong>&#8226;</strong>
            </span>
          )}{" "}
          {aboutDataDetail?.phone}
          {aboutDataDetail?.email && (
            <span>
              &nbsp;&nbsp;<strong>&#8226;</strong>
            </span>
          )}{" "}
          {aboutDataDetail?.email}
        </div>
        <div className=" mx-5">
          <Editor editorState={editorState} onChange={handleEditorChange} />
        </div>
        <div>
          {aboutDataDetail.socialLinks.length > 0 && (
            <div className="flex flex-wrap">
              {aboutDataDetail.socialLinks.map((link) => (
                <div key={link.id} className="mr-4 mb-2">
                  <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {link.link}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfView;

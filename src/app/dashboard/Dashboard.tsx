"use client";
import React, { useEffect, useMemo, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDataFetching } from "@/lib/providers/DataContext";
import Image from "next/image";
import About from "../Components/RenderedComponents/About";
import Education from "../Components/RenderedComponents/Education";
import Experience from "../Components/RenderedComponents/Experience";
import Projects from "../Components/RenderedComponents/Projects";
import Skills from "../Components/RenderedComponents/Skills";
import Training from "../Components/RenderedComponents/Training";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../Components/pdfViewer/PdfView";
import FormData from "../Components/Interface/formdata";
import PdfView from "../Components/pdfViewer/PdfView";

function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("about");
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    designation: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    summary: "",
  });

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("p", setFormData);
  };

  const handleButtonClick = (component: any) => [setActiveComponent(component)];

  const handleSignOut = async () => {
    const SignOutResponse = await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    if (!SignOutResponse) {
      return { error: "unable to sign out" };
    } else {
      router.push("/");
    }
  };
  const handleClick = () => {
    // Toggle dropdown visibility
    setIsDropdownOpen(!isDropdownOpen);
  };

  const nextStepTextMap: { [key: string]: string } = {
    about: "Continue to Education",
    education: "Continue to Experience",
    experience: "Continue to Projects",
    projects: "Continue to Skills",
    skills: "Continue to Training",
    trainings: "Download Resume",
  };
  const handleNext = () => {
    switch (activeComponent) {
      case "about":
        setActiveComponent("education");
        break;
      case "education":
        setActiveComponent("experience");
        break;
      case "experience":
        setActiveComponent("projects");
        break;
      case "projects":
        setActiveComponent("skills");
        break;
      case "skills":
        setActiveComponent("trainings");
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (activeComponent) {
      case "education":
        setActiveComponent("about");
        break;
      case "experience":
        setActiveComponent("education");
        break;
      case "projects":
        setActiveComponent("experience");
        break;
      case "skills":
        setActiveComponent("projects");
        break;
      case "trainings":
        setActiveComponent("skills");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className=" flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src="../Images/cv.png" alt="CV" className="h-16 w-16 mr-2" />
          <h1 className="text-2xl font-bold text-blue-600 animate-fade-in">
            MyCV Creator
          </h1>
        </div>
        <div className="relative">
          <button
            className="py-1 px-1 me-2  mx-auto flex mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleClick}
          >
            <div className="md:hidden">
              {session?.user?.image ? (
                <Image
                  className="rounded-full mx-auto top-0"
                  src={session.user?.image}
                  alt="User Image"
                  height={30}
                  width={30}
                />
              ) : (
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>

            <div className="hidden md:flex">
              {session?.user?.image && (
                <Image
                  className=" rounded-lg mx-2"
                  src={session.user?.image}
                  alt="User Image"
                  height={20}
                  width={20}
                />
              )}
              {session?.user?.email}
            </div>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-lg">
              <ul>
                <li>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    // onClick={handleUserProfile}
                  >
                    User Profile
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <hr className=" border-t border-gray-300" />

      <div className="grid grid-cols-12 ">
        <div className="col-span-1 flex">
          <div className="border-r-2 border-gray-300 pr-4">
            <div className="ml-2">
              <button
                className={`${
                  activeComponent === "about"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                } h-20 w-20 mb-4 mt-4 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 ease-in-out`}
                onClick={() => handleButtonClick("about")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className=" text-xs">About</span>
              </button>

              <button
                className={`${
                  activeComponent === "education"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                } h-20 w-20 mb-4 mt-4 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 ease-in-out`}
                onClick={() => handleButtonClick("education")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>

                <span className=" text-xs">Education</span>
              </button>
              <button
                className={`${
                  activeComponent === "experience"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                } h-20 w-20 mb-4 mt-4 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 ease-in-out`}
                onClick={() => handleButtonClick("experience")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>

                <span className=" text-xs">Experience</span>
              </button>
              <button
                className={`${
                  activeComponent === "projects"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                } h-20 w-20 mb-4 mt-4 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 ease-in-out`}
                onClick={() => handleButtonClick("projects")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>

                <span className=" text-xs">Projects</span>
              </button>
              <button
                className={`${
                  activeComponent === "skills"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                } h-20 w-20 mb-4 mt-4 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 ease-in-out`}
                onClick={() => handleButtonClick("skills")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>

                <span className=" text-xs">Skills</span>
              </button>
              <button
                className={`${
                  activeComponent === "trainings"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                } h-20 w-20 mb-4 mt-4 flex flex-col items-center justify-center rounded-lg p-2 transition-colors duration-300 ease-in-out`}
                onClick={() => handleButtonClick("trainings")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>

                <span className=" text-xs">Trainings</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          {activeComponent === "about" && <About />}
          {activeComponent === "education" && <Education />}
          {activeComponent === "experience" && <Experience />}
          {activeComponent === "projects" && <Projects />}
          {activeComponent === "skills" && <Skills />}
          {activeComponent === "trainings" && <Training />}
          <div className="flex  justify-between">
            <button
              onClick={handleBack}
              className="border border-black rounded-md  hover:bg-black hover:text-white   px-4  m-2"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="border rounded-lg bg-blue-500 px-4 py-2 m-2 flex justify-between  items-center  text-white "
            >
              {nextStepTextMap[activeComponent]}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="col-span-7 bg-gray-100 overflow-x-hidden">
          <PdfView />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

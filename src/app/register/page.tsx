/** @format */
/** @format */

"use client";
interface UserRegisterData {
  userName?: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;

  // Add more fields as needed
}

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { FaExclamation, FaStore, FaUser } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";

import { Transition } from "@headlessui/react";
import { registerUser } from "../Components/server/actions/authentication/registerOwner";
import TextInput from "../Components/InputField/TextInput";
import Terms from "../Components/TermsInput/Terms";

interface PageProps {}

const Register: React.FC<PageProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserRegisterData>({
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userName: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isTermsAccepted, setIsTermAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRegisterClick = async () => {
    if (userData && Object.values(userData).every((value: any) => value)) {
      if (isTermsAccepted) {
        setIsLoading(true);

        try {
          const datas = {
            userEmail: userData.userEmail,
            userPassword: userData.userPassword,
            userPhone: userData.userPhone,
            userName: userData.userName,
          };
          const dataToPass = JSON.stringify(datas);
          console.log("ddd", dataToPass);
          const data = await registerUser(dataToPass);
          // console.log("data", data);
          if (data?.error) {
            setErrorMessage(data?.error);
            setIsLoading(false);
          } else {
            router.push("/");
            resetForm();
            setIsLoading(false);
          }
        } catch (error) {
          setIsLoading(false);
          setErrorMessage("Failed to register user");
        }
      } else {
        setIsLoading(false);
        setErrorMessage("Please accept terms and conditions");
      }
    } else {
      setErrorMessage("Please enter valid input");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData && Object.values(userData).every((value: any) => value)) {
      setIsFormValid(true);
    }
  }, [userData]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Check if there's an error message to display
    if (errorMessage) {
      // Set a timer to clear the error message after 3 seconds (adjust duration as needed)
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    // Clear the timer when the component unmounts or if the errorMessage changes
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleCheckboxChecked = (isChecked: boolean) => {
    setIsTermAccepted(isChecked);
    console.log("Checkbox checked:", isChecked);
  };

  const resetForm = () => {
    setUserData({
      userEmail: "",
      userPassword: "",
      userPhone: "",
      userName: "",
    });
  };

  return (
    <>
      <Transition.Root className="mx-auto  bg-gray-200  space-y-2" show={true}>
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center transition-all duration-500 w-full
        `}
          >
            <div
              className={` transition-all  duration-1000
             w-full
            `}
            >
              <div className="flex justify-center items-center h-screen">
                <div className="max-w-lg">
                  <div className="flex justify-center items-center border border-white rounded-lg p-10 bg-white">
                    <div className="w-full text-center flex justify-center">
                      <div className="md:w-96 w-full space-y-2">
                        <h1 className="font-bold text-blue-500 text-xl p-4">
                          Create and Download Professional Resumes
                        </h1>
                        <FadeIn delay="delay-[300ms]">
                          <TextInput
                            classNames=" text-sm"
                            type={"email"}
                            name="userEmail"
                            required={true}
                            onChange={(value: any) =>
                              setUserData({ ...userData, userEmail: value })
                            }
                            icon={
                              <AiOutlineMail
                                size={"16"}
                                color="grey"
                                className="pointer-events-none absolute ml-4 "
                              />
                            }
                            placeholder="Enter Email"
                          />
                        </FadeIn>
                        <FadeIn delay="delay-[500ms]">
                          <TextInput
                            classNames=" text-sm"
                            type={"phone"}
                            placeholder="Enter Phone Number"
                            name="userPhone"
                            onChange={(value: any) =>
                              setUserData({ ...userData, userPhone: value })
                            }
                            required={true}
                            icon={
                              <FaSquarePhone
                                size={"16"}
                                color="grey"
                                className="pointer-events-none absolute ml-4 "
                              />
                            }
                          />
                        </FadeIn>
                        <FadeIn delay="delay-[500ms]">
                          <TextInput
                            classNames=" text-sm"
                            type={"text"}
                            placeholder="Enter your Name"
                            name="userName"
                            onChange={(value: any) =>
                              setUserData({ ...userData, userName: value })
                            }
                            required={true}
                            icon={
                              <FaUser
                                size={"16"}
                                color="grey"
                                className="pointer-events-none absolute ml-4 "
                              />
                            }
                          />
                        </FadeIn>
                        <FadeIn delay="delay-[700ms]">
                          <TextInput
                            classNames=" text-sm"
                            type={"password"}
                            name="userPassword"
                            required={true}
                            onChange={(value: any) =>
                              setUserData({ ...userData, userPassword: value })
                            }
                            icon={
                              <AiOutlineLock
                                size={16}
                                color="grey"
                                className="pointer-events-none absolute ml-4 "
                              />
                            }
                            placeholder="Enter Password"
                          />
                        </FadeIn>
                        <Terms onCheckboxChecked={handleCheckboxChecked} />
                        <FadeIn delay="delay-[1100ms]">
                          <button
                            onClick={handleRegisterClick}
                            className={` h-8 w-24 cursor-pointer rounded-3xl border-2 hover:bg-blue-700 bg-blue-500 text-sm font-medium uppercase  text-white ${
                              isFormValid ? " hover:bg-blue-500" : ""
                            }  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
                            disabled={!isFormValid || isLoading}
                          >
                            {isLoading ? "Registering..." : "Register"}
                          </button>
                          <div className="mt-1">
                            <label
                              htmlFor="remember-me"
                              className="text-sm dark:text-white"
                            >
                              Alreadey Registered
                              <a
                                className="text-blue-600 decoration-2 ml-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="/"
                              >
                                Click Here
                              </a>
                            </label>
                          </div>
                          {errorMessage && (
                            <>
                              {" "}
                              <div
                                className="mt-3 flex h-8 items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                              >
                                <span className=" flex w-full space-x-2 rounded-md bg-red-600 p-2">
                                  {" "}
                                  <FaExclamation className="h-5 w-5 text-white" />
                                  <p className="text-sm text-white">
                                    {errorMessage}
                                  </p>
                                </span>{" "}
                              </div>
                            </>
                          )}
                        </FadeIn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition.Root>
    </>
  );
};

interface FadeInProps {
  delay: string;
  children: React.ReactNode;
}

const FadeIn: React.FC<FadeInProps> = ({ delay, children }) => (
  <Transition.Child
    enter={`transition-all ease-in-out duration-700 ${delay}`}
    enterFrom="opacity-0 translate-y-6"
    enterTo="opacity-100 translate-y-0"
    leave="transition-all ease-in-out duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    {children}
  </Transition.Child>
);

export default Register;

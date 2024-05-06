"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { signIn, useSession } from "next-auth/react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { FaExclamation } from "react-icons/fa";
import Carousel from "@/app/register/Carousel";
import TextInput from "../InputField/TextInput";
import LoggedIn from "../TermsInput/LoggedIn";
interface SignInData {
  userEmail: string;
  userPassword: string;
}

interface TypewriterProps {
  text: string;
  delay?: number;
  repeat?: boolean;
  className?: string;
}
const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay = 100,
  repeat = false,
  className,
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prevText) => {
        // Clear previous text if currentIndex is 0
        const newText = currentIndex === 0 ? "" : prevText;
        return newText + text.charAt(currentIndex);
      });
      currentIndex++;
      if (currentIndex === text.length) {
        if (repeat) {
          currentIndex = 0; // Reset currentIndex if repeat is enabled
        } else {
          clearInterval(intervalId);
        }
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [text, delay, repeat]);

  return <span className={`typewriter ${className}`}>{displayText}</span>;
};

interface PageProps {}

const LoginPage: React.FC<PageProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggles the state of the checkbox
  };
  const [showPassword, setShowPassword] = useState(false);
  // Function to handle showing the verification code section

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();
  const session = useSession();

  const handleGoBack = () => {
    router.push("/");
  };

  //handle register
  const [userData, setuserData] = useState<SignInData>({
    userEmail: "",
    userPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);
  const handleSignInClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (userData && Object.values(userData).every((value: any) => value)) {
      setIsLoading(true);
      const loginData = {
        email: userData.userEmail,
        password: userData.userPassword,
        callbackUrl: "/",
        redirect: false,
      };

      const login = await signIn("credentials", loginData);
      if (login?.error) {
        setErrorMessage(login.error);

        setIsLoading(false);
      }
      if (login?.ok && login?.url) {
        // console.log('Session detail after login' + session);
        router.push(login?.url);
      }

      setIsLoading(false);
    } else {
      setErrorMessage("Failed to login");
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

  useEffect(() => {
    // // Prefetch the dashboard page
    // router.prefetch("/dashboard");
  }, [router]);

  const handleCheckboxChecked = (isChecked: boolean) => {
    // Handle checkbox checked logic here
    console.log("Checkbox checked:", isChecked);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 bg-gray-100">
        <div className=" col-span-1 md:col-span-4">
          <Carousel />
        </div>
        <div className=" col-span-1 md:col-span-2 z-50 justify-end items-center h-screen ">
          <div className="max-w-lg  h-full bg-white">
            <div className=" flex justify-center items-center border border-white rounded-lg p-10">
              <div className="w-full text-center flex justify-center">
                <div className="md:w-92 w-full space-y-2">
                  <div className="flex items-center">
                    <img
                      src="../Images/cv.png"
                      alt="CV"
                      className="h-16 w-16 mr-4"
                    />
                    <h1 className="text-2xl font-bold text-blue-600 animate-fade-in">
                      <Typewriter
                        text="   MyCV Creator"
                        delay={200}
                        repeat
                        className="ml-4 text-blue-500"
                      />
                    </h1>
                  </div>
                  <div className="px-6 sm:px-0 max-w-sm ">
                    <button
                      type="button"
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: "/dashboard",
                        })
                      }
                      className="text-white w-full bg-[#f33b3b] hover:bg-[#f44b3b]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                    >
                      <svg
                        className="mr-2 ml-1 w-4 h-4"
                        aria-hidden="true"
                        viewBox="0 0 488 512"
                        fill="currentColor"
                      >
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                      </svg>
                      Sign up with Google
                    </button>
                  </div>
                  <form
                    className=" md:w-96 w-full mt-10 space-y-4 "
                    onSubmit={handleSignInClick}
                    method="POST"
                  >
                    <TextInput
                      classNames=" text-sm"
                      type={"email"}
                      name="userEmail"
                      required={true}
                      onChange={(value: any) =>
                        setuserData({ ...userData, userEmail: value })
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

                    <TextInput
                      classNames=" text-sm"
                      type={"password"}
                      name="userPassword"
                      required={true}
                      onChange={(value: any) =>
                        setuserData({ ...userData, userPassword: value })
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
                    <div className=" text-sm mt-2">
                      <LoggedIn onCheckboxChecked={handleCheckboxChecked} />
                    </div>

                    <button
                      type="submit"
                      className={`mt-5 h-10 w-40 rounded-3xl  border-2 cursor-pointer hover:bg-blue-700 bg-blue-500 text-sm font-medium uppercase  text-white ${
                        isFormValid ? " hover:bg-blue-500" : ""
                      }  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-50`}
                      disabled={!isFormValid || isLoading}
                    >
                      {isLoading ? "Logging..." : "Login"}
                    </button>
                    <p className="mt-5 block text-sm leading-relaxed text-gray-900 ">
                      Dont have an accout?{" "}
                      <Link href="/register">
                        <span className="font-bold text-blue-700">
                          Register Here
                        </span>
                      </Link>
                    </p>
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
                            <p className="text-sm text-white">{errorMessage}</p>
                          </span>{" "}
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

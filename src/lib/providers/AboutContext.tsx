// UserContext.js
"use client";
import { getAbout } from "@/app/Components/server/actions/getData/AboutData";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useContext, useEffect } from "react";

interface AboutData {
  userId: string;
  firstName: string;
  lastName: string;
  designation: string;
  address: string;
  city: string;
  summary: string;
  phone: string;
  email: string;
}

interface AboutContextType {
  aboutDatas: AboutData | null;
  setAboutDatas: React.Dispatch<React.SetStateAction<AboutData | null>>;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

export const AboutProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [aboutDatas, setAboutDatas] = useState<AboutData | null>(null);
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.data?.user?.email) {
          const userDetails = await getAbout(session.data.user.email);

          if (userDetails.success) {
            const {
              userId,
              firstName,
              lastName,
              phone,
              address,
              summary,
              email,
              designaton,
              city,
            } = userDetails.success;

            setAboutDatas({
              userId: userId || "",
              firstName: firstName || "",
              lastName: lastName || "",
              phone: phone || "",
              address: address || "",
              summary: summary || "",
              email: email || "",
              designation: designaton || "",
              city: city || "",
            });
          } else if (userDetails.error) {
            // Handle the error case
            console.error("Error fetching about data:", userDetails.error);
            // You can also set an error state or display an error message
          }
        }
      } catch (error) {
        console.error("Error during fetching:", error);
      }
    };
    fetchData();
  }, [session]);

  return (
    <AboutContext.Provider value={{ aboutDatas, setAboutDatas }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAboutFetching = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAboutFetching must be used within an AboutProvider");
  }
  return context;
};

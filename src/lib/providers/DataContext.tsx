// UserContext.js
"use client";
import { getUser } from "@/app/Components/server/actions/UserData/UserData";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useContext, useEffect } from "react";

interface UserData {
  // Define your user data structure here
  userEmail: string;
  userName: string;
  userPhone: string;
  id?: string;
  // other properties...
}

interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const DataContext = createContext<UserContextType | undefined>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>();
  const session = useSession();

  console.log(session, "sa");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.data?.user.email) {
          const userDetails = await getUser(session.data?.user.email);
          if (userDetails?.success) {
            const { userName, userEmail, userPhone } = userDetails.success;

            console.log("co:", userDetails.success);
            setUserData({
              userName: userName || "",
              userEmail: userEmail || "",
              userPhone: userPhone || "",
            });
          }
        }
      } catch (error) {
        return { error: "error during fetching" };
      }
    };

    fetchData();
  }, [session]);

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataFetching = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataFetching must be used within a UserProvider");
  }
  return context;
};

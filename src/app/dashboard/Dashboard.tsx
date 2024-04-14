"use client";
import React, { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDataFetching } from "@/lib/providers/DataContext";
import Image from "next/image";
function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  console.log("usersession", session?.user?.user?.image);
  const router = useRouter();

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const currentSession = await getSession();
  //     console.log("ss", currentSession);
  //     // if (!currentSession) {
  //     //   router.push("/login");
  //     // } else {
  //     //   router.push("/dashboard");
  //     // }
  //   };

  //   checkSession();
  // }, [session, router]);

  const handleSignOut = async () => {
    const SignOutResponse = await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    if (!SignOutResponse) {
      return { error: "unable to sign out" };
    } else {
      router.push("/login");
    }
  };
  const handleClick = () => {
    // Toggle dropdown visibility
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">This is Dashboard Page</h1>
      <div className="relative">
        <button
          className="py-1 px-1 me-2  mx-auto flex mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleClick}
        >
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
  );
}

export default Dashboard;

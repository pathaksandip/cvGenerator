"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

function LinkDash() {
  const [Component, setComponent] = useState<React.ReactNode | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setComponent(<Dashboard />);
    } else {
      router.push("/");
    }
  }, []);
}

export default LinkDash;

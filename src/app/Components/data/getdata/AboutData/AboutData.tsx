/** @format */
import { getAbout } from "@/app/Components/server/actions/getData/AboutData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface AboutData {
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  designation: string | null;
  address: string | null;
  email: string | null;
  city: string | null;
  summary: string | null;
  phone: string | null;
  socialLinks: string | null;
}

const GetAboutData = () => {
  const [isloading, setIsloading] = useState(false);

  const [aboutFetchedData, setAboutFetchedData] = useState<AboutData | null>(
    null
  );

  const { data: aboutDetails } = useQuery({
    queryFn: async () => getAbout(),
    queryKey: ["aboutData"],
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (aboutDetails?.success) {
      const {
        userId,
        firstName,
        lastName,
        designation,
        address,
        email,
        city,
        summary,
        phone,
        socialLinks,
      } = aboutDetails.success;
      setAboutFetchedData({
        userId: userId || null,
        firstName: firstName || null,
        lastName: lastName || null,
        designation: designation || null,
        address: address || null,
        email: email || null,
        city: city || null,
        summary: summary || null,
        phone: phone || null,
        socialLinks: socialLinks || null,
      });
    } else if (aboutDetails?.error) {
      console.error("Error fetching about data:", aboutDetails?.error);
    }
  }, [aboutDetails]);

  return { aboutFetchedData, isloading };
};

export default GetAboutData;

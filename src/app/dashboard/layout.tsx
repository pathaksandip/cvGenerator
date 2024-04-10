/** @format */

import Providers from "@/lib/providers/Providers";
import { UserProvider } from "@/lib/providers/DataContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider> {children}</UserProvider>;
}

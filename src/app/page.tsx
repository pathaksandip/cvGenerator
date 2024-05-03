import Image from "next/image";
import Login from "./login/page";
import Register from "./Components/Register/Register";
import LoginPage from "./login/page";
import Carousel from "./login/Carousel";
import About from "./Components/RenderedComponents/About";
import MyComponent from "./Components/MyComp";
import TextInput from "./Components/MyComp";
import Dashboard from "./dashboard/Dashboard";

export default function Home() {
  return (
    <>
      {/* <Carousel /> */}
      {/* <Register /> */}
      {/* <MyComponent /> */}
      {/* <Register />  */}
      <Dashboard />
    </>
  );
}

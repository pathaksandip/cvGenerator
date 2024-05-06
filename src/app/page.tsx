import Image from "next/image";
import Login from "./register/page";
import Carousel from "./register/Carousel";
import About from "./Components/RenderedComponents/About";
import MyComponent from "./Components/MyComp";
import TextInput from "./Components/MyComp";
import Dashboard from "./dashboard/Dashboard";
import LoginPage from "./Components/Login/Login";

export default function Home() {
  return (
    <>
      {/* <Carousel /> */}
      <LoginPage />
      {/* <MyComponent /> */}
      {/* <Register />  */}
    </>
  );
}

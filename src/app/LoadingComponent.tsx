/** @format */

import Spinner from "./Components/Interface/Spinner";

const LoadingComponent = () => {
  return (
    <div className="flex h-screen items-center justify-center space-x-2">
      <div className=" my-auto mr-2">
        <Spinner />
      </div>
      <p className="text-center">Loading...</p>
    </div>
  );
};

export default LoadingComponent;

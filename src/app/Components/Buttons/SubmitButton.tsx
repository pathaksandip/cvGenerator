/** @format */

import React, { ReactNode, memo } from "react";

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import SuccessNotification from "@/app/SuccessNotification";

interface SubmitButtonProps {
  icon?: ReactNode;
  name: string;
  classNames?: string;
  isLoading?: boolean;
  isFormValid?: boolean;
  onClick: () => void;
  successMessage?: string;
  errorMessage?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  icon,
  name,
  isLoading,
  isFormValid,
  onClick,
  successMessage,
  errorMessage,
  classNames,
}) => {
  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <button
            type="submit"
            className={`${classNames} mt-2 rounded-lg flex justify-center border-2 bg-blue-700 px-3 py-2 text-xs font-medium uppercase  text-white ${
              isFormValid ? " hover:bg-blue-800" : ""
            }  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50`}
            disabled={!isFormValid || isLoading}
            onClick={onClick}
          >
            {isLoading ? (
              <span>Processing.....</span>
            ) : (
              <span className="flex space-x-2">
                {icon && <span className="my-auto"> {icon}</span>}
                <span className="my-auto"> {name}</span>
              </span>
            )}
          </button>
        </div>
        <div className=" w-full">
          {successMessage && <SuccessNotification message={successMessage} />}
          {errorMessage && (
            <>
              <div
                className="mt-3 flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className=" flex w-full space-x-2 rounded-md bg-red-600 p-2">
                  {" "}
                  <ExclamationCircleIcon className="h-5 w-5 text-white" />
                  <p className="text-sm text-white">{errorMessage}</p>
                </span>{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmitButton;

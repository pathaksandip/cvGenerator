/** @format */

import { successToast } from "./Components/Toast/Toast";

interface SuccessNotificationProps {
  message: string;
}
const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  message,
}) => {
  return successToast(message);
};

export default SuccessNotification;

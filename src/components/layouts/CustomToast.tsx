import { useEffect } from "react";
import { FiCheck } from "react-icons/fi";

interface CustomToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const CustomToast: React.FC<CustomToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center p-4 space-x-4 ${
        type === "success" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
      } rounded-lg shadow`}
    >
      <div className="flex-shrink-0">
        <FiCheck className="h-6 w-6" />
      </div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white rounded-lg p-1.5 inline-flex h-8 w-8"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

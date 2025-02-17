import { FiInbox } from "react-icons/fi"; // Represents an empty box

type Props = {};

export default function Empty({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-600">
      <FiInbox size={48} className="text-gray-400 mb-2" />
      <span>No data available</span>
    </div>
  );
}

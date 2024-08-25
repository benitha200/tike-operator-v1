import { useRouter } from 'next/router';

export default function Confirm() {
  const router = useRouter();
  const { message } = router.query;

  const handleConfirm = () => {
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">{message}</h2>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
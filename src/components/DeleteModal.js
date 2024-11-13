import { deleteApiKey } from '../api/apiKeyService';

export default function DeleteModal({ isOpen, onClose, apiKey, onDelete, title }) {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      console.log('DeleteModal - Handling delete for apiKey:', apiKey);
      
      if (!apiKey || !apiKey.id) {
        console.error('DeleteModal - Invalid API key data:', apiKey);
        throw new Error('Invalid API key data');
      }

      await onDelete(apiKey.id);
      console.log('DeleteModal - Delete request sent');
      onClose();
    } catch (error) {
      console.error('DeleteModal - Delete failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this API key: {apiKey?.name || 'Unknown'}?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
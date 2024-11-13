import { generateApiKey } from '../utils/apiKeyUtils';

export default function ApiKeyModal({ isOpen, onClose, apiKey = null, onSubmit }) {
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      usage_limit: parseInt(formData.get('usage'), 10) || 0,
    };
    
    if (!apiKey) {
      data.key = generateApiKey();
    }
    
    await onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-4">
          {apiKey ? 'Edit API Key' : 'Create New API Key'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue={apiKey?.name || ''}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="usage" className="block text-sm font-medium text-gray-700">
              Usage Limit
            </label>
            <input
              type="number"
              name="usage"
              id="usage"
              min="0"
              defaultValue={apiKey?.usage_limit || 0}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {apiKey ? 'Save Changes' : 'Create Key'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '../../components/Notification';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        showNotification('Valid API key, /protected can be accessed', 'success');
        router.push('/protected');
      } else {
        showNotification(data.message || 'Invalid API Key', 'error');
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      showNotification('Error validating API key', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">API Playground</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your API Key
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="tvly-xxxxxxxxxxxxxxxx"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Validating...' : 'Validate Key'}
        </button>
      </form>
    </div>
  );
} 
'use client';
import { useState } from 'react';
import { deleteApiKey } from '@/api/apiKeyService';
import Sidebar from '@/components/Sidebar';
import ApiKeyModal from '@/components/ApiKeyModal';
import DeleteModal from '@/components/DeleteModal';
import { useApiKeys } from '@/hooks/useApiKeys';
import { copyToClipboard } from '@/utils/apiKeyUtils';
import { EyeIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [visibleKeys, setVisibleKeys] = useState({});

  const {
    apiKeys,
    selectedKey,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    toastMessage,
    setIsCreateModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setSelectedKey,
    handleCreateKey,
    handleUpdateKey,
    handleDeleteKey,
    showToast
  } = useApiKeys();

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const formatApiKey = (key, isVisible) => {
    return isVisible ? key : `${key.substring(0, 5)}************************`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Overview</h1>
              
              {/* Current Plan Card */}
              <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-lg p-6 mb-8">
                <div className="text-white">
                  <p className="uppercase text-sm mb-2">CURRENT PLAN</p>
                  <h2 className="text-3xl font-bold mb-4">Researcher</h2>
                  <div>
                    <p className="mb-2">API Limit</p>
                    <p>52/1,000 Requests</p>
                  </div>
                </div>
              </div>

              {/* API Keys Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">API Keys</h2>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    + Add New
                  </button>
                </div>

                {/* API Keys Table */}
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">NAME</th>
                      <th className="py-2">USAGE</th>
                      <th className="py-2">KEY</th>
                      <th className="py-2">OPTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.id} className="border-b">
                        <td className="py-3">{key.name}</td>
                        <td className="py-3">{key.usage}</td>
                        <td className="py-3">
                          <div className="flex items-center">
                            <span className="font-mono">
                              {formatApiKey(key.key, visibleKeys[key.id])}
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => toggleKeyVisibility(key.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                              title={visibleKeys[key.id] ? "Hide API Key" : "Show API Key"}
                            >
                              <EyeIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            
                            <button
                              onClick={async () => {
                                const success = await copyToClipboard(key.key);
                                if (success) {
                                  showToast('API key copied to clipboard');
                                }
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Copy API Key"
                            >
                              <ClipboardIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedKey(key);
                                setIsEditModalOpen(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Edit API Key"
                            >
                              <PencilIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedKey(key);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Delete API Key"
                            >
                              <TrashIcon className="h-5 w-5 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
          {toastMessage}
        </div>
      )}
      
      <ApiKeyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateKey}
        title="Create New API Key"
      />
      
      <ApiKeyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedKey(null);
        }}
        apiKey={selectedKey}
        onSubmit={handleUpdateKey}
        title="Edit API Key"
      />
      
      // DeleteModal 컴포넌트
      <DeleteModal
      isOpen={isDeleteModalOpen}
      onClose={() => {
        setIsDeleteModalOpen(false);
        setSelectedKey(null);
      }}
      apiKey={selectedKey}
      onDelete={() => {
        if (selectedKey && selectedKey.id) {
          handleDeleteKey(selectedKey.id);  // ID를 명시적으로 전달
        }
      }}
      title="Delete API Key"
/>

    </div>
  );
} 
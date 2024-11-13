import { useState, useEffect } from 'react';
import { apiKeyService } from '../api/apiKeyService';
import { deleteApiKey } from '../api/apiKeyService';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const fetchApiKeys = async () => {
    try {
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const handleCreateKey = async (data) => {
    try {
      await apiKeyService.createApiKey(data);
      await fetchApiKeys();
      setIsCreateModalOpen(false);
      showToast('API key created successfully');
    } catch (error) {
      console.error('Error creating API key:', error);
      throw error;
    }
  };

  const handleUpdateKey = async (data) => {
    try {
      await apiKeyService.updateApiKey(selectedKey.id, data);
      await fetchApiKeys();
      setIsEditModalOpen(false);
      setSelectedKey(null);
      showToast('API key updated successfully');
    } catch (error) {
      console.error('Error updating API key:', error);
      throw error;
    }
  };

  const handleDeleteKey = async (id) => {
    try {
      await deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      setIsDeleteModalOpen(false);
      setSelectedKey(null);
      showToast('API key deleted successfully');
    } catch (error) {
      console.error('Error deleting API key:', error);
      showToast('Failed to delete API key');
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
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
  };
} 
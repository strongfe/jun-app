import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

export const apiKeyService = {
  fetchApiKeys: async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }
  },

  createApiKey: async (data) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .insert([{
          ...data,
          usage: 0
        }]);
      if (error) throw error;
    } catch (error) {
      console.error('Error creating API key:', error);
      throw error;
    }
  },

  updateApiKey: async (id, data) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error updating API key:', error);
      throw error;
    }
  },

  deleteApiKey: async (id) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting API key:', error);
      throw error;
    }
  }
};

export const deleteApiKey = async (apiKey) => {
  console.log('deleteApiKey - Received apiKey:', apiKey);
  
  const keyId = typeof apiKey === 'string' ? apiKey : apiKey?.id;
  
  console.log('deleteApiKey - Extracted keyId:', keyId);

  if (!keyId) {
    console.error('Invalid API key data:', apiKey);
    throw new Error('API key ID is required');
  }

  const response = await fetch(`/api/api_keys/${keyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log('deleteApiKey - Response status:', response.status);

  if (!response.ok) {
    const error = await response.json();
    console.error('deleteApiKey - Error response:', error);
    throw new Error(error.message || 'Failed to delete API key');
  }

  try {
    return await response.json();
  } catch (error) {
    if (response.ok) {
      return { success: true };
    }
    throw error;
  }
}; 
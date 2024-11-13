import { supabase } from '../../lib/supabaseClient';

export const apiKeyService = {
  // API 키 조회
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

  // API 키 생성
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

  // API 키 수정
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

  // API 키 삭제
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
  },

  // API 키 검증
  validateApiKey: async (apiKey) => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', apiKey)
        .single();

      if (error) {
        console.error('Error validating API key:', error);
        return false;
      }

      return !!data; // data가 있으면 true, 없으면 false 반환
    } catch (error) {
      console.error('Error validating API key:', error);
      return false;
    }
  }
}; 
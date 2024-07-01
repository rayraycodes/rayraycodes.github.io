import { supabase } from '../utils/supabase/client';

export const getAllStories = async () => {
  const { data, error } = await supabase
    .from('stories')
    .select('*');

  if (error) {
    console.error('Error fetching stories:', error);
    return [];
  }

  return data;
};

export const getStoryById = async (id: string) => {
    const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching story:', error);
        return null;
    }

    return data;
};

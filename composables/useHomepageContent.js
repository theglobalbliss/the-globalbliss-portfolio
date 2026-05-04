export const useHomepageContent = () => {
  const supabase = useSupabase();

  const homepageFields =
    "id, section_key, title, subtitle, body, button_text, button_url, image_url, updated_at";

  const getHomepageSection = async (sectionKey) => {
    const { data, error } = await supabase
      .from("homepage_content")
      .select(homepageFields)
      .eq("section_key", sectionKey)
      .single();

    if (error) {
      console.error(`Error loading ${sectionKey}:`, error.message);
      return null;
    }

    return data;
  };

  const getAllHomepageContent = async () => {
    const { data, error } = await supabase
      .from("homepage_content")
      .select(homepageFields)
      .order("section_key", { ascending: true });

    if (error) {
      console.error("Error loading homepage content:", error.message);
      return [];
    }

    return data || [];
  };

  return {
    getHomepageSection,
    getAllHomepageContent,
  };
};
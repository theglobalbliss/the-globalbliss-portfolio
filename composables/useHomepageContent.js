export const useHomepageContent = () => {
  const supabase = useSupabase();

  const getHomepageSection = async (sectionKey) => {
    const { data, error } = await supabase
      .from("homepage_content")
      .select("*")
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
      .select("*");

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
export const useProjects = () => {
  const supabase = useSupabase();

  // 🏠 Homepage: Featured only
  const getFeaturedProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true });

    return data || [];
  };

  // 📁 Works page: Everything
  const getAllProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    return data || [];
  };

  return {
    getFeaturedProjects,
    getAllProjects,
  };
};
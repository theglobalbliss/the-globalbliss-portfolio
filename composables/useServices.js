export const useServices = () => {
  const supabase = useSupabase();

  const getServices = async (limit = 9) => {
    const { data, error } = await supabase
      .from("services")
      .select(
        "id, title, slug, description, icon, image_url, sort_order, is_active, created_at, updated_at"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Error loading services:", error.message);
      return [];
    }

    return data || [];
  };

  return {
    getServices,
  };
};
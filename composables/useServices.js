export const useServices = () => {
  const supabase = useSupabase();

  const getServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

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
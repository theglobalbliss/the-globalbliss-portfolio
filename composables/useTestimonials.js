export const useTestimonials = () => {
  const supabase = useSupabase();

  const getTestimonials = async (limit = 9) => {
    const { data, error } = await supabase
      .from("testimonials")
      .select(
        "id, name, role, company, content, image_url, sort_order, is_active, created_at, updated_at"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Error loading testimonials:", error.message);
      return [];
    }

    return data || [];
  };

  return {
    getTestimonials,
  };
};
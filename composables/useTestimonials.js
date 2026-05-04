export const useTestimonials = () => {
  const supabase = useSupabase();

  const getTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

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
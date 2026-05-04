export const useBlogPosts = () => {
  const supabase = useSupabase();

  const getBlogPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error loading blog posts:", error.message);
      return [];
    }

    return data || [];
  };

  const getBlogPostBySlug = async (slug) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) {
      console.error("Error loading blog post:", error.message);
      return null;
    }

    return data;
  };

  return {
    getBlogPosts,
    getBlogPostBySlug,
  };
};
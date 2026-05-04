export const useBlogPosts = () => {
  const supabase = useSupabase();

  const getBlogPosts = async (limit = 9) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id, title, slug, category, excerpt, image_url, author, created_at, updated_at, sort_order"
      )
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Error loading blog posts:", error.message);
      return [];
    }

    return data || [];
  };

  const getRecentBlogPosts = async (limit = 3) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id, title, slug, category, excerpt, image_url, author, created_at, updated_at, sort_order"
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error loading recent blog posts:", error.message);
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
    getRecentBlogPosts,
    getBlogPostBySlug,
  };
};